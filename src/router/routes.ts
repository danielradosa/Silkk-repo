import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },
  {
    path: '/projects/all',
    component: () => import('layouts/ProjectLayout.vue'),
    children: [{ path: '', component: () => import('pages/Projects.vue') }],
  },
  {
    path: '/project/:name/:id',
    props: true,
    component: () => import('layouts/SingleProLayout.vue'),
    children: [{ path: '', component: () => import('pages/Project.vue') }],
  },
  {
    path: '/project/create-new',
    component: () => import('layouts/CreateLayout.vue'),
    children: [{ path: '', component: () => import('pages/Create.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/Login.vue') }],
  },
  // Always leave this as last one,
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
