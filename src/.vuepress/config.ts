import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "WQ-知识库",
  description: "念念不忘，终有回响",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
