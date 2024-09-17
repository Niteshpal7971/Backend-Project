import express from "express";
import CookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" })); //Limit lagane se tum ensure karte ho ki server overload nahi hoga aur unwanted bade payloads reject ho jayenge. Ye tumhare server ko Denial of Service (DoS) attacks se bachata hai.
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(CookieParser());

export {app};
