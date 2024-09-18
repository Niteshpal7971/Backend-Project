import mongoose, { Schema } from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";

const UsesrSchema = new Schema(
  {
    username: {
      Type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      Type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary error
      required: true,
    },
    coverImage: {
      type: string,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: string,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: string,
    },
  },
  { timestamps: true }
);

UsesrSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = bycript.hash(this.password, 10)
    next()
})

UsesrSchema.methods.isPasswordCorrect = async function(password) {
   return await bycript.compare(password, this.password)    
}

UsesrSchema.methods.generateAccessToken = async function(){
    return await jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
UsesrSchema.methods.generateRsfreshToken = async function(){
    return await jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("user", UsesrSchema);
