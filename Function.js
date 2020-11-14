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