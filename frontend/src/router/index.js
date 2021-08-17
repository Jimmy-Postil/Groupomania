import { createRouter, createWebHashHistory } from 'vue-router'
import LoginHome from '../views/LoginHome'
import SignupHome from '../views/SignupHome'
import UserWall from '../views/UserWall'

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
  },
  {
    path: '/userwall',
    name: 'UserWall',
    component: UserWall
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
