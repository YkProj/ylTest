import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import shopping from '@/components/shopping'
import myIndex from '@/components/myIndex'
import tabs from '@/components/tabs'
import HelloWorld from '@/components/HelloWorld'
import Bind from '@/components/pages/Bind'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: shopping
    },
    {
      path: '/myIndex',
      name: 'myIndex',
      component: myIndex
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: tabs
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Bind',
      name: 'Bind',
      component: Bind
    },
  ]
})
