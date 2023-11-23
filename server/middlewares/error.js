const ErrorResponse = require('../utils/errorResponse');

const ErrorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    // Mongoose Duplicate Key
    if (err.code === 11000) {
        const message = 'Duplicate Field Value Entered';
        error = new ErrorResponse(message, 400);
    }

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    // JWT Token Expired
    if (err.name === 'TokenExpiredError') {
        const message = 'Token Expired';
        error = new ErrorResponse(message, 401);
    }

    // JWT Token Malformed
    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid Token';
        error = new ErrorResponse(message, 401);
    }

    // Custom Error Response
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
    });
};

module.exports = ErrorHandler;
