class BadResponseTypeError extends Error {
    
    constructor(expected, current) {
        super(`Bad http response content type: ${current}, but expected ${expected}.`);

        this.current = current;
        this.expected = expected;
    }
}

export default BadResponseTypeError;