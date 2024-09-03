import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/demo/",
  {
    text: "博文",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "java",
        icon: "pen-to-square",
        prefix: "java/jvm/",
        children: [
          { text: "jvm调优jcmd", icon: "pen-to-square", link: "jvm调优jcmd" },
          { text: "jvm调优jstat", icon: "pen-to-square", link: "jvm调优jstat" }
        ],
      },
      {
        text: "大数据",
        icon: "pen-to-square",
        prefix: "大数据/",
        children: [
          {
            text: "离线搭建CDH6",
            icon: "pen-to-square",
            link: "离线搭建CDH6",
          },
          {
            text: "大数据杂谈",
            icon: "pen-to-square",
            link: "大数据杂谈",
          }
        ],
      },
      {
        text: "中间件",
        prefix: "中间件/netty/",
        icon: "pen-to-square",
        link: "netty初学"
      },
      { text: "开源项目",
        prefix: "开源项目/",
        icon: "pen-to-square",
        link: "VEDIO"
      },
    ],
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
