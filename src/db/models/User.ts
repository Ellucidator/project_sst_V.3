import { Model, Optional, DataTypes } from "sequelize"
import bcrypt from "bcrypt"
import { sequelize } from "../index.js"

export interface User{
    id: number
    first_name: string
    last_name: string
    phone: string
    birth: Date
    username: string
    email: string
    password: string
    role:'admin'| 'user'
    img_key:string
    bucket:string
    mime:string
}

export interface CreateUserAttributes extends Optional<User,'id'|'img_key'|'bucket'|'mime'>{}

export interface UserInstance extends Model<User, CreateUserAttributes>, User {
    checkPassword: (password:string, cb:(err?:Error|undefined, isMatch?:boolean) => void) => void
}

export const User = sequelize.define<UserInstance,User>('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    birth:{
        type: DataTypes.DATE,
        allowNull: false
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.BLOB,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isIn:[['admin','user']]
        }
    },
    img_key:{
        type: DataTypes.STRING,
        allowNull: true
    },
    bucket:{
        type: DataTypes.STRING,
        allowNull: true
    },
    mime:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'users',
    hooks:{
        beforeSave: async (user) => {
            if(user.isNewRecord || user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10)
            }
        }
    }
},)


User.prototype.checkPassword = function(password:string, cb:(err?:Error|undefined, isMatch?:boolean) => void) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err) cb(err, false)
        else cb(err, isMatch)
    })
}