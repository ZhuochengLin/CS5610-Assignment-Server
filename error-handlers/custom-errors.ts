export class EmptyUserError extends Error {

    constructor() {
        super("Empty user info");
    }

}

export class EmptyTuitError extends Error {

    constructor() {
        super("Empty tuit content");
    }

}