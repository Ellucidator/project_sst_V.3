
export function getPaginationParams(query: any): [ perPage: number,offset: number, order: string[]] {
    const { page, perPage,order } = query

    const perPageNumber = typeof perPage === 'string' && parseInt(perPage, 10) > 0
        ? parseInt(perPage, 10)
        : 10

    const pageNumber = typeof page === 'string' && parseInt(page, 10) > 0
        ? parseInt(page, 10)
        : 1
    
    const offset = (pageNumber - 1) * perPageNumber

    const orderQ = typeof order === 'string' 
    ? order.split('-') 
    : ['created_at', 'DESC'] 
    
    return [perPageNumber,offset, orderQ]
}