import { Request, Response } from "express";
import { User } from "../models/index.js";
import { jwtService } from "../services/jwtServices.js";

export const authController = {

    login:async(req:Request, res:Response)=>{
        try {
            const {email, password, remember} = req.body
            const expiresIn = remember === 'on' ? '30 days' : '2h'

            const user = await User.findOne({where: {email:email}})
            if(user){
                const passwordMatch = await user.checkPassword(password)
                
                if(passwordMatch !== true) return res.status(401).json({error:'password'})

                const payload = {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    imgUrl: user.img_key
                }
                const token = jwtService.generateToken(payload, expiresIn)
                return res.status(200).json({authenticated: true, user, token})
            }

            return res.status(401).json({error:'email'})
        }catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    register:async (req:Request,res:Response)=>{
        try {
            const {email, password, first_name, last_name, phone, birth} = req.body
            const user = await User.create({email, password, first_name, last_name, phone, birth,role:'user'})
            if(user){
                const payload = {
                    id: user.id,
                    email: user.email,
                }
                const token = jwtService.generateToken(payload, '1h')
                return res.status(201).json({authenticated: true, user, token})
            }
            return res.status(401).json({error: 'email'})
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    verifyLogin:async(req:Request, res:Response)=>{
        try {
            const {token} = req.body
            jwtService.verifyToken(token,(err,decoded)=>{
                if(err||!decoded) return res.status(500).json({error:'Invalid Token'})
                
                return res.status(200).json(decoded)
            })

            } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}