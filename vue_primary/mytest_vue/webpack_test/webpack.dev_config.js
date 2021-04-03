//watch时刻监控代码变动生成build.js
//webpack启动参数/* --open 自动打开浏览器 --hot热加载 --inline自动刷新 --progress显示加载进度 */
//--config 添加配置文件
//配置rules时  ！分割，？添加上参数
module.exports={
  entry:{
'main':'./main.js'
  },
  output:{
    filename: "./build.js"
  },
  module:{
    rules:[{
      test:/\.css$/,
      loader:'style-loader!css-loader'
    },{
      test:/\.(jpg|gif|png)$/,
      loader:'url-loader?limit=100'
    }]



  },
  watch:true,




}
