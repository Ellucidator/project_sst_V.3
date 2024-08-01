import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import { Address } from "../models/index.js";

export const addressController = {

    create: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const address:Address = req.body
            const userId = req.user!.id

            if(address.id === 0){
                const count = await Address.count({ where: { user_id: userId } })
                if(count > 5) return res.status(400).json('You can only have 6 addresses')
                
                await Address.update({active: false}, { where: { user_id: userId , active: true} })
                await Address.create(
                    { 
                        user_id: userId,
                        receiver_name: address.receiver_name,
                        zip_code: address.zip_code,
                        state: address.state,
                        city: address.city,
                        neighborhood: address.neighborhood,
                        street: address.street,
                        house_number: address.house_number,
                        complement: address.complement,
                        phone_number: address.phone_number,
                        reference_point: address.reference_point,
                        active: true
                    }
                )
            }
            
            else await Address.update({ 
                user_id: userId,
                receiver_name: address.receiver_name,
                zip_code: address.zip_code,
                state: address.state,
                city: address.city,
                neighborhood: address.neighborhood,
                street: address.street,
                house_number: address.house_number,
                complement: address.complement,
                phone_number: address.phone_number,
                reference_point: address.reference_point, }, { where: { id: address.id, user_id: userId } })
            

            return res.status(201).json('Address created')
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },
    delete: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const { id } = req.params

            await Address.destroy({ where: { id } })

            return res.status(204).json('Address deleted')

        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    activated: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user!.id
            const { id } = req.params
            const addressActiv = await Address.findOne({ where:{user_id: userId,active: true} })
            if(addressActiv) await addressActiv.update({active: false})

            await Address.update({active: true}, { where: { id } })

            return res.status(204).json('Address activated')
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    },
    listByUserId: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user!.id

            const addresses = await Address.findAll({
                where: {user_id: userId},
                order: [['created_at', 'DESC']],
            })

            return res.status(200).json(addresses)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
            
        }
    },
    showAddress: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const { id } = req.params
            console.log(id)
            const address = await Address.findOne({ where: { id } })
            console.log(address)
            return res.status(200).json(address)
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message})
            }
        }
    }
}