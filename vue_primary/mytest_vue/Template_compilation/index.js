var compiler =require('vue-template-compiler');
var template=`<div>{{message}}<div>`
// var template=`<div>{{message}} <li v-for="(value,index) in stu" :class="index%2 == 0 ? 'a':'b'" >
// {{value.name}}</li>
// <li v-for="item in stu" >
// {{item.name}}</li><div>`


var res=compiler.compile(template);
console.log(res.render) 
//with(this){return _c('div',[_v(_s(message)),_c('div')])}
//_c=>creatElement
//_l=>renderList
//webpack在使用vue-loader时已将template编译为render

//vue源码中对应方法
// function installRenderHelpers (target) {
//     target._o = markOnce;s
//     target._n = toNumber;
//     target._s = toString;
//     target._l = renderList;
//     target._t = renderSlot;
//     target._q = looseEqual;
//     target._i = looseIndexOf;
//     target._m = renderStatic;
//     target._f = resolveFilter;
//     target._k = checkKeyCodes;
//     target._b = bindObjectProps;
//     target._v = createTextVNode;
//     target._e = createEmptyVNode;
//     target._u = resolveScopedSlots;
//     target._g = bindObjectListeners;
//     target._d = bindDynamicKeys;
//     target._p = prependModifier;
//   }