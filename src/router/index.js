import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Soon from '../views/SoonView.vue'
import ProjectView from '../views/ProjectView.vue'
import NotFound from '../views/NotFound.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import AboutView from '../views/AboutView.vue'
import CreditsView from '../views/CreditsView.vue'
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
    }
  ]
})

export default router
