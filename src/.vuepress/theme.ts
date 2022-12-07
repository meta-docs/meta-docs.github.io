import { hopeTheme } from "vuepress-theme-hope";
import { navbarConfig } from "./navbar/index.js";
import { sidebarConfig } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://mister-hope.github.io",

  author: {
    name: "Mr.Eric",
    url: "https://meta-docs.github.io/",
  },

  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "meta-docs/meta-docs.github.io",

  docsDir: "src",

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    medias: {
      Gitee: "https://example.com",
      GitHub: "https://example.com",
    },
  },

  locales: {
    "/": {
      // navbar
      navbar: navbarConfig,

      // sidebar
      sidebar: sidebarConfig,

      footer: "默认页脚",

      displayFooter: true,

      blog: {
        description: "一个后端开发者",
        intro: "/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    }
    
  },

  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"]
    },
  },

  plugins: {
    blog: {
      autoExcerpt: false,
    },

    
    // Disable features you don’t want here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      imageLazyload: true,
      imageTitle: true,
      imageSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});
