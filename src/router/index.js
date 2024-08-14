import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('../views/PreviewView.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/EditView.vue')
  },
  {
    path: '*',
    name: 'NotFoundError',
    component: HomeView,
  },
  {
    path: '/foo/*',
    name: 'FooNotFoundError',
    component: HomeView,
  },
  {
    path: '/bar/*',
    name: 'BarNotFoundError',
    component: HomeView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
