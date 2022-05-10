import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },
  {
    path: '/admin',
    meta: { requiresAuth: true },
    component: () => import('layouts/AdminLayout.vue'),
    children: [{ path: '', component: () => import('pages/Admin.vue') }],
  },
  {
    path: '/panel',
    meta: { requiresAuth: true },
    component: () => import('layouts/AdminPanelLayout.vue'),
    children: [{ path: '', component: () => import('pages/Panel.vue') }],
  },
  {
    path: '/projects',
    meta: { requiresAuth: true },
    component: () => import('layouts/ProjectLayout.vue'),
    children: [{ path: '', component: () => import('pages/Projects.vue') }],
  },
  {
    path: '/project/:id',
    meta: { requiresAuth: true },
    props: true,
    component: () => import('layouts/SingleProLayout.vue'),
    children: [{ path: '', component: () => import('pages/Project.vue') }],
  },
  {
    path: '/project/create-new',
    meta: { requiresAuth: true },
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
