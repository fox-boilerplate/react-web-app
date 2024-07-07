import { BadResponseTypeError, BadRequestEntityError, NotFoundError,
    UnauthorizedError, BadResponseStatusError } from '../errors';

class ResponseHelper {

    static json = {

        /**
         * Custom fetch with response type and status 200 expected.
         * @returns Promise
         */
        fetch: async (...args) => fetch(args)
            .then(response => ResponseHelper.json.success(response)),

        /**
         * 
         * @param {Response} response expect a json data and status ok.
         * @returns 
         */
        success: async (response) => {

            if(!(response instanceof Response))
                throw new Error(`Invalid argument (${typeof response}, expected Response).`);
    
            // Json format is required
            if(!response.headers.get('content-type').match(/^application\/json[\s;].+$/))
                throw new BadResponseTypeError(`Bad http response content type: ${response.headers.get('content-type')}`);
        
            else if(response.status === 401)
                throw new UnauthorizedError(`Bad http response status: Unauthorized (401)`);
        
            else if(this.status === 403)
                throw new error.UnauthenticatedError(`Bad http response status: Unauthenticated (403)`);

            else if(response.status === 404)
                throw new NotFoundError(`Bad http response status: Not Found (404)`);

            else if(response.status === 422)
                throw new BadRequestEntityError(`Bad http response status: Bad Entity (422).`);
        
            else if(response.status !== 200)
                throw new BadResponseStatusError(`Bad http response status: ${response.status}`);

            // Fetch response body
            return response.json();
        }
    };
    
}

export default ResponseHelper;