"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyTuitError = exports.EmptyUserError = void 0;
class EmptyUserError extends Error {
    constructor() {
        super("Empty user info");
    }
}
exports.EmptyUserError = EmptyUserError;
class EmptyTuitError extends Error {
    constructor() {
        super("Empty tuit content");
    }
}
exports.EmptyTuitError = EmptyTuitError;
