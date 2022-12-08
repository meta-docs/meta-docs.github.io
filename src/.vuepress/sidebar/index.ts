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
    },
    {
      text: "Spring",
      icon: "leaf",
      prefix: "spring/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "Test",
      icon: "leaf",
      prefix: "test/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "Design Patten",
      icon: "leaf",
      prefix: "design-patten/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "Mysql",
      icon: "leaf",
      prefix: "mysql/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "MQ",
      icon: "leaf",
      prefix: "mq/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "ORM",
      icon: "leaf",
      prefix: "orm/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "Other",
      icon: "leaf",
      prefix: "other/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "Interview",
      icon: "leaf",
      prefix: "interview/",
      collapsible: true,
      children: "structure"
    }
  ],
});
