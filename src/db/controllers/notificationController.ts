import { Request, Response } from "express";
import { MercadoPagoPaymentActionResponse, payment } from "../models/MercadoPago.js";
import { CompanyInformation, Purchase } from "../models/index.js";
import { wpMenssage, wpMenssageTemplate } from "../../helpers/wpMenssage.js";


export const notificationController = {

    purchaseStatusMp: async (req: Request, res: Response) => {

        try {
            const json_body: MercadoPagoPaymentActionResponse = req.body

            if (json_body.data.id) res.status(200).json({})

            async function processPurchase() {

                const payamentInfo = await payment.get({ id: json_body.data.id })
                if (!payamentInfo.additional_info?.items) return

                const purchase = await Purchase.findOne({
                    where: {
                        id: payamentInfo.additional_info.items[0].category_id
                    },
                    include: [
                        {
                            association: 'User',
                            attributes: ['first_name', 'phone']
                        }
                    ]
                })
                const company = await CompanyInformation.findOne()

                if (purchase) {
                    await purchase.update(
                        {
                            payment_id: json_body.data.id,
                            payment_type: payamentInfo.payment_type_id,
                            payment_status: payamentInfo.status
                        }
                    )
                    if (payamentInfo.status === 'approved' || payamentInfo.status === 'authorized') {

                        await Promise.all([
                            wpMenssageTemplate({
                                to: purchase.User!.phone,
                                name:'confirmacao_pedido',
                                variables:[purchase.User!.first_name, company!.name],
                                dinamicUrl:purchase.id
                            }),
                            wpMenssageTemplate({
                                to: company!.phone,
                                name:'shipment_confirmation_3',
                                dinamicUrl:`${purchase.id}/show`
                            }),
                        ])

                    }
                }
            }

            processPurchase()
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },
}