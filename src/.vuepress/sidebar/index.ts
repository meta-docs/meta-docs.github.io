import { sidebar } from "vuepress-theme-hope";

export const sidebarConfig = sidebar({
  "/": [
    "",
    // {
    //   text: "Java 基础知识",
    //   icon: "creative",
    //   prefix: "/java",
    //   link: "/java",
    //   children: [
    //     "structure"
    //   ]
    // },
    {
      text: "文章",
      icon: "note",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    "slides",
  ],
  "/java/": "structure",
  "/git/": "structure",
});
