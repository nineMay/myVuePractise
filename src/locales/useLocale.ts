import { useLocaleStoreWithOut } from "@/store/modules/locale";
import { Locale } from "ant-design-vue/es/locale-provider";
import { computed, unref } from "vue";
import { i18n } from ".";
import { LocaleType } from "./config";
import { loadLocalePool, setHtmlPageLang } from "./helper";

interface LangModule {
  message: Recordable;
  dateLocale: Recordable;
  dateLocaleName: string;
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut();

  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocale(locale);
  setHtmlPageLang(locale);
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut();
  const getLocale = computed(() => localeStore.getLocale);

  const getAntdLocale = computed<Locale>((): any => {
    return i18n.global.getLocaleMessage<{ antdLocale: Locale }>(
      unref(getLocale)
    ).antdLocale;
  });

  // 切换语言会改变 useI18n 的语言环境
  // 并提交配置修改

  async function changeLoacale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }
    if (loadLocalePool.includes(locale)) {
      //切换语言方法
      setI18nLanguage(locale);
      return locale;
    }
    const langModule = ((await import(`./lang/${locale}.ts`)) as any)
      .default as LangModule;
    if (!langModule) {
      return;
    }
    const { message } = langModule;
    globalI18n.setLocaleMessage(locale, message);
    loadLocalePool.push(locale);
    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    changeLoacale,
    getAntdLocale,
  };
}
