import { Request, Response } from "express";
import { MercadoPagoPaymentActionResponse, payment } from "../models/MercadoPago.js";
import { CompanyInformation, Purchase } from "../models/index.js";
import { wpMenssage } from "../../helpers/wpMenssage.js";


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
                            wpMenssage({
                                to: purchase.User!.phone,
                                body: 'Ola, ' + purchase.User!.first_name + ' obrigado por comprar na ' + company!.name + '!\n' +
                                    'Seu pagamento foi aprovado e seu pedido já está em preparação :).' +
                                    '\n' +
                                    '\nQualquer duvida, entre em contato com nosso suporte:' +
                                    '\n' + company!.phone_url
                            }),
                            wpMenssage({
                                to: company!.phone,
                                body: 'Acabamos de receber um novo pedido de ID ' + purchase.id + '!\n' +
                                    '\n'
                                    + 'Para mais informações, acesse a plataforma:\n\n '
                                    + `${process.env.DOMINIO_URL}/admin/resources/purchases/records/${purchase.id}/show'`
                            })
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