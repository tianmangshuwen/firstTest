//触发视图更新
function updateview() {
  console.log("更新")
}
const oldarray = Array.prototype;
const newarray = Object.create(oldarray);
['pop', 'push', 'reverse', 'shift', 'unshift', 'slice'].forEach((methodName) => {
 

  newarray[methodName] = function () {
    updateview();
    oldarray[methodName].call(this, ...arguments)

  }
})
//重新定义属性，进行监听
function defineRecative(target, key, value) {
  observer(value)
  Object.defineProperty(target, key, {
    get() {
      return value;
    }, set(newValue) {
      //注意value在闭包中设置之后在get获取仍能获取到新值
      if (newValue !== value) {

        observer(newValue)


        value = newValue;
        updateview()
      }



    }


  })
}

function observer(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }
  if(Array.isArray(target)){
    target.__proto__=newarray
  }
  for (let key in target) {
    defineRecative(target, key, target[key])
  }

}

const data = {
  name: 'ys',
  age: '10',
  info: [{ 'name': 'px' }]


}
//监听数据
observer(data)

//测试:
// data.name = 'list'
// data.age = 10
debugger
data.info.push(5)
delete data.name
