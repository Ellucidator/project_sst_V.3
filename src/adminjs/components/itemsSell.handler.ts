import { Filter } from 'adminjs'


export const itemsSellHandler = async (request, response, context) => {
    const resource = context._admin.findResource('items_sell')
    const resourceItems = context._admin.findResource('items')

    const filter = new Filter({}, resource)
    const filterItems = new Filter({}, resourceItems)

    const resourceData = await resource.find(filter, { sort: { sortBy: 'createdAt', direction: 'asc' } }, context)
    const resourceDataItems = await resourceItems.find(filterItems, { sort: { sortBy: 'createdAt', direction: 'asc' } }, context)

    const dataItems = resourceDataItems.map((item: any) => item.toJSON(context.currentAdmin.params))
    .map((item: any) => item.params)

    const data = resourceData.map((item: any) => item.toJSON(context.currentAdmin))
    .map((item: any) => item.params)

    
    return [data, dataItems]
}

