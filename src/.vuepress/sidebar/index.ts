import { sidebar } from "vuepress-theme-hope";

export const sidebarConfig = sidebar({
  "/": [
    "",
    {
      text: "Java",
      icon: "java",
      prefix: "/java",
      link: "/java",
      collapsible: true,
      children: [
        "bytecode",
        "collector"
      ]
    },
    {
      text: "Git",
      icon: "git",
      prefix: "git/",
      link: "/git",
      collapsible: true,
      children: "structure"
    }
  ],
});
