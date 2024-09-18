import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../db/index.js";
import { themeConfig } from "./themes/index.js";
import { light, noSidebar } from "@adminjs/themes";
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
const store = new SequelizeStore({db:sequelize})
store.sync()

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
    componentLoader,
    dashboard: {
        component:Components.Dashboard,
        handler:dashboardHandler
    },
    pages: {
        items_sell:{
            component:Components.ItemsSell,
            handler:itemsSellHandler
        },
        items:{
            component:Components.ItemsSell,
            handler:itemsSellHandler,
        }
    },
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
                accent:'#00FA9A',
            },
        },
        withMadeWithLove: false,
        companyName: 'e-commerce',
        favicon: '/icon.png',
        logo: '/logo.svg',
    },
    defaultTheme:themeConfig.id,
    availableThemes:[themeConfig,light, noSidebar],
    resources:AdminJSResources,
    version:{admin:true},
    rootPath: '/admin',
    locale:{
        language:'pt-BR',
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
        availableLanguages: ['pt-BR', 'en'],
        localeDetection: true
    },

})



// export const adminJsRouter = AdminJSExpress.buildRouter(adminJs)

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
    cookiePassword: ADMINJS_COOKIE_PASSWORD

},null,{
    resave: false,
    saveUninitialized: false,
    store: store,
    secret: ADMINJS_COOKIE_PASSWORD
})