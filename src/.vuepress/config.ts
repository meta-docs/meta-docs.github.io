import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "FangTao",
      description: "我的博客",
    }
  },

  theme,

  shouldPrefetch: false,
});
