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
    branding:{
        theme:{
            colors:{
                primary100: '#ff0043',
                bg: '#151419',
                border: '#39383d',
                text: '#fff',
                container: '#1A1A1E',
                sidebar: '#0C0B10',
                grey100: '#CDCBD4',
                grey60: '#8C8B90',
                grey40: '#151419',
                filterBg: '#1A1A1E',
                inputBorder: 'rgba(145, 158, 171, 0.32)',
                errorLight: '#C20012',
                successLight: '#007D7F',
                warningLight: '#A14F17',
                infoLight: '#ff1a57',
                
            }
        },
    },
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