
// import {add} from './b.js'
// import "./a.css"
// import "./b.css"
// import "./button.less"
//  import "./font.css"
//import "@babel/polyfill"
//  const img= require("./xianhua.jpg")


// let k=require('./a.json')
// console.log("[[[[[[[");
// console.log("img",img);
// let pic=new Image();
// pic.src=img;
// let root=document.getElementById("root")
// root.append(pic)
// console.log("Hello EveryOne");
// console.log("k:",k);
// console.log("add:",add(3,7));
// console.log("qq")
// console.log("qq")
const test_const="welcome";
let p=new Promise((res,rej)=>{
    if(test_const==="welcome"){
        res("OK")
    }
    rej("fail")

})
console.log(p,"p");

// if (module.hot) {
//     console.log(111111111111);
  
// }