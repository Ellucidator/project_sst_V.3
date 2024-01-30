import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../db/index.js";
import { themeConfig } from "./themes/index.js";
import { light, noSidebar } from "@adminjs/themes";
import { componentLoader } from "./components/component-loader.js";
import { AdminJSResources } from "./resources/index.js";



AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
    componentLoader,
    databases:[sequelize],
    defaultTheme:themeConfig.id,
    availableThemes:[themeConfig,light, noSidebar],
    resources:AdminJSResources,
    version:{admin:true},
    rootPath: '/admin'

})


export const adminJsrouter = AdminJSExpress.buildRouter(adminJs);