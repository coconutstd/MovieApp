import i18n from 'i18next'
import { initReactI18next} from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: {
        sayHello: "Good Morning"
      }
    }
  },
  ko: {
    translation: {
      welcome: {
        sayHello: "좋은 아침입니다"
      }
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en"
})

export default i18n;