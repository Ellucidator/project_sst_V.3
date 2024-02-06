import { Request, Response } from "express";
import { User } from "../models/index.js";
import { jwtService } from "../services/jwtServices.js";


export const authController = {

    login:async(req:Request, res:Response)=>{
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if(user){
                user.checkPassword(password,(err, isMatch)=>{
                    if(err) throw err
                    if(!isMatch) return res.status(401).json({error: 'Invalid password'})

                    const payload = {
                        id: user.id,
                        email: user.email,
                    }

                    const token = jwtService.generateToken(payload, '1h')
                    return res.status(200).json({ authenticated: true,user,token })
                })
            }

            return res.status(401).json({error: 'email not found'})
        }catch (error) {
            
        }
    }
}