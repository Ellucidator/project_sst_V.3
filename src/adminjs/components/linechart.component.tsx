import React from 'react'

import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts'

export const LineChartComponent: React.FC = ({ data }: any) => {
    const renderColorfulLegendText = (value: string, entry: any) => {
        const { color } = entry;
    
        return <span style={{ color }}>{value}</span>;
    };

    return (
        <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <AreaChart width={730} height={350} data={data}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>

                </defs>
                <Legend formatter={(value, entry)=>renderColorfulLegendText('Produtos vendidos por mês:', entry)} 
                    iconType='square' verticalAlign='top'
                />
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} height={300} />
                <Tooltip formatter={(value) => [value, 'Quantidade']} />
                <Area type="monotone" dataKey="quantity" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
            <AreaChart width={730} height={350} data={data}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Legend formatter={(value, entry)=>renderColorfulLegendText('Valor de vendas por mês:', entry)} 
                    iconType='square' verticalAlign='top'
                />
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} height={300} />
                <Tooltip formatter={(value) => [value, 'Valor']} />
                <Area type="monotone" dataKey="value" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        </div>
    )
}
