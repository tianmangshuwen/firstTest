const path=require("path")
const { resolve } = require("path")
const HtmlWebpackPlugin=require("html-webpack-plugin")

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const  MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const webpack  = require("webpack")


module.exports={
  devtool:"source-map",
  /**打包文件入口 */
  /**单入口 */
   // entry:"./src/index.js",
   /**多入口 可以是对象*/
   entry:{
     index:"./src/index.js",
     list:"./src/list.js",
     test:"./src/test.js",
    },
    output:{
      /**单出口 */
        //filename:"main.js",/**打包输出的文件名 */
        /**多出口 */
        filename:"[name].js",
        path:path.resolve(__dirname,"dist") /**打包文件输出路径 */
    },
    module:{

        rules:[
            { /**图片处理 */
              test:/\.(jpg|gif|png)$/i,/**i匹配大小写 */
              use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 100,/**超过100字节单独打包成文件，不超过则以base64写入总体的打包文件 */
                      esModule: false,
                     name:"[name]_[hash:8].[ext]",/**ext为拓展名，该属性设置打包后的文件名 */
                      outputPath:"./image"
                    },
                  },
                ],
            },
            {/**css的文件处理 */
              test:/\.css$/i,
                use: [
                    {
                      loader: "style-loader",
                      options: {
                        injectType:"singletonStyleTag" /**样式合并到一个style标签中 */
                      },
                    },"css-loader"
                  ],
            },
            {/**less的文件处理 */
              test:/\.less$/,
              use: [
                  // {
                  //   loader: "style-loader",
                  //   options: {
                  //     injectType:"singletonStyleTag" /**多个样式文件合并到一个style标签中 */
                  //   },
                  // },
                  /**mini-css-extract-plugin在production模式下更常用于获取单独的CSS文件。对于development模式（包括webpack-dev-server），您可以使用style-loader，因为它使用多个将CSS注入DOM中 */
                  {loader: MiniCssExtractPlugin.loader},
                  "css-loader",
                  {
                    loader:"postcss-loader",/**postcss-loader为了兼容浏览器，添加浏览器前缀，并压缩 CSS */
                    options: {
                      // sourceMap: false,
                      postcssOptions: {
                        // plugins: [require("autoprefixer")(
                        //   {overrideBrowserslist:["last 2 versions","> 1%", ]
                        //   }
                        // )],
                        plugins: [require("autoprefixer")()]
                        ,
                      },
                    },
                  },"less-loader"
                ],
              },
            {/**woff的字体文件处理 */
              test:/\.woff$/,
                use: [
                    {
                      loader: "file-loader",
                    }
                  ],
            },
            {/**js|jsx的处理 */
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [[
                    '@babel/preset-env',{
                      "targets": {
                        chrome:"67"
                      },
                      "corejs":  2,
                      "useBuiltIns": "usage",

                    }
                    

                
                ]]
                }
              }
            }
          
        
                

            
            ]
    },
   devtool:"inline-source-map",
    plugins:[
      /**根据模板生成一个文件 */
      /**单文件 */
      // new HtmlWebpackPlugin({
      //   template:"src/test.html",/**模板 */
      //   filename:"test_template.html"/**生成文件 */
      // }),
      /**多文件 */
       new HtmlWebpackPlugin({
        template:"src/test.html",/**模板 */
        filename:"index.html",/**生成文件 */
        chunks:["index"],/**使html引入对应的js */
      }), 
      new HtmlWebpackPlugin({
        template:"src/test.html",/**模板 */
        filename:"test.html",/**生成文件 */
        chunks:["test"]
      }), 
      new HtmlWebpackPlugin({
        template:"src/test.html",/**模板 */
        filename:"list.html",/**生成文件 */
        chunks:["list"]
      }),
      /**打包时清除之前的打包内容 */
       new CleanWebpackPlugin(),
       new MiniCssExtractPlugin({
         /**将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载 */
         filename:'[name].css',
       }),
       /**webpack热更新*/
       new webpack.HotModuleReplacementPlugin()
       




    ],
    target: "web", /**webpack升级后对target进行了调整，原先默认为web，但是现在会根据开发者配置的browserslist而发生变化,会导致热更新不生效 */
    devServer:{
      contentBase:"dist",
      port:8081,
      open:true,
      hot:true,
      hotOnly:true,
      //compress: true
    }
    
}