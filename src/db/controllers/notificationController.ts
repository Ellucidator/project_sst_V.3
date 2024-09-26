import { Request, Response } from "express";
import { MercadoPagoPaymentActionResponse, payment } from "../models/MercadoPago.js";
import { CompanyInformation, Purchase } from "../models/index.js";


export const notificationController = {

    purchaseStatusMp: async (req: Request, res: Response) => {

        try {
            const json_body: MercadoPagoPaymentActionResponse = req.body

            if (json_body.data.id) res.status(200).json({})

            const payamentInfo = await payment.get({ id: json_body.data.id })
            if (!payamentInfo.additional_info?.items) return

            const purchase = await Purchase.findOne({
                where: {
                    id: payamentInfo.additional_info.items[0].category_id
                },
                include: [
                    {
                        association: 'User',
                        attributes: ['name', 'phone']
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
                        fetch(`https://graph.facebook.com/v20.0/${process.env.WP_NUMBER_ID}/messages`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${process.env.WP_TOKEN}`
                            },
                            method: 'POST',
                            body: JSON.stringify({
                                messaging_product: 'whatsapp',
                                recipient_type: 'individual',
                                to: `55${purchase.User!.phone}`,
                                type: 'text',
                                text: {
                                    preview_url: true,
                                    body: `Ola, ${purchase.User!.first_name} obrigado por     
                                    comprar na ${company!.name}! Seu pagamento já foi aprovado.\n
                                    E seu pedido já está em preparação.\n\n
                                    Qualquer duvida, entre em contato com nosso suporte:\n
                                    ${company!.phone_url}`
                                }
                            })
                        }),
                        fetch(`https://graph.facebook.com/v20.0/${process.env.WP_NUMBER_ID}/messages`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${process.env.WP_TOKEN}`
                            },
                            method: 'POST',
                            body: JSON.stringify({
                                messaging_product: 'whatsapp',
                                recipient_type: 'individual',
                                to: `55${company!.phone}`,
                                type: 'text',
                                text: {
                                    preview_url: true,
                                    body: `Acabamos de receber um novo pedido de ID ${purchase.id}!\n
                                    para mais informações, acesse a plataforma:\n
                                    ${process.env.DOMINIO_URL}/admin/resources/purchases/records/${purchase.id}/show`
                                }
                            })
                        })
                    ])

                    return
                }
            }
            
            return
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message })
            }
        }
    },
}