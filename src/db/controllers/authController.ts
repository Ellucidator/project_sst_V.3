import { Request, Response } from "express";
import { User } from "../models/indexAdminJs.js";
import { jwtService } from "../services/jwtServices.js";



export const authController = {

    login:async(req:Request, res:Response)=>{
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email:email}})
            if(user){
                user.checkPassword(password,(err, isMatch)=>{
                    if(err) throw err
                    if(!isMatch) return res.status(401).json({error: 'Invalid password'})
                })

                const payload = {
                    id: user.id,
                    email: user.email,
                }
                const token = jwtService.generateToken(payload, '8h')
                return res.status(200).json({authenticated: true, user, token})
            }

            return res.status(401).json({error: 'email not found'})
        }catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    register:async (req:Request,res:Response)=>{
        try {
            const {email, password, username, first_name, last_name, phone, birth} = req.body
            const user = await User.create({email, password, username, first_name, last_name, phone, birth,role:'user'})
            if(user){
                const payload = {
                    id: user.id,
                    email: user.email,
                }
                const token = jwtService.generateToken(payload, '1h')
                return res.status(201).json({authenticated: true, user, token})
            }
            return res.status(500).json({error: 'Error creating user'})
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}