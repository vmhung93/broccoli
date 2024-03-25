/*
 * A Request type which extends express. Request with the auth property.
 */
declare namespace Express {
    export interface Request {
        user?: T;
    }
}
