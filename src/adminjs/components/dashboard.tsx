import { ApiClient } from 'adminjs'
import React, { useState, useEffect } from 'react'

import { LineChartComponent } from './linechart.component.js'

const Dashboard: React.FC = () => {
    const [data, setData] = useState(null)
    const api = new ApiClient()

    useEffect(() => {
        api.getDashboard()
            .then((response) => {
                console.log(response.data)
                setData(response.data)
            })
            .catch((error) => {
                // Handle errors here
            })
    }, [])
    return (
        <LineChartComponent data={data} />
    )
}

export default Dashboard