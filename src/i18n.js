import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import CourseSettings from "../course-settings"
import commonEN from "./locales/common/en"
import pointsBalloonEN from "./locales/pointsBalloon/en"
import userEN from "./locales/user/en"
import commonFI from "./locales/common/fi"
import pointsBalloonFI from "./locales/pointsBalloon/fi"
import userFI from "./locales/user/fi"
import commonRU from "./locales/common/ru"
import pointsBalloonRU from "./locales/pointsBalloon/ru"
import userRU from "./locales/user/ru"

const resources = {
  en: {
    common: commonEN,
    "points-balloon": pointsBalloonEN,
    user: userEN,
  },
  fi: {
    common: commonFI,
    "points-balloon": pointsBalloonFI,
    user: userFI,
  },
  ru: {
    common: commonRU,
    "points-balloon": pointsBalloonRU,
    user: userRU,
  },
}

// Check for saved language preference
const getSavedLanguage = () => {
  if (typeof window !== "undefined") {
    // Check current path FIRST (URL has priority over saved preferences)
    const path = window.location.pathname
    if (path.startsWith("/ru")) return "ru"

    // Then check localStorage
    const savedLang = localStorage.getItem("preferredLanguage")
    if (savedLang && ["en", "ru"].includes(savedLang)) {
      return savedLang
    }
  }
  return CourseSettings.language || "en"
}

i18n.use(initReactI18next).init({
  resources,
  ns: ["common", "user", "points-balloon"],
  defaultNS: "common",
  react: {
    wait: true,
  },
  lng: getSavedLanguage(),
  fallbackLng: "en",
})

export default i18n
