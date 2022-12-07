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
    },
    {
      text: "Gradle",
      icon: "lanunch",
      prefix: "gradle/",
      collapsible: true,
      children: [
        "settings",
        "catalog",
      ]
    },
    {
      text: "Node",
      icon: "lanunch",
      prefix: "node/",
      collapsible: true,
      children: [
        "pnpm"
      ]
    }
  ],
});
