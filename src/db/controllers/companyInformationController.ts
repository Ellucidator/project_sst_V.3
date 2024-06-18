import { Request, Response } from "express";
import { CompanyInformation } from "../models/index.js";

export const companyInformationController = {
    show:async (req: Request, res: Response) => {

        try {
            const companyInformation = await CompanyInformation.findOne({
                attributes: ['name','cnpj','email','phone','phone_url','address','address_url','instagram_url'],
                limit: 1
            })

            return res.status(200).json(companyInformation)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    }
}