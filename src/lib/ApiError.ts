export class ApiError extends Error {
    success: boolean;
    statusCode: number;
    data: null;
    message: string;
    stack?: string | undefined;
    errors: any;
    
    constructor(statusCode = 200, message = "Something went wrong", errors: any = [], stack = "") {
        super(message)
        this.success = false;
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }

    toJSON() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
            errors: this.errors,
            stack: process.env.APP_DEBUG ? this.stack : undefined
        }
    }
}