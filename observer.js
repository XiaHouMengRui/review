class Subject {
  // 被观察者
  constructor() {
    this.arr = [];
    this.status = "";
  }
  attach(o) {
    this.arr.push(o);
  }
  setStatus(newStatus) {
    this.status = newStatus;
    this.arr.forEach(item=>{
      item&&item.update(newStatus);
    })
  }
}

class Observer {
  // 观察者
  constructor(name) {
    this.name = name;
  }
  update(value){
    console.log(this.name + ":" + value)
  }
}

let a = new Subject("child");

let b = new Observer("bb");

let m = new Observer("mm");

a.attach(b);
a.attach(m);

// test

// setInterval(()=>{
//   [1,2,3].forEach(item=>{
//     a.setStatus("test success"+item)
//   })
// },3000)