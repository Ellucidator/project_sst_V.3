import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../db/index.js";
import { light, noSidebar } from "@adminjs/themes";
import { themeConfig } from "./themes/index.js";
import { componentLoader, Components } from "./components/component-loader.js";
import { AdminJSResources } from "./resources/index.js";
import { User } from "../db/models/User.js";
import bcrypt from "bcrypt"
import { ADMINJS_COOKIE_PASSWORD } from "../config/enviroment.js";
import session from "express-session"
import connectSession from "connect-session-sequelize"
import { dashboardHandler } from "./components/dashboard.handler.js";
import { itemsSellHandler } from "./components/itemsSell.handler.js";


const SequelizeStore = connectSession(session.Store)
const store = new SequelizeStore({ db: sequelize })
store.sync()

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
    componentLoader,
    dashboard: {
        component: Components.Dashboard,
        handler: dashboardHandler
    },
    pages: {
        items_sell: {
            component: Components.ItemsSell,
            handler: itemsSellHandler
        },
        items: {
            component: Components.ItemsSell,
            handler: itemsSellHandler,
        }
    },
    branding: {
        theme: {
            colors: {
                bg: "#1d1d1d",
                filterBg: "#292929",
                sidebar: "#292929",
                container: "#292929",
                primary100: "#ff0043",
                primary80: "#ff1a57",
                primary60: "#ff3369",
                primary40: "#ff4d7c",
                primary20: "#d3d3d3",
                grey100: "#d3d3d3",
                grey80: "#ff0043",
                grey60: "#d3d3d3",
                grey40: "#d3d3d3",
                grey20: "#d3d3d3",
                accent: "#d3d3d3",
                text: "#fff",
                border: "#3c3c3c",
                inputBorder: "rgba(145, 158, 171, 0.32)",
                errorLight: "#C20012",
                successLight: "#007D7F",
                warningLight: "#A14F17",
                info: "#ff1a57",
                infoDark: "#d3d3d3",
                infoLight: "#ff1a57",
                highlight: "#ff0043",
                separator: "#1d1d1d",
                errorDark: "#C20012",
                successDark: "#007D7F",
                warningDark: "#A14F17",
                warning: "#A14F17",
                error: "#C20012",
                success: "#007D7F",
                love: "#C20012",
                white: "#3c3c3c",
            },
            
            shadows: {
                login: '0 15px 24px 0 rgba(0, 0, 0, 0.3)',
                cardHover: '0 4px 12px 0 rgba(0, 0, 0, 0.3)',
                drawer: '-2px 0 8px 0 rgba(0, 0, 0, 0.3)',
                card: '0 1px 6px 0 rgba(0, 0, 0, 0.3)'
            },
        },
        withMadeWithLove: false,
        companyName: 'e-commerce',
        favicon: '/icon.png',
        logo: '/logo.svg',
    },
    defaultTheme:themeConfig.id,
    availableThemes: [themeConfig,light, noSidebar],
    resources: AdminJSResources,
    version: { admin: true },
    rootPath: '/admin',
    locale: {
        language: 'pt-BR',
        translations: {
            ['pt-BR']: {
                labels: {
                    categories: 'Categorias',
                    sub_categories: 'Sub Categorias',
                    items: 'Itens',
                    item_characteristics: 'Caracteristicas do Item',
                    users: 'Usários',
                    adresses: 'Endereços',
                    purchases: 'Compras',
                    promotions: 'Promoções',
                    items_promotion: 'Itens Promocionais',
                    tags: 'Marcações',
                    tags_value: 'Filtros',
                    sub_categories_tags: 'Marcações por Sub Categorias',
                    items_tags_value: 'Filtros por Itens',
                    company_information: 'Informação da Empresa',
                    items_sell: 'Itens Vendidos',
                },
                properties: {
                    createdAt: 'Criado em',
                    updatedAt: 'Atualizado em',
                    name: 'Nome',
                    iten: 'Item',
                    description: 'Descrição',
                    position: 'Posição',
                    category_id: 'Categoria',
                    price: 'Preço',
                    in_stock: 'Em Estoque',
                    featured: 'Destaque',
                    promotion: 'Em Promoção',
                    sub_category_id: 'Sub Categoria',
                    thumbnail: 'Imagem de Capa',
                    images: 'Imagens',
                    item_id: 'Item',
                    width: 'Largura',
                    Height: 'Altura',
                    Weight: 'Peso',
                    insurance_value: 'Valor de Seguro',
                    perfilFile: 'Imagem de Perfil',
                    first_name: 'Primeiro Nome',
                    last_name: 'Ultimo Nome',
                    phone: 'Telefone',
                    birth: 'Data de Nascimento',
                    role: 'Tipo de Usário',
                    user_id: 'Usário',
                    phone_number: 'Número de Telefone',
                    receiver_name: 'Nome do Recebedor',
                    zip_code: 'CEP',
                    state: 'Estado',
                    city: 'Cidade',
                    street: 'Rua',
                    house_number: 'Número da Casa',
                    neighborhood: 'Bairro',
                    complement: 'Complemento',
                    reference_point: 'Ponto de Referência',
                    active: 'Ativo',
                    all_value: 'Valor Total',
                    payment_type: 'Tipo de Pagamento',
                    payment_status: 'Status do Pagamento',
                    payment_id: 'Id do Pagamento-MP',
                    thumbnailUrl: 'Imagem de Capa',
                    promotion_id: 'Promoção',
                    tag_id: 'Marcação',
                    tag_value_id: 'Filtro',
                    phone_url: 'Link de contato',
                    address: 'Endereço',
                    address_url: 'Link de Endereço',
                    instagram_url: 'Link do Instagram',
                }
            }
        },
        availableLanguages: ['pt-BR'],
        localeDetection: true
    },

})



// export const adminJsRouter = AdminJSExpress.buildRouter(adminJs)

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        const user = await User.findOne({ where: { email } })

        if (user && user.role === 'admin') {
            const passwordMatch = await bcrypt.compare(password, user.password.toString())
            if (passwordMatch) {
                return user
            }
        }

        return false
    },
    cookiePassword: ADMINJS_COOKIE_PASSWORD

}, null, {
    resave: false,
    saveUninitialized: false,
    store: store,
    secret: ADMINJS_COOKIE_PASSWORD
})