import { DefaultSeoProps } from 'next-seo';

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Your Company Name',
  defaultTitle: 'Your Company Name',
  description: 'Default description of your website',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.yourwebsite.com/',
    siteName: 'Your Company Name',
  },
};

export const HOME_SEO = {
  title: 'Welcome to Our Company',
  description: 'We provide cutting-edge solutions for your digital needs. Explore our services and see how we can help your business grow.',
  openGraph: {
    title: 'Welcome to Our Company',
    description: 'We provide cutting-edge solutions for your digital needs. Explore our services and see how we can help your business grow.',
    images: [
      {
        url: 'https://www.yourwebsite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Our Company OG Image',
      },
    ],
  },
};