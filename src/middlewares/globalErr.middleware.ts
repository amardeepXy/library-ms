import type { ErrorRequestHandler} from "express";

export const globalErrHandler:ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);

    return res.status(500).json({
        success: false,
        statusCode:  500,
        message: "Internal Server Error"
    })
    
}