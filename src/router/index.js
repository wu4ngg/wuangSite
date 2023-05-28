import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Soon from '../views/SoonView.vue'
import ProjectView from '../views/ProjectView.vue'
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
    }
  ]
})

export default router
