import {NextFunction, Request, Response} from "express";
import {JWTTokenPayload, verifyJWT} from "./jwt.utils";

declare global {
    namespace Express {
        interface Request {
            token?: string,
            jwtPayload?: JWTTokenPayload
        }
    }
}


export const tokenFetcher = (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if(bearer)
        req.token = bearer.split(' ')[1];
    next();
};

export const jwtLoader = (req: Request, res: Response, next: NextFunction) => {
    const token = req.token;
    if(token) {
        const payload = verifyJWT(token);
        console.log(payload);
        if(payload)
            req.jwtPayload = payload;
    }
    next();
}