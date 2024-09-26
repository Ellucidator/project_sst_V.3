import { Link,Avatar} from '@adminjs/design-system'
import React from 'react'


export const ItemsSellComponent: React.FC = ({ data }: any) => {
    
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            border: '1px solid grey',
            borderRadius: '5px',
            width: '35%',
        }}>
            {data?.map((item: any) =>{
                return (
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        flex:'1',
                        alignItems: 'center',
                        borderBottom: '1px solid grey',
                        padding: '10px',
                        borderRadius: '5px'
                    }}>
                        <p style={{
                            fontWeight: 'bold',
                            fontSize: 'medium'
                        }}
                        >{`${item.quantity} x`}</p>
                        <Avatar src={`/files/${item.thumbnail_url}`} />
                        <Link href={`/admin/resources/items/records/${item.item_id}/show`}>{item.name}</Link>
                    </div>
                )
            } )}
            
        </div>
    )
}
