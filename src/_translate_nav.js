export default {
  items: [
    {
      name: 'Terjemahan',
      url: '/translate',
      icon: 'icon-paper-plane'
      // badge: {
      //   variant: 'info',
      //   text: 'NEW'
      // }
    },
    {
      title: true,
      name: 'Menu',
      wrapper: {
        // optional wrapper object
        element: '', // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '' // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Tentang Translator',
      url: '/about-translator',
      icon: 'icon-info'
    },
    // {
    //   name: 'Komunitas',
    //   url: '/community',
    //   icon: 'icon-fire'
    // },
    {
      name: 'Privacy & Terms',
      url: '/privacy-and-terms',
      icon: 'icon-lock-open'
    },
    {
      name: 'Hubungi Kami',
      url: '/contact-us',
      icon: 'icon-bubbles'
    },
    {
      name: 'Dukung Kami',
      url: '/support-us',
      icon: 'icon-support'
    },
    {
      name: 'Tentang Mongosilakan',
      url: '/about-mongosilakan',
      icon: 'icon-star'
    }
  ]
};
