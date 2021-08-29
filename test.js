/*
 * @Author: your name
 * @Date: 2021-03-10 21:08:35
 * @LastEditTime: 2021-06-01 00:10:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \手写函数\test.js
 */
// 面试题

//1、写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,.......,a+nb的时间，然后写一个 myClear，停止上面的 mySetInterVal；

let mySetInterVal = function(fn, a, b) {
    let timer = null;
    let timeFn = function(fn,a,b) {
        timer = setTimeout(()=>{
            fn();
            timeFn(fn,a+b,b);
        },a);
    }
    timeFn(fn,a,b)
    return timer
};

// 调用
let test = mySetInterVal(()=>{console.log(999)}, 1000,2000);


// 停用
 clearTimeout(test)



 let mySet = function(fn, a, b) {
     let timer = null;
     let setTimer = function(fn,a, b) {
        timer=setTimeout(()=>{
            fn();
            setTimer(fn, a+b, b)
        },a)
     }
     setTimer(fn,a, b)
     return timer
 }


