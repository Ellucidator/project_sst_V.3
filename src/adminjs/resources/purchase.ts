import { ResourceOptions } from "adminjs";


export const purchaseResourceOptions:ResourceOptions = {
    navigation:'Clientes',
    editProperties:['status'],
    showProperties:['id','user_id','frete','all_value','status','payment_type','payment_status','payment_id','createdAt','updatedAt','items_sell'],
    filterProperties:['id','user_id','status','payment_type','payment_status','payment_id','createdAt','updatedAt'],
    listProperties:['id','user_id','frete','all_value','status','payment_status'],
    properties: {
        status: {
            availableValues:[
                { value: 'Recebido', label: 'Recebido' },
                { value: 'Transportadora', label: 'Transportadora' },
                { value: 'Enviado', label: 'Enviado' },
                { value: 'Entregue', label: 'Entregue' },
            ]
        },
        items_sell:{
            components: {
                show:'ItemsSell',
            }
        },
    },
}

