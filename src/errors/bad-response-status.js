class BadResponseStatusError extends Error {
    
    constructor(expected, current) {
        super(`Bad http response status: ${current}, but expected ${expected}.`);

        this.current = current;
        this.expected = expected;
    }
}

export default BadResponseStatusError;