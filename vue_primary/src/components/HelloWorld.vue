<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    测试脚本获取id：<input type="text" v-model.lazy ="id">
    <button @click="getData">获取数据</button>
    <button @click="postData(id,$event)">提交数据</button>
    <usercalen/>
  </div>
</template>

<script>
import {getRequest,postRequest} from '../utils/api'
import axios from 'axios';
axios.defaults.baseURL="http://127.0.0.1:8888/"
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id:'12'
    }
  },mounted:function(){


  },methods:{
   getData:function(){
          //$axios.get(url,option)

          // axios.get('/get').then((res)=>{
          //     console.log('返回get：'+JSON.stringify(res))
          //   this.id=res.data;

          // })
          // .catch((e)=>{
          //     console.log("异常："+e)
          // })


      getRequest('/get').then(resp=> {
        if (resp.status == 200) {
          console.log('test:',resp.data) ;
          this.id=resp.data;
        }
       
      }, resp=> {
       console.log('test2:',resp.data) ;
      });


        },
        postData:function (id,$event) {
          // axios.post('http://127.0.0.1:8888/postdata',id)
          //   .then((res)=>{
          //   axios.get('http://127.0.0.1:8888/get').then((res)=>{
          //      this.id=res.data;
          //      console.log('返回get2：'+JSON.stringify(res))
          //     })

          //   })
          //   .catch((e)=>{
          //     console.log("异常："+e)
          //   })

          postRequest('http://127.0.0.1:8888/postdata',{id:id}).then((res)=>{
            console.log('test_post',res.data)
            axios.get('http://127.0.0.1:8888/get').then((res)=>{
               this.id=res.data;
               console.log('返回get2：'+JSON.stringify(res))
              })

            })
            .catch((e)=>{
              console.log("异常："+e)
            })

         }
         }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
