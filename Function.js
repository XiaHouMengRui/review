Function.prototype.mycall = function(context){
  if (typeof this !== "function") {
    throw new TypeError('not function');
  }
  context = context || window;
  context.fn = this;
  let arg = [...arguments].slice(1);
  delete context[fn]
  return arg
}


// 防抖
function debounce(fn, delay = 1000,...args) {
	let time;
	return ()=> {
		if (time) 
			clearTimeout(time);
		time = setTimeout(()=>{
			fn(...args)
		},delay)
	}
}

var fn1 = function() {
	console.log(Array.from(arguments))
}
window.addEventListener('resize', debounce(fn1, 1000,1,2,3))

// 节流
function throttle(fn, delay=1000, ...args) {
	let time;
	return ()=> {
		if (time)
			return;
			//todo
		time = setTimeout(()=>{
			fn(...args)
			time = null;
		},delay)
	}
}

// 3. 手写NEW
/**
 * new一个对象的过程
 * 以构造器的prototype属性为原型，创建新对象
 * 将this和参数传给构造器，执行
 * 返回这个对象，如果默认没返回，则返回第一步创建的对象
 * 例子
 * 
 * // 构造器函数
		let Parent = function (name, age) {
				this.name = name;
				this.age = age;
		};
		Parent.prototype.sayName = function () {
			console.log(this.name);   
        };
    使用 let child = myNew(parent, "lily", 18)
 */ 
function myNew(parent, ...args) {
	if(parent.prototype) {
		let child = Object.create(parent.prototype);
		let result = parent.apply(child, args);
		return typeof result === "object" ? result : child;
	}
}


// 4. es5实现继承

function create(proto) {
    function F(){};
    F.prototype = proto;
    return new F();
}



// 5. 高阶函数 柯里化

// let test = curring(sum)
// test(1)(2)(3,4)
var  curring = (fn) =>{
	var exec = (sumargs=[]) => {
		return sumargs.length >= fn.length ? fn(...sumargs) : (...args)=>exec([...sumargs, ...args])
	}
	return exec()
}

function sum(a,b,c,d) {
	return a+b+c+d
}

