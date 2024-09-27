import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
// import starlightLinksValidator from "starlight-links-validator";
//import starlightUtils from "@lorenzo_lewis/starlight-utils";
// import markdoc from '@astrojs/markdoc';
import remarkExternalLinks from "remark-external-links";
import starlightNutshell from "starlight-nutshell";
import rehypeExternalLinks from "rehype-external-links";

import compress from "astro-compress";

export default defineConfig({
  // site: 'https://jfrome1.github.io/ntw2029/', // GitHub Pages URL config
  // base: '/ntw2029/',
  integrations: [
    starlight({
      tableOfContents: {
        minHeadingLevel: 1,
        maxHeadingLevel: 2,
      },
      plugins: [
        // starlightLinksValidator(),
        starlightNutshell(),
        // starlightUtils({
        //   multiSidebar: {
        //     switcherStyle: "dropdown",
        //   },
        // }),
      ],
      title: 'NUS GenAI Policy Project',
      components: {
        // Override the default components.
        TableOfContents: "./src/components/CustomTableOfContents.astro",
        Pagination: "./src/components/CustomPagination.astro",
      },
      customCss: ["./src/styles/custom.css"],
	  sidebar: [
        {
          label: 'Home',
          link: 'index.md',
        },
        {
          label: 'GenAI Policy',
          link: 'gen-ai-policy.md',
        },
      ],
      head: [
        {
          tag: "script",
          attrs: {
            src: "https://scripts.simpleanalyticscdn.com/latest.js",
            defer: true,
            async: true,
          },
        },
      ],
    }),
    compress({
      HTML: {
        "html-minifier-terser": {
          removeComments: true,
        },
      },
    }),
  ],
  markdown: {
    remarkPlugins: [
      [
        remarkExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: " 🡕" },
        },
      ],
    ],
  },
});
