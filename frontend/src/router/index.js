import { createRouter, createWebHashHistory } from 'vue-router'
import LoginHome from '../views/LoginHome'
import SignupHome from '../views/SignupHome'
import UserWall from '../views/UserWall'
import UserPost from '../views/UserPost'
import UserProfil from '../views/UserProfil'

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
  },
  {
    path: '/userpost',
    name: 'UserPost',
    component: UserPost
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
