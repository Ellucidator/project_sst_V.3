import { AuthenticatedRequest } from "../middlewares/auth.js";
import { Purchase } from "../models/Purchases.js";


export const purchaseController = {

    add:async (req:AuthenticatedRequest, res:Response) => {
        try {

            const userId = req.user!.id
            const {items} = req.body
            const purchase = await Purchase.bulkCreate()
        } catch (error) {
            
        }
    }

}