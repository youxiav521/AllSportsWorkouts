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
// Logo image filename (e.g. 1.jpg) under public/images/, injected at build time
// from the GitHub Actions secret SITE_LOGO_NAME (VITE_SITE_LOGO_NAME).
// Falls back to favicon.png when the secret is not set.
const logoName = import.meta.env.VITE_SITE_LOGO_NAME || 'favicon.png';
// GitHub repository (owner/name), injected at build time from github.repository.
// const githubRepo = import.meta.env.VITE_GITHUB_REPO || 'ben-29/workouts_page';

const data: ISiteMetadataResult = {
  siteTitle: siteOwner ? `${siteOwner}'s Workouts Map` : 'Workouts Map',
  siteUrl,
  // Logo is read from public/images/<logoName>. getBasePath() carries the deploy
  // path prefix (e.g. /allWorkouts), so it works both locally and on GitHub Pages.
  logo: `${getBasePath()}/images/${logoName}`,
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
