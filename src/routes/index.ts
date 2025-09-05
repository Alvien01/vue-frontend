import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'
const getToken = () => Cookies.get('token')

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/auth/register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/login.vue')
    },
    {
        path: '/admin/dashboard',
        name: 'dashboard',
        component: () => import('../views/admin/dashboard/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/users',
        name: 'admin.users.index',
        component: () => import('../views/admin/users/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/users/create',
        name: 'admin.users.create',
        component: () => import('../views/admin/users/create.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin/users/edit/:id',
        name: 'admin.users.edit',
        component: () => import('../views/admin/users/edit.vue'),
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// navigation guard
router.beforeEach((to, _from, next) => {
    const token = getToken();

    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        next({ name: 'login' });
    } 
    else if ((to.name === 'login' || to.name === 'register') && token) {
        next({ name: 'dashboard' });
    } 
    else {
        next();
    }
});

export default router
