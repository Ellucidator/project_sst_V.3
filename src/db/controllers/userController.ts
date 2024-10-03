import { Request, Response } from "express";
import { Favorite, User } from "../models/index.js";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import { userServices } from "../services/userServices.js";
import { CreateUserAttributes, UpdateUserAttributes } from "../models/User.js";
import { getPaginationParams } from "../../helpers/getPaginationParams.js";


export const userController = {
    initialUserAdmin: async (req: Request, res: Response) => {
        try {
            await User.create({
                first_name: 'Admin',
                last_name: 'Admin',
                email: 'admin@admin.com',
                password: 'admin',
                phone: '1234567890',
                birth: new Date('2000-01-01'),
                role: 'admin'
            })
            return res.status(201).json('Admin created')
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },
    createUser: async (req: Request, res: Response) => {
        try {
            const { first_name, last_name, email, password, phone, birth }: CreateUserAttributes = req.body
            const role = 'user'
            const newUser = await User.create({ first_name, last_name, email, password, phone, birth, role })


            return res.status(201).json(newUser)

        } catch (error) {
            if (error instanceof Error) {

                res.status(500).json({ error: error.message })
            }
        }
    },
    show: async (req: AuthenticatedRequest, res: Response) => {

        try {
            const userId = req.user!.id

            const user = await User.findOne({ where: { id: userId }, attributes: ['id', 'email', 'first_name', 'last_name', 'phone', 'birth', 'img_key'] })

            return res.json(user)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },

    updateUser: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.user!.id
            const updateAttributes:UpdateUserAttributes = req.body

            await User.update(updateAttributes, { where: { id: userId } })

            return res.status(200).json({
                message: 'User updated'
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },

    showFavoriteByItemId: async (req: AuthenticatedRequest, res: Response) => {
        try {
            
            const userId = req.user!.id
            const itemId = req.params.id
            const favorite = await Favorite.findOne({ where: { user_id: userId, item_id: itemId } })


            return res.status(200).json(favorite)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },
    showFavorites: async (req: AuthenticatedRequest, res: Response) => {
        try {

            const [perPage,offset,order] = getPaginationParams(req.query)

            const userId = req.user!.id
            console.log(perPage,offset,order,userId)
            const favorites = await Favorite.findAndCountAll(
                {
                    where: { user_id: userId },
                    limit: perPage,
                    offset: offset,
                    attributes:[],
                    include: [
                        {
                            association: 'Item',
                            attributes: ['id', 'name', 'price', 'description', 'in_stock', 'promotion', 'thumbnail_url', 'sub_category_id'],
                            include: [
                                {
                                    association: 'ItemPromotion',
                                    attributes: ['price']
                                }
                            ]
                        }
                    ]
                }
            )

            return res.status(200).json(favorites)

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },

    addFavorite: async (req: AuthenticatedRequest, res: Response) => {

        try {
            const userId = req.user!.id
            const itemId = req.body.itemId
            const favorite = await userServices.addFavorite(userId, itemId)

            return res.json(favorite)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },

    deleteFavorite: async (req: AuthenticatedRequest, res: Response) => {

        try {

            const userId = req.user!.id
            const itemId = req.params.id

            await userServices.deleteFavorite(userId, itemId)

            return res.status(200).json('Favorite deleted')

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    }

}