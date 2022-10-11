import jwt, {JwtPayload} from "jsonwebtoken";


export interface JWTTokenPayload extends JwtPayload {
    id: string,
    username: string
}

const UNTRUSTED_KEY = "12345";

export function generateJWT({id, username}: {id: string, username: string}): {jwt: string} {
    const secret = UNTRUSTED_KEY;
    const payload: JWTTokenPayload = {
        id, username
    }
    const token = jwt.sign(payload, secret);
    return {jwt: token};
}

export function verifyJWT(token: string): JWTTokenPayload | null {
    // const jwtValue = session.jwt;
    if(token) {
        try {
            return  jwt.verify(token, UNTRUSTED_KEY) as JWTTokenPayload;
        } catch (e) {
            return null;
        }
    } else return null;
}
