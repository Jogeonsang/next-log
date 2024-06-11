import { createInstance, i18n } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import i18nConfig from "./next-i18next.config";
import Cookies from "js-cookie";

const namespace = "common";
export default async function initTranslations(
  i18nInstance?: i18n,
  resources?: any
) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(LanguageDetector).use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string) =>
          import(`./public/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespace,
    fallbackNS: namespace,
    ns: namespace,
    preload: resources ? [] : i18nConfig.locales,
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
  });

  const detectedLanguage = i18nInstance.language || i18nConfig.defaultLocale;
  Cookies.set("lang", detectedLanguage, { expires: 365 });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
