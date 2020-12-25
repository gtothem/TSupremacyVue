import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'Accounts',
          path: 'pages/accounts',
          component: () => import('@/views/dashboard/Accounts'),
        },
        {
          name: 'Schedules',
          path: 'pages/schedules',
          component: () => import('@/views/dashboard/Schedules'),
        },
        {
          name: 'Task Builder',
          path: 'pages/taskbuilder',
          component: () => import('@/views/dashboard/TaskBuilder'),
        },
        {
          name: 'Reports',
          path: 'pages/reports',
          component: () => import('@/views/dashboard/Reports'),
        },
        {
          name: 'Console',
          path: 'pages/console',
          component: () => import('@/views/dashboard/Console'),
        },
        {
          name: 'Proxies',
          path: 'pages/proxies',
          component: () => import('@/views/dashboard/Proxies'),
        },
        {
          name: 'User Profiles',
          path: 'pages/profiles',
          component: () => import('@/views/dashboard/Profiles'),
        },
        {
          name: 'Task View',
          path: 'pages/taskview',
          component: () => import('@/views/dashboard/TaskView'),
        },
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        },
      ],
    },
  ],
})
