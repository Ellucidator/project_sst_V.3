import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../index.js"


export interface TagValue{
    id:number
    tag_id:number
    value:string
}

export interface CreateTagValueAttributes extends Optional<TagValue, 'id'>{}

export interface TagValueInstance extends Model<TagValue, CreateTagValueAttributes>, TagValue{}

export const TagValue = sequelize.define<TagValueInstance,TagValue>('TagValue',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    tag_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'tags',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    value:{
        type:DataTypes.STRING
    }
},
{
    tableName:'tags_value'
})