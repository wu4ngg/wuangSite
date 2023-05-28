import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Soon from '../views/SoonView.vue'
import ProjectView from '../views/ProjectView.vue'
import NotFound from '../views/NotFound.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
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
      path: '/:pathMatch(.*)*',
      name: 'Ignore',
      component: NotFound
    },
    {
      path: '/projects/:id',
      component: ProjectDetail
    }
  ]
})

export default router
