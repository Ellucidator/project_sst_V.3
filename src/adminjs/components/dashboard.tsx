import { ApiClient } from 'adminjs'
import React, { useState, useEffect } from 'react'

import { LineChartComponent } from './linechart.component.js'

const Dashboard: React.FC = () => {
    const [data, setData] = useState<any>(null)
    const api = new ApiClient()

    useEffect(() => {
        api.getDashboard()
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {

            })
    }, [])
    return (
        //@ts-ignore
        <LineChartComponent data={data} />
    )
}

export default Dashboard