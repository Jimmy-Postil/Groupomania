import { createRouter, createWebHashHistory } from 'vue-router'
import LoginHome from '../views/LoginHome'
import SignupHome from '../views/SignupHome'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginHome
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupHome
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
