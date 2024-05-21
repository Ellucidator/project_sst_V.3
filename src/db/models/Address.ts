import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../index.js"

export interface Address {
    id: number
    user_id: number
    zip_code: string
    state: string
    city: string
    neighborhood: string
    street: string
    house_number: string
    complement: string
    phone_number: string
    reference_point: string
    active: boolean
}

export interface CreateAddressAttributes extends Optional<Address, 'house_number' | 'complement' | 'reference_point' | 'active'> { }

export interface AddressInstance extends Model<Address, CreateAddressAttributes>, Address { }

export const Address = sequelize.define<AddressInstance, Address>('Address', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    zip_code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state: {
        type: DataTypes.CHAR(3),
        allowNull: false
    },
    city: {
        type: DataTypes.CHAR(100),
        allowNull: false
    },
    neighborhood: {
        type: DataTypes.CHAR(100),
        allowNull: false
    },
    street: {
        type: DataTypes.CHAR(100),
        allowNull: false
    },
    house_number: {
        type: DataTypes.CHAR(10),
        defaultValue: "S/N",
        allowNull: true
    },
    complement: {
        type: DataTypes.CHAR(15),
        allowNull: true
    },
    phone_number: {
        type: DataTypes.CHAR(15),
        allowNull: false
    },
    reference_point: {
        type: DataTypes.CHAR(100),
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
},
    {
        tableName: 'adresses'
    })