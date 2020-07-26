import Dashboard from './containers/MainContent/dashboard/dashboard';

import Pageslogin from './containers/MainContent/Auth/Login';
import Logout from './containers/MainContent/Auth/Logout';
import Pagesregister from './containers/MainContent/Auth/Register';
import ForgetPassword from './containers/MainContent/Auth/ForgetPassword';
import ResetPassword from './containers/MainContent/Auth/ResetPassword';

import Pages404 from './containers/MainContent/pages/pages-404';
import Pages500 from './containers/MainContent/pages/pages-500';

import PostList from './containers/MainContent/pages/post/list';
import PostEdit from './containers/MainContent/pages/post/view/edit';
import PostNew from './containers/MainContent/pages/post/view/new';
import PostBuilder from './containers/MainContent/pages/post/builder/index.tsx';


const routes = [

    // public Routes
    { path: '/login', component: Pageslogin, ispublic: true },
    { path: '/logout', component: Logout, ispublic: true },
    { path: '/register', component: Pagesregister, ispublic: true },
    { path: '/forget-password', component: ForgetPassword, ispublic: true },
    { path: '/reset-password', component: ResetPassword, ispublic: true },
    
    { path: '/posts/:id/builder', component: PostBuilder },
    { path: '/posts/:id/view', component: PostEdit },
    { path: '/posts/new', component: PostNew },
    { path: '/posts/:id?', component: PostList },
    
    { path: '/pages-404', component: Pages404 },
    { path: '/pages-500', component: Pages500 },

    { path: '/layout-collapsed-sidebar', component: Dashboard },
    { path: '/layout-light-sidebar', component: Dashboard },

    { path: '/dashboard', component: Dashboard },
    { path: '/', component: Pageslogin },

];

export default routes;