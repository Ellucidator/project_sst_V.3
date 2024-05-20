import { Request, Response } from "express";
import { Favorite, User } from "../models/index.js";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import { userServices } from "../services/userServices.js";
import { CreateUserAttributes } from "../models/User.js";
import { getPaginationParams } from "../../helpers/getPaginationParams.js";


export const userController = {
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

    showFavorites: async (req: AuthenticatedRequest, res: Response) => {
        try {

            const [page, perPage] = getPaginationParams(req.query)

            const userId = req.user!.id
            const favorites = await Favorite.findAll(
                {
                    where: { user_id: userId },
                    limit: perPage,
                    offset: (page - 1) * perPage,
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

            return res.json(favorites)
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
            const itemId = req.body.itemId

            await userServices.deleteFavorite(userId, itemId)

            return res.status(204).json('Favorite deleted')

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    }

}