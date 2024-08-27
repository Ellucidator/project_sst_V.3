import { ResourceOptions } from "adminjs";


export const purchaseResourceOptions:ResourceOptions = {
    navigation:'Clientes',
    editProperties:['status'],
    showProperties:['id','user_id','frete','all_value','status'],
    filterProperties:['id','user_id','status','createdAt','updatedAt'],
    listProperties:['id','user_id','frete','all_value','status'],
    properties: {
        status: {
            availableValues:[
                { value: 'Recebido', label: 'Recebido' },
                { value: 'Transportadora', label: 'Transportadora' },
                { value: 'Enviado', label: 'Enviado' },
                { value: 'Entregue', label: 'Entregue' },
            ]
        },
    }
}