import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../config/enviroment.js'


export const jwtService = {

    generateToken:(payload: string|object|Buffer, expiration:string) => {
        return jwt.sign(payload,JWT_KEY, {expiresIn: expiration})
    },

    verifyToken:(token:string,callbackfn: jwt.VerifyCallback) =>{
        return jwt.verify(token, JWT_KEY,callbackfn)
    }
}

