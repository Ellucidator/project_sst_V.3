interface TextMenssage {
    to: string
    body: string
}

interface TemplateMenssage {
    to: string,
    name: string,
    variables?:string[],
    dinamicUrl?: string|number
}
export async function wpMenssage({to,body}:TextMenssage) {
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

export async function wpMenssageTemplate({to,name,variables,dinamicUrl}:TemplateMenssage) {
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
            type: 'template',
            template:{
                name,
                language:{
                    code:'pt_BR'
                },
                components:[
                    {
                        type:'body',
                        parameters: variables?.map(variable => ({type:'text',text: variable}))
                    },
                    {
                        type:'button',
                        sub_type:'URL',
                        index:0,
                        parameters:[
                            {
                                type:'text',
                                text:dinamicUrl
                            }
                        ]
                    }
                ]
            }
            
        })
    })
}