function reactive(target={}){
  if(typeof target !=='object' || target==null){
    //不是对象或数组,直接返回
    return target
  }

  //用于配置代理
  const proxyConf={
    get(target,key,receiver){
      //只处理本身属性
      const ownKeys = Reflect.ownKeys(target);
      if(ownKeys.includes(key)){
        console.log('get:',key)  ;//监听

      }
      const result =Reflect.get(target,key,receiver)
      return reactive(result);
    },
    set(target,key,val,receiver){
      //重复数据不处理
      if(val === target[key]){
        return true;
      }
      const result =Reflect.set(target,key,val,receiver);
      console.log('set:',key,val);
      return result;
    },deleteProperty(target,key){
      const result = Reflect.deleteProperty(target,key);
      console.log('deleteProperty:',key)
      return result;
    }


  }
  const observed=new Proxy(target,proxyConf)
return observed;


}


//测试数据
const data={
  name:'zhang',
  age:20,
  info:[{a:'hi'}]
}

const proxyData=reactive(data)