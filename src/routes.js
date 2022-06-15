import React from 'react';
import appSettingRoutes from './routes/appSettingRoutes';
import donationRoutes from './routes/donationRoutes';
import donorRoutes from './routes/donorRoutes';
import languageRoutes from './routes/languageRoutes';
import roleRoutes from './routes/roleRoutes';
import statusRoutes from './routes/statusRoutes';
import translationRoutes from './routes/translationRoutes';
// import publicRoutes from './routes/publicRoutes';
import userRoutes from './routes/userRoutes';
import wordRoutes from './routes/wordRoutes';
import wordTypeRoutes from './routes/wordTypeRoutes';
import contactUsRoutes from './routes/contactUsRoutes';

const Breadcrumbs = React.lazy(() =>
  import('./views/CoreUI/Base/Breadcrumbs/Breadcrumbs')
);
const Cards = React.lazy(() => import('./views/CoreUI/Base/Cards/Cards'));
const Carousels = React.lazy(() =>
  import('./views/CoreUI/Base/Carousels/Carousels')
);
const Collapses = React.lazy(() =>
  import('./views/CoreUI/Base/Collapses/Collapses')
);
const Dropdowns = React.lazy(() =>
  import('./views/CoreUI/Base/Dropdowns/Dropdowns')
);
const Forms = React.lazy(() => import('./views/CoreUI/Base/Forms/Forms'));
const Jumbotrons = React.lazy(() =>
  import('./views/CoreUI/Base/Jumbotrons/Jumbotrons')
);
const ListGroups = React.lazy(() =>
  import('./views/CoreUI/Base/ListGroups/ListGroups')
);
const Navbars = React.lazy(() => import('./views/CoreUI/Base/Navbars/Navbars'));
const Navs = React.lazy(() => import('./views/CoreUI/Base/Navs/Navs'));
const Paginations = React.lazy(() =>
  import('./views/CoreUI/Base/Paginations/Pagnations')
);
const Popovers = React.lazy(() =>
  import('./views/CoreUI/Base/Popovers/Popovers')
);
const ProgressBar = React.lazy(() =>
  import('./views/CoreUI/Base/ProgressBar/ProgressBar')
);
const Switches = React.lazy(() =>
  import('./views/CoreUI/Base/Switches/Switches')
);
const Tables = React.lazy(() => import('./views/CoreUI/Base/Tables/Tables'));
const Tabs = React.lazy(() => import('./views/CoreUI/Base/Tabs/Tabs'));
const Tooltips = React.lazy(() =>
  import('./views/CoreUI/Base/Tooltips/Tooltips')
);
const BrandButtons = React.lazy(() =>
  import('./views/CoreUI/Buttons/BrandButtons/BrandButtons')
);
const ButtonDropdowns = React.lazy(() =>
  import('./views/CoreUI/Buttons/ButtonDropdowns/ButtonDropdowns')
);
const ButtonGroups = React.lazy(() =>
  import('./views/CoreUI/Buttons/ButtonGroups/ButtonGroups')
);
const Buttons = React.lazy(() =>
  import('./views/CoreUI/Buttons/Buttons/Buttons')
);
const Charts = React.lazy(() => import('./views/CoreUI/Charts/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() =>
  import('./views/CoreUI/Icons/CoreUIIcons/CoreUIIcons')
);
const Flags = React.lazy(() => import('./views/CoreUI/Icons/Flags/Flags'));
const FontAwesome = React.lazy(() =>
  import('./views/CoreUI/Icons/FontAwesome/FontAwesome')
);
const SimpleLineIcons = React.lazy(() =>
  import('./views/CoreUI/Icons/SimpleLineIcons/SimpleLineIcons')
);
const Alerts = React.lazy(() =>
  import('./views/CoreUI/Notifications/Alerts/Alerts')
);
const Badges = React.lazy(() =>
  import('./views/CoreUI/Notifications/Badges/Badges')
);
const Modals = React.lazy(() =>
  import('./views/CoreUI/Notifications/Modals/Modals')
);
const Colors = React.lazy(() => import('./views/CoreUI/Theme/Colors/Colors'));
const Typography = React.lazy(() =>
  import('./views/CoreUI/Theme/Typography/Typography')
);
const Widgets = React.lazy(() => import('./views/CoreUI/Widgets/Widgets'));
const User = React.lazy(() => import('./views/User/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  // { path: '/translate', exact: true, name: 'Translate' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  {
    path: '/buttons/button-dropdowns',
    name: 'Button Dropdowns',
    component: ButtonDropdowns
  },
  {
    path: '/buttons/button-groups',
    name: 'Button Groups',
    component: ButtonGroups
  },
  {
    path: '/buttons/brand-buttons',
    name: 'Brand Buttons',
    component: BrandButtons
  },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  {
    path: '/icons/simple-line-icons',
    name: 'Simple Line Icons',
    component: SimpleLineIcons
  },
  {
    path: '/notifications',
    exact: true,
    name: 'Notifications',
    component: Alerts
  },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

let combinedRoutes = [
  ...routes,
  ...appSettingRoutes,
  ...donationRoutes,
  ...donorRoutes,
  ...languageRoutes,
  ...roleRoutes,
  ...statusRoutes,
  ...translationRoutes,
  // ...publicRoutes,
  ...userRoutes,
  ...wordRoutes,
  ...wordTypeRoutes,
  ...contactUsRoutes
];
export default combinedRoutes;
