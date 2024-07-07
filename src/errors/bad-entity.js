class BadEntityError extends Error {
    
    constructor(errors) {
        super();

        this.errors = errors;
    }
}

export default BadEntityError;