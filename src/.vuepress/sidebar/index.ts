import { sidebar } from "vuepress-theme-hope";

export const sidebarConfig = sidebar({
  "/": [
    "start",
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
      text: "Spring",
      icon: "leaf",
      prefix: "spring/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "Test",
      icon: "interact",
      prefix: "test/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "Cloud Native",
      icon: "cache",
      prefix: "cloud-native/",
      collapsible: true,
      children: "structure"
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
      icon: "nodeJS",
      prefix: "node/",
      collapsible: true,
      children: [
        "pnpm"
      ]
    },
    {
      text: "Design Patten",
      icon: "guide",
      prefix: "design-pattern/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "Mysql",
      icon: "mysql",
      prefix: "mysql/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "MQ",
      icon: "relation",
      prefix: "mq/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "ORM",
      icon: "frame",
      prefix: "orm/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "Other",
      icon: "others",
      prefix: "other/",
      collapsible: true,
      children: "structure"
    }
  ],
  "/interview/":"structure"
});
