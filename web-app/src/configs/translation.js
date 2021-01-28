import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
// import Backend from 'i18next-http-backend'
// import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
    en: {
        translation: {
            logout: 'Logout'
        }
    },
    fr: {
        translation: {
            logout: 'Déconnexion'
       } 
    }
}
i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    //.use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    //.use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next).init({
    lng:'fr',
    fallbackLng:'en',
    debug: true,
    resources,
    interpolation: {
        escapeValue: false
    }
})
export default i18n