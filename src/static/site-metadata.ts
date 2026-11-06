interface ISiteMetadataResult {
  siteTitle: string;
  siteUrl: string;
  description: string;
  keywords: string;
  logo: string;
  navLinks: {
    name: string;
    url: string;
  }[];
}

const getBasePath = () => {
  const baseUrl = import.meta.env.BASE_URL;
  return baseUrl === '/' ? '' : baseUrl;
};

// Site owner name, injected at build time from the GitHub Actions secret
// SITE_OWNER (VITE_SITE_OWNER, see .github/workflows/gh-pages.yml).
// When set, the title becomes "<owner>'s Workouts Map".
const siteOwner = import.meta.env.VITE_SITE_OWNER || '';
const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.baidu.com';
// GitHub repository (owner/name), injected at build time from github.repository.
// const githubRepo = import.meta.env.VITE_GITHUB_REPO || 'ben-29/workouts_page';

const data: ISiteMetadataResult = {
  siteTitle: siteOwner ? `${siteOwner}'s Workouts Map` : 'Workouts Map',
  siteUrl,
  logo:
    import.meta.env.VITE_SITE_LOGO ||
    'https://avatars3.githubusercontent.com/u/6956444?s=460&u=97e1062227c4088db3c987146455245c6fa78441',
  description: 'Personal site and blog',
  keywords: 'workouts, running, cycling, riding, roadtrip, hiking, swimming',
  navLinks: [
    {
      name: 'Summary',
      url: `${getBasePath()}/summary`,
    },
    {
      name: 'Blog',
      url: siteUrl,
    },
    {
      name: 'About',
      url: siteUrl,
    },
  ],
};

export default data;
