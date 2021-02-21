// 发布订阅
// 发布订阅 发布和订阅中间有第三方，数组 ， 发布和订阅之间没有任何关联

class EventEmitter {
  constructor() {
    this.arr = [];
  }
  on(fn) {
    this.arr.push(fn);
  }
  emit() {
    this.arr.forEach(fn =>fn())
  }
}

let person = {};

let events = new EventEmitter();

events.on(()=>{ 
    if (Object.keys(person).length == 2){
      console.log(person)
    } else {
      console.log("success!")
    }
})

let p = new Promise((resolve, reject)=>{
  // resolve("成功一次！")
});

p.then(data=>{
  setTimeout(() => {
    person.name = "lily";
    events.emit();
  }, 1000);
}).then(res=>{
  setTimeout(() => {
    person.age = 18;
    events.emit();
  }, 2000);
})