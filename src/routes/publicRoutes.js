import React from 'react';
const Translate = React.lazy(() => import('../views/Public/Translate'));
const AboutTranslator = React.lazy(() =>
  import('../views/Public/AboutTranslator')
);
const AboutMongosilakan = React.lazy(() =>
  import('../views/Public/AboutMongosilakan')
);
const ContactUs = React.lazy(() => import('../views/Public/ContactUs'));
const Thanks = React.lazy(() => import('../views/Public/Thanks'));
const PrivacyAndTerms = React.lazy(() =>
  import('../views/Public/PrivacyAndTerms')
);
// const TranslateForm = React.lazy(() =>
//   import('../views/Public/TranslateForm')
// );

const routes = [
  {
    path: '/translate',
    name: 'Translate',
    component: Translate
  },
  {
    path: '/about-translator',
    name: 'AboutTranslator',
    component: AboutTranslator
  },
  {
    path: '/privacy-and-terms',
    name: 'PrivacyAndTerms',
    component: PrivacyAndTerms
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks
  },
  {
    path: '/about-mongosilakan',
    name: 'AboutMongosilakan',
    component: AboutMongosilakan
  }
];

export default routes;
