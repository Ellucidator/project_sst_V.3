import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../index.js"

export interface Address {
    id: number
    user_id: number
    receiver_name: string
    zip_code: number
    state: string
    city: string
    neighborhood: string
    street: string
    house_number: string
    complement: string
    phone_number: number
    reference_point: string
    active: boolean
}

export interface CreateAddressAttributes extends Optional<Address, 'id' | 'house_number' | 'complement' | 'reference_point' | 'active'> { }

export interface AddressInstance extends Model<Address, CreateAddressAttributes>, Address { }

export const Address = sequelize.define<AddressInstance, Address>('Address', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    receiver_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zip_code: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    house_number: {
        type: DataTypes.STRING,
        defaultValue: "S/N",
        allowNull: true
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone_number: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    reference_point: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
},
    {
        tableName: 'adresses',
    })