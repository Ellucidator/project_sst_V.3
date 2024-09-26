interface Props {
    to: string
    body: string
}
export async function wpMenssage({to,body}:Props) {
    await fetch(`https://graph.facebook.com/v20.0/${process.env.WP_NUMBER_ID}/messages`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.WP_TOKEN}`
        },
        method: 'POST',
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: `55${to}`,
            type: 'text',
            text: {
                preview_url: true,
                body
            }
        })
    })
}