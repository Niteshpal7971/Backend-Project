const assyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

export {assyncHandler};

/*
const assyncHandler = (fn) => async(req, res, next) => {
    try{
        await fn(req, res, next)
    }catch(err){
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}
*/


