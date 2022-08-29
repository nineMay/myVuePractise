import type { Composer } from "vue-i18n";
import { i18n } from "@/locales";

// Composer是PHP的包管理、包依赖关系管理工具，有了他我们就可以把别人优秀的代码用到我们的项目中，
type I18nGlobalTranslation = Composer["t"];
type I18nTranslationRestParameters = [string, any];

/**
 * 国际化转换工具函数，主要用于处理动态路由的title
 * @param {string|Title18n} message message
 * @param is18n 默认为true，获取对应的翻译文本，否则返回本身
 * @return message
 */

export function transformI18n(message: string | Title18n = "", isI18n = true) {
  if (!message) {
    return;
  }

  //处理动态路由的title，格式{zh_CN:"",en_US:""}
  if (typeof message === "object") {
    return message[i18n.global?.locale];
  }

  if (isI18n && typeof message === "string") {
    return i18n.global.t(message);
  }
  return message;
}
