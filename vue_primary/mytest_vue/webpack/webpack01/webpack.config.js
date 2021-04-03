const path=require("path")
const { resolve } = require("path")
const HtmlWebpackPlugin=require("html-webpack-plugin")

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const  MiniCssExtractPlugin  = require('mini-css-extract-plugin')


module.exports={
  devtool:"source-map",
    entry:"./src/index.js",/**打包文件入口 */
    output:{
        filename:"main.js",/**打包输出的文件名 */
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

                        name:"[name]_[path]_[hash:8].[ext]",/**ext为拓展名，该属性设置打包后的文件名 */
                        outputPath:"./image"
                      },
                    },
                  ],
            },{
              test:/\.css$/i,/**css的文件处理 */
                use: [
                    {
                      loader: "style-loader",
                      options: {
                        injectType:"singletonStyleTag" /**样式合并到一个style标签中 */
                      },
                    },"css-loader"
                  ],
            },
            // {
            //     test:/\.css$/,
            //     loader:'style-loader!css-loader'
            // },
            {
              test:/\.less$/,/**less的文件处理 */
              use: [
                  // {
                  //   loader: "style-loader",
                  //   options: {
                  //     injectType:"singletonStyleTag" /**多个样式文件合并到一个style标签中 */
                  //   },
                  // }
                  {loader: MiniCssExtractPlugin.loader}
                  ,"css-loader",
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
                ],},
               
                

                {
                  test:/\.woff$/,/**woff的文件处理 */
                    use: [
                        {
                          loader: "file-loader",
                        }
                      ],
                },
                

            
            ]
    },
   
    plugins:[
      new HtmlWebpackPlugin({
        template:"src/test.html",/**模板 */
        filename:"test_template.html"/**生成文件 */
      }),
       new CleanWebpackPlugin(),
       new MiniCssExtractPlugin({
         filename:'[name].css'
       })
       




    ],
    
}