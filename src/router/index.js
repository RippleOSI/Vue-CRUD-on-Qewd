import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '@/views/LoginPage'
import DashboardPage from '@/views/DashboardPage'
import TablePage from '@/views/TablePage'
import Patients from '@/views/Patients'
import isPatientSelected from '@/middleware/isPatientSelected'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage,
    meta: {
      breadcrumb: [
        {
          name: 'Dashboard',
          link: '/'
        }
      ],
      middleware: [
        isPatientSelected
      ]
    }
  },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients
  },
  {
    path: '/table/:view',
    name: 'TablePage',
    component: TablePage,
    meta: {
      middleware: [
        isPatientSelected
      ]
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
