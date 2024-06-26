import jwt from 'jsonwebtoken'

const secret = 'secret'

export const jwtService = {

    generateToken:(payload: string|object|Buffer, expiration:string) => {
        return jwt.sign(payload,secret, {expiresIn: expiration})
    },

    verifyToken:(token:string,callbackfn: jwt.VerifyCallback) =>{
        return jwt.verify(token, secret,callbackfn)
    }
}

