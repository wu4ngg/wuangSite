import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Soon from '../views/SoonView.vue'
import ProjectView from '../views/ProjectView.vue'
import NotFound from '../views/NotFound.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import AboutView from '../views/AboutView.vue'
import CreditsView from '../views/CreditsView.vue'
import Test from '../views/Test.vue'
import Login from '../views/AdminLogin.vue'
import AdminHome from '../views/AdminHome.vue'
import Permitted from '../views/Permitted.vue'
import AdminProj from '../views/AdminProject.vue'
import PublishProjectView from '../views/PublishProjectView.vue'
import TeamView from '../views/TeamView.vue'
const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/project',
      name: 'Project',
      component: ProjectView
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Soon
    },
    {
      path: '/team',
      component: TeamView
    },
    {
      path: '/projects/:id',
      name: 'Project Detail',
      component: ProjectDetail
    },
    {
      path: '/about',
      name: '',
      component: AboutView
    },
    {
      path: '/credits',
      component: CreditsView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Ignore',
      component: NotFound
    },
    {
      path: '/test',
      name: 'Admin Test',
      component: Test,
    },
    {
      path: '/admin',
      name: 'Ignore',
      component: Login,
    },
    {
      path: '/admin/home',
      name: 'Admin',
      component: AdminHome
    },
    {
      path: '/unauthorized',
      component: Permitted
    },
    {
      path: '/admin/proj',
      name: 'Admin Project',
      component: AdminProj 
      
    },
    {
      path: '/admin/proj/publish',
      name: 'Admin Publish Project',
      component: PublishProjectView
    }
  ]
})

export default router
