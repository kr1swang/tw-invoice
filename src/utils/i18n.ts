import i18n from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'

export const supportedLngs = ['zh-Hant', 'en']
export const defaultLng = supportedLngs[0]

i18n
  .use(resourcesToBackend((lng: string, ns: string) => import(`../../public/locales/${lng}/${ns}.json`)))
  .use(initReactI18next)
  .init({
    ns: ['common'],
    defaultNS: ['common'],
    supportedLngs,
    lng: defaultLng,
    fallbackLng: defaultLng,
    load: 'currentOnly',
    interpolation: {
      escapeValue: false,
      skipOnVariables: false
    }
  })

export default i18n
