import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../index.js"

export interface Address{
    user_id: number
    cep: string
    state: string
    city: string
    neighborhood: string
    street: string
    house_number: string
    complement: string
    reference_point: string
    active: boolean
}

export interface CreateAddressAttributes extends Optional<Address,'house_number'|'complement'|'reference_point'|'active'>{}

export interface AddressInstance extends Model<Address,CreateAddressAttributes>,Address{}

export const Address = sequelize.define<AddressInstance,Address>('Address',{
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references:{
            model:'users',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    cep:{
        type: DataTypes.STRING,
        allowNull: false
    },
    state:{
        type: DataTypes.STRING,
        allowNull: false
    },
    city:{
        type: DataTypes.STRING,
        allowNull: false
    },
    neighborhood:{
        type: DataTypes.STRING,
        allowNull: false
    },
    street:{
        type: DataTypes.STRING,
        allowNull: false
    },
    house_number:{
        type: DataTypes.STRING,
        allowNull:true,
        defaultValue: 'S/N'
    },
    complement:{
        type: DataTypes.STRING,
        allowNull: true
    },
    reference_point:{
        type: DataTypes.STRING,
        allowNull: true
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
})