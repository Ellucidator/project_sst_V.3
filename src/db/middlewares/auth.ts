import { NextFunction, Request, Response } from "express";
import { UserInstance } from "../models/User.js";
import { User } from "../models/indexAdminJs.js";
import { jwtService } from "../services/jwtServices.js";
import { JwtPayload } from "jsonwebtoken";


export interface AuthenticatedRequest extends Request{
    user?: UserInstance|null
}

export const ensureAuth = (req:AuthenticatedRequest, res:Response, next:NextFunction)=>{
    const tokenAuthorization = req.headers.authorization

    if(!tokenAuthorization) return res.status(401).json({error: 'No token'})
    const token = tokenAuthorization.replace(/Bearer /, '')

    jwtService.verifyToken(token,(err,decoded)=>{
        if(err||!decoded) return res.status(401).json({error: 'Invalid token'})

        User.findOne({where: {email: (decoded as JwtPayload).email}}).then((user)=>{
            req.user = user
            next()
        })
    })
}