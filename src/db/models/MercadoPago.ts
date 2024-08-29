import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

export const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_MP! })
export const preference = new Preference(client)
export const payment = new Payment(client);


export interface MercadoPagoPaymentActionResponse {
    action: string;
    api_version: string;
    data: {
        id: string;
    };
    date_created: string;
    id: number;
    live_mode: boolean;
    type: string;
    user_id: string;
}