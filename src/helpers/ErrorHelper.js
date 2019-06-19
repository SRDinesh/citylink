import Boom from 'boom';

class ErrorHelper {
    constructor() { }

    static async handleError(err) {
        if (err.isBoom) {
            return err;
        } else if (
            err.name == 'CastError' ||
            err.name == 'AssertionError'
        ) {
            return Boom.badRequest(err.message);
        } else if (err.name == 'ValidationError') {
            let message = err.message || '';
            if (err.isJoi && err.details && err.details.length) {
                message = err.details[0].message.replace(/\"/g, '');
            }
            return Boom.badRequest(message);
        } else {
            console.log(err);
            return Boom.badImplementation(err.message);
        }
    }

}

export default ErrorHelper;