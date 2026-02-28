export const asyncHandler = (fn) => (req,res,next) =>{
    Promise.resolve(fn(req,res,next)).catch(next)
}

export const errorHandler = (err,req,res,next) =>{
    console.error(err)

    //manejar id invalido
    if(err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(400).json({
            success:false,
            message:"Invalid ID format"
        })
    }

    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
}