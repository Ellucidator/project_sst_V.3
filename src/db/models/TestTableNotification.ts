import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../index.js"

export interface TestTableNotification {
    id: number
    json_body: string
}


export interface TestTableNotificationCreateAttributes extends Optional<TestTableNotification, 'id'> { }

export interface TestTableNotificationInstance extends Model<TestTableNotification, TestTableNotificationCreateAttributes>, TestTableNotification { 
}

export const TestTableNotification = sequelize.define<TestTableNotificationInstance,TestTableNotification >('NotificationsMp', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    json_body: {
        type: DataTypes.JSON,
        allowNull: false
    }
},
{
    tableName:'notifications_mp'
})