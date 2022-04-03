"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogErrors = void 0;
function LogErrors(err, req, res, next) {
    console.error(err);
    next(err);
}
exports.LogErrors = LogErrors;
