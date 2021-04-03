const path=require("path")
const { resolve } = require("path")
module.exports={
    /**入口 */
    entry:"./src/index.js",
    /**输出 */
    output:{
        filename:"main.js",
        path:path.resolve(__dirname,"buildDev")
    },
    
    mode:"development",/**模式 */
    module:{

        rules:[
            { 
                test:/\.(jpg|gif|png)$/i,
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 20480,
                      },
                    },
                  ],
            },
            // {
            //     test:/\.css$/,
            //     loader:'style-loader!css-loader'
            // },
            ]
    }

}