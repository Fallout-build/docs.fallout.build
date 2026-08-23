import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Fallout',
  tagline: 'Build automation for C#/.NET — the hard-fork successor to NUKE',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://docs.fallout.build',
  baseUrl: '/',

  organizationName: 'Fallout-build',
  projectName: 'docs.fallout.build',

  onBrokenLinks: 'warn',
  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // CI checks out the Fallout repo into ./fallout-source/ so its
          // docs/website/ folder is the markdown source for this build.
          // (docs/ also holds non-website reference material — dependencies.md,
          // roadmap.md, cli-tools/ — that intentionally lives outside this path.)
          path: './fallout-source/docs/website',
          routeBasePath: '/docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Fallout-build/Fallout/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      // Dark-first brand, but honour the visitor's system preference.
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Fallout',
      logo: {
        alt: 'Fallout',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/Fallout-build/Fallout',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Introduction', to: '/docs/introduction'},
            {label: 'Getting started', to: '/docs/getting-started/installation'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'GitHub', href: 'https://github.com/Fallout-build/Fallout'},
            {label: 'Issues', href: 'https://github.com/Fallout-build/Fallout/issues'},
            {label: 'Releases', href: 'https://github.com/Fallout-build/Fallout/releases'},
          ],
        },
        {
          title: 'Origin',
          items: [
            {label: 'Originally NUKE', href: 'https://github.com/nuke-build/nuke'},
            // Migration/ isn't part of the site's content path (docs/website/) —
            // link straight to the source file on GitHub.
            {
              label: 'Migration guide',
              href: 'https://github.com/Fallout-build/Fallout/blob/main/docs/Migration/from-nuke.md',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Maintainers of Fallout. Originally based on NUKE by Matthias Koch and contributors. Distributed under the MIT License.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['csharp', 'powershell', 'bash', 'yaml', 'json'],
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/docs',
        docsDir: 'fallout-source/docs/website',
      },
    ],
  ],
};

export default config;
