import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../db/index.js";
import { themeConfig } from "./themes/index.js";
import { light, noSidebar } from "@adminjs/themes";
import { componentLoader } from "./components/component-loader.js";
import { AdminJSResources } from "./resources/index.js";
import { User } from "../db/models/User.js";
import bcrypt from "bcrypt"



AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
    componentLoader,
    databases:[sequelize],
    defaultTheme:themeConfig.id,
    availableThemes:[themeConfig,light, noSidebar],
    resources:AdminJSResources,
    version:{admin:true},
    rootPath: '/admin',
    locale:{
        language:'pt-BR',
        availableLanguages: ['pt-BR', 'en'],
    },

})




export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs,{
    authenticate: async (email, password) => {
        const user = await User.findOne({ where: { email } })

        if(user && user.role === 'admin'){
            const passwordMatch = await bcrypt.compare(password,user.password.toString())
            if(passwordMatch){
                return user
            }
        }

        return false
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie'

},null,{
    resave: false,
    saveUninitialized: false
})