/*
 * @Author: your name
 * @Date: 2021-12-08 23:33:22
 * @LastEditTime: 2021-12-08 23:52:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo2c:\Users\夏侯梦瑞的PC\Desktop\EventEmitter.js
 */
/*
 * @Author: your name
 * @Date: 2021-12-08 23:33:22
 * @LastEditTime: 2021-12-08 23:33:22
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo2c:\Users\夏侯梦瑞的PC\Desktop\EventEmitter.js
 */
class EventEmitter {
    constructor() {
        this._events = {};
    }
    on(event,callback) {
        //监听 event 事件,触发时调用 callback 函数
        let callbacks = this._events[event] || [];
        callbacks.push(callback);
        this._events[event] = callbacks;
        return this;
    }
    off(event,callback) {
        //停止监听 event 事件
        let callbacks = this._events[event];
        this._events[event] = callbacks && callbacks.filter(fn => fn !== callback);
        return this;
    }
    emit(event, ...args) {
        //触发事件,并把参数传给事件的处理函数
        const callbacks = this._events[event];
        callbacks.forEach(fn => fn.apply(null,args));
        return this;
    }
}

//实例化
const eve = new EventEmitter();

//定义事件
function myEvent1(data) {
    console.log('事件1触发了');
    console.log(data);
}
//监听
 eve.on('myEve1',myEvent1);

//触发
eve.emit('myEve1',['哈哈','嘻嘻']);

//移除
eve.off('myEve1',myEvent1);
