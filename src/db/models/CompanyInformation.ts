import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../index.js"

export interface CompanyInformation{
    id: number
    name: string
    cnpj: string
    email: string
    phone: string
    phone_url: string
    address: string
    address_url: string
    instagram_url: string
}

export interface CompanyInformationAtributes extends Optional<CompanyInformation, 'address_url' | 'instagram_url' | 'phone_url' | 'id'>{}

export interface CompanyInformationInstace extends Model<CompanyInformation, CompanyInformationAtributes>, CompanyInformation{}

export const CompanyInformation = sequelize.define<CompanyInformationInstace,CompanyInformation>('CompanyInformation',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    cnpj:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    phone:{
        type: DataTypes.STRING
    },
    phone_url:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    address_url:{
        type: DataTypes.STRING
    },
    instagram_url:{
        type: DataTypes.STRING
    }
},
{
    tableName: 'company_information',
    hooks: {
        beforeCreate: async() => {

            const verify = await CompanyInformation.count()
            if(verify > 0){
                throw new Error('Company already exists')
            }
        }
    }
})