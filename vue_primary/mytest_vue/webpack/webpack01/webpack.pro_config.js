const path=require("path")
const { resolve } = require("path")
module.exports={
    entry:"./src/index.js",
    output:{
        filename:"main.js",
        path:path.resolve(__dirname,"buildPro")
    },
    mode:"production"
}