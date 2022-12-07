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
      collapsible: true,
      children: "structure"
    },
    {
      text: "Gradle",
      icon: "/assets/icon/gradle.svg",
      prefix: "gradle/",
      collapsible: true,
      children: [
        "settings",
        "version_catalog",
      ]
    },
    {
      text: "Node",
      icon: "/assets/icon/node-js.svg",
      prefix: "node/",
      collapsible: true,
      children: [
        "pnpm"
      ]
    }
  ],
});
