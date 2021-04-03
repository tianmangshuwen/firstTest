import img from './xianhua.jpg'
export default {
  template:`<div>我是app模板01
<img :src="img_url" ></div>`,
  data(){
    return {
      img_url:img
    }
  }
}
