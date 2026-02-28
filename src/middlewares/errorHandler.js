export const asyncHandler = (fn) => (req,res,next) =>{
    Promise.resolve(fn(req,res,next)).catch(next)
}

export const errorHandler = (err,req,res,next) =>{
    console.error(err)

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
}