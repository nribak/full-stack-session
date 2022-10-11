import express from 'express';
import userRouter from "./tokens.route";
import cookieSession from "cookie-session";
import {jwtLoader, tokenFetcher} from "./middlewares";
import User, {usersRepo} from "./User";

/*
1. classes, interfaces (!= objects), types
2. destructing tuples, objects
3. start transform this project to auth service
4. create a FE with sign/up form
 */

const port = 3000;

const app = express();
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: false
}));

app.use('/user', userRouter);

app.get('/secure', tokenFetcher, jwtLoader, (req, res) => {
    const secureCode = 1;
    const payload = req.jwtPayload;
    const user: User|undefined = usersRepo.find(user => user.id === payload?.id)
    if(user)
        res.status(200).json({data: secureCode});
    else res.status(401).json({err: 'Not Authorized!'});
});


app.listen(port, () => console.log(`listen port ${port}`));
