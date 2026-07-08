import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.imcrwanda.com';
  
  const routes = [
    '',
    '/about',
    '/gallery',
    '/news',
    '/publication',
    '/contact',
  ];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  const locales = ['en', 'fr'];
  
  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/news' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });
  
  return sitemapEntries;
}
