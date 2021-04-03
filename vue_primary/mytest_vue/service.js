const Koa = require('koa');
let app = new Koa();

const Router = require('koa-router');
const router = new Router();

const path = require('path');
var list = [15];
const fs = require('fs');
const formidable = require('koa-formidable');


//解决跨域
app.use(async (ctx, next) => {
  console.log(ctx)
  ctx.set('Access-Control-Allow-Origin', '*');
  //ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  //  if (ctx.method == 'OPTIONS') {
  //  ctx.body = 200;
  // } else {
  await next();
  //}
});
app.use(async (ctx, next) => {
  var formidable = require('formidable');
  var form = new formidable.IncomingForm();

  form.uploadDir = path.resolve('./');
  form.keepExtensions = true;

  form.parse(ctx.req, function (err, fields, file) {





  })
  form.onPart = function (part) {
    part.addListener('data', function (data) {

      require('fs').appendFileSync('test.jpg', data)
    })
  }
  await next();

});

router.get('/get', async (ctx, next) => {
  var tmp = new Set(list);
  console.log('jinlaile ',JSON.stringify(ctx))

  ctx.body = [...tmp].join('')||'';
})

router.get('/get_img',  async (ctx, next) =>{
  let img_url=[{
    'url':'http://localhost:52330/nodejs_work/code/project_cms/src/assets/1.png',
    'img':'./assets/1.png'
  },{
    'url':'http://localhost:52330/nodejs_work/code/project_cms/src/assets/2.png',
    'img':'./assets/2.png'
  },{
    'url':'http://localhost:52330/nodejs_work/code/project_cms/src/assets/3.png',
    'img':'./assets/3.png'
  }]

  ctx.body=img_url;

});

router.get('/get_news_list/:id',  async (ctx, next) => {
  let params=ctx.params
  //console.log("params" + JSON.stringify(params))
 // console.log("get_list" + JSON.stringify(ctx))
  let news_list=[{
    "id":1,
    "summary":"there is only one truth",
    "title":"kenan",
    "creat_time":"2015-10-12T03:15:20.000Z",
    'url':'http://localhost:63442/nodejs_work/code/project_cms/src/assets/4.png',
    'img':'./assets/4.png',
    'click':15
  },{
    "id":2,
    "summary":"Swallow flying south",
    "title":"yanzi",
    "creat_time":"2015-10-23T13:15:20.000Z",
    'url':'http://localhost:52330/nodejs_work/code/project_cms/src/assets/5.png',
    'img':'./assets/5.png',
    'click':12
  },{
    "id":4,
    "summary":"Frozen into a dog",
    "title":"leng",
    "creat_time":"2015-12-12T03:34:20.000Z",
    'url':'http://localhost:52330/nodejs_work/code/project_cms/src/assets/6.png',
    'img':'./assets/6.png',
    'click':16
  }]

  ctx.body=news_list;
});
router.post('/postdata', async (ctx, next) => {
  console.log("req" + JSON.stringify(ctx.request.query_params))
  console.log("111" + JSON.stringify(ctx))
  ctx.body = 'Hello World4';
  
  ctx.req.on('data', data => {

    console.log('data:',data)
    list.push(data.toString());
  })
  ctx.body = 'ok';


})
router.post('/upload', async (ctx, next) => {
  ctx.body = 'ok';
})
router.get('/name', async (ctx, next) => {
  ctx.body = 'Nancy';
})
router.get('/age', async (ctx, next) => {
  ctx.body = '21';
})
router.get('/sex', async (ctx, next) => {
  let a = ctx.request.url.split('?')[1];
  //console.log(a)
  if (ctx.request.url.split('?')[1] === 'name=Nancy') {
    ctx.body = '女';
  } else {
    ctx.body = '男';
  }

})


app.use(router.routes());
app.use(router.allowedMethods());
// 设置端口号
const port = 8888;

// 监听端口号
app.listen(port, () => {
  console.log(`server started on ${port}`)
})
