import { createRouter, createWebHashHistory } from 'vue-router'
import LoginHome from '../views/LoginHome'
import SignupHome from '../views/SignupHome'
import UserWall from '../views/UserWall'
import UserProfil from '../views/UserProfil'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginHome
  },
  {
    path: '/',
    name: 'Signup',
    component: SignupHome
  },
  {
    path: '/userwall',
    name: 'UserWall',
    component: UserWall
  },
  {
    path: '/userprofil',
    name: 'UserProfil',
    component: UserProfil
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
