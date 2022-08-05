Function.prototype.mycall = function (context) {
    if (typeof this !== "function") {
        throw new TypeError('not function');
    }
    context = context || window;
    context.fn = this;
    let arg = [...arguments].slice(1);
    let result = context.fn(...arg)
    delete context.fn
    return result
}


// 防抖
function debounce(fn, delay = 1000, ...args) {
    let time;
    return () => {
        if (time)
            clearTimeout(time);
        time = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

var fn1 = function () {
    console.log(Array.from(arguments))
}
window.addEventListener('resize', debounce(fn1, 1000, 1, 2, 3))

// 节流
function throttle(fn, delay = 1000, ...args) {
    let time;
    return () => {
        if (time)
            return;
        //todo
        time = setTimeout(() => {
            fn(...args)
            time = null;
        }, delay)
    }
}

// 3. 手写NEW 
/**
 * new一个对象的过程
 * 以构造器的prototype属性为原型,创建新对象
 * 将this和参数传给构造器,执行
 * 返回这个对象,如果默认没返回,则返回第一步创建的对象
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
    if (parent.prototype) {
        let child = Object.create(parent.prototype);
        let result = parent.apply(child, args);
        return typeof result === "object" ? result : child;
    }
}


// 4. es5实现继承

function create(proto) {
    function F() { };
    F.prototype = proto;
    return new F();
}
// parent
function Parent(name) {
    this.name = name;
}
Parent.prototype.sayName = function () {
    console.log(this.name)
}

// child
function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = create(Parent.prototype);
Child.prototype.construtor = Child;


// test 
// const child = new Child('lily', 18)
// child.sayName()


// 5. 高阶函数 柯里化

// let test = curring(sum)
// test(1)(2)(3,4)
var curring = (fn) => {
    var exec = (sumargs = []) => {
        return sumargs.length >= fn.length ? fn(...sumargs) : (...args) => exec([...sumargs, ...args])
    }
    return exec()
}

function sum(a, b, c, d) {
    return a + b + c + d
}

var curr = function(fn) {
    var exec = function(sumarr = []) {
        if(sumarr.length >= fn.length) {
            return fn(...sumarr)
        } else {
            return (...args)=>exec([...sumarr, ...args])
        }
    }
    return exec()
}

// 异步并发数限制
/**
 * 关键点
 * 1. new promise 一经创建,立即执行
 * 2. 使用 Promise.resolve().then 可以把任务加到微任务队列,防止立即执行迭代方法
 * 3. 微任务处理过程中,产生的新的微任务,会在同一事件循环内,追加到微任务队列里
 * 4. 使用 race 在某个任务完成时,继续添加任务,保持任务按照最大并发数进行执行
 * 5. 任务完成后,需要从 doingTasks 中移出
 */
test
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i))
limit(2, [1000, 1000, 1000, 1000], timeout).then((res) => {
    console.log(res)
})

function limit(count, array, func) {
    const tasks = [];
    const doingTasks = [];
    let i = 0;
    const enqueue = () => {
        if (i == array.length) {
            return Promise.resolve();
        }
        const task = Promise.resolve().then(() => func(array[i++]), console.log(1));
        tasks.push(task);
        const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1), console.log(2));
        doingTasks.push(doing);
        const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve();
        return res.then(enqueue);
    };
    return enqueue().then(() => Promise.all(tasks), console.log(3))
}


// 斐波那契数列
/*
* 1 1 2 3 5 8 13 21 ...
*/
function fibo(num) {
    if (num <= 2)
        return 1
    return fibo(num - 2) + fibo(num - 1)
}

// 闭包实现
let fibo = function () {
    let arr = [0, 1]
    let fiFun = function (num) {
        if (arr[num] === undefined)
            arr[num] = fiFun(num - 2) + fiFun(num - 1)
        return arr[num]
    }
    return fiFun
}()

// 调用 fibo(6) => 8 
