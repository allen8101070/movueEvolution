import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import nowplaying from '@/components/nowplaying'
import moviepage from '@/components/moviepage'
import coming from '@/components/coming'
import usamovie from '@/components/usamovie'
import cnmovie from '@/components/cnmovie'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/nowplaying',
      name: 'nowplaying',
      component: nowplaying
    },    
    {
      path: '/coming',
      name: 'coming',
      component: coming
    }, 
    {
      path: '/usamovie',
      name: 'usamovie',
      component: usamovie
    },
    {
      path: '/cnmovie',
      name: 'cnmovie',
      component: cnmovie
    },
    {
    path : '/moviepage/:id',
    name: 'moviepage',
    component: moviepage
    }
  ]
})
