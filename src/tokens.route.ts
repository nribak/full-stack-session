import express from 'express';
import crypto from "crypto";
import User, {usersRepo} from "./User";
import {generateJWT, verifyJWT} from "./jwt.utils";
import {jwtLoader, tokenFetcher} from "./middlewares";

const router = express.Router();

router.post('/signup', (req, res) => {
    const {username, password} = req.body;
    const id = crypto.randomUUID();

    const user: User = {id, password, username};
    usersRepo.push(user);
    const token = generateJWT({id, username});
    console.log(token);
    res.status(201).json({token: token.jwt});
});


router.get('/currentUser', tokenFetcher, jwtLoader, (req, res) => {
    const payload = req.jwtPayload;
    if(payload)
        res.status(200).json({id: payload.id, username: payload.username});
    else res.status(200).json({id: null});
});


export default router;