import { ApiClient } from 'adminjs'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { ItemsSellComponent } from './itemsSell.component.js'
import { Item } from 'src/db/models/Item.js'
import { ItemSell } from 'src/db/models/ItemSell.js'

const ItemsSell: React.FC = () => {
    const [data, setData] = useState<any>(null)
    const router = useParams()
    const api = new ApiClient()

    useEffect(() => {
        const id = router.recordId
        api.getPage({pageName: 'items_sell'}).then((response) => {
            const [itemsSell, items]:[ItemSell[], Item[]] = (response.data as [ItemSell[], Item[]])

            const mapItens = itemsSell.filter(item=>item.purchase_id === parseInt(id!)).map((item) => {
                const itemData = items.find(it => it.id === item.item_id)

                return {
                    ...item,
                    thumbnail_url: itemData?.thumbnail_url,
                    name: itemData?.name
                }
            })
            
            setData(mapItens)
        })
    }, [])
    return (
        //@ts-ignore
        <ItemsSellComponent data={data} />
    )
}

export default ItemsSell