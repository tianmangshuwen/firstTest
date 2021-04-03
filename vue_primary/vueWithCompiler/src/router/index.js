import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import testVue from '@/components/testVue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[{
        path: '/testVue',
        name: 'testVue',
        component: testVue,

      }
        

      ]
    }
  ]
})
