import { Filter } from 'adminjs'

export const dashboardHandler = async (request, response, context) => {
    const resource = context._admin.findResource('items_sell')
    const filter = new Filter({}, resource)
    const resourceData = await resource.find(filter, { sort: { sortBy: 'createdAt', direction: 'desc' } }, context)

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
        const scoreArr = data?.filter(filterItem => {
            const dateB = new Date(filterItem.params.createdAt)
            if(dateA === dateB.getFullYear() && item === dateB.getMonth() + 1) {
                return filterItem
            }
        }).map(mapItem => mapItem.params.quantity)
        return (
            {
                name: item,
                score: scoreArr.reduce((a, b) => a + b, 0)
            })
    })
    return chartdata
}

