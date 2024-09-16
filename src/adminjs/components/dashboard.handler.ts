import { Filter } from 'adminjs'

export const dashboardHandler = async (request, response, context) => {
    const resource = context._admin.findResource('items_sell')
    const filter = new Filter({}, resource)
    const resourceData = await resource.find(filter, { sort: { sortBy: 'createdAt', direction: 'asc' } }, context)

    const data = resourceData.map((item: any) => item.toJSON(context.currentAdmin))

    const dateA = new Date().getFullYear()

    const items = Array.from(new Set(data?.map((item) => {
        const dateB = new Date(item.params.createdAt)
        if(dateA === dateB.getFullYear()) {
            return dateB.getMonth() + 1
        }
        return
    })))

    
    const chartdata = items.map(item => {
        const scoreArr:any[] = data?.filter(filterItem => {
            const dateB = new Date(filterItem.params.createdAt)
            if(dateA === dateB.getFullYear() && item === dateB.getMonth() + 1) {
                return filterItem
            }
        })
        return (
            {
                name: item,
                quantity: scoreArr.reduce((a, b) => a + b.params.quantity, 0),
                value: scoreArr.reduce((a, b) => a + b.params.price, 0)
            })
    })
    return chartdata
}

