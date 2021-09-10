import EventEmitter from 'events';

class MyEmmiterClass extends EventEmitter {
  constructor() {
    super();
    this.on('myEvent', (message) => {
      console.log(message);
    });
  }
}

const myEmitter = new MyEmmiterClass();

myEmitter.on('myEvent', (a, b) =>
  console.log(`An event occurred - Listener 1 - ${a}+${b}=${a + b}`)
);
myEmitter.on('myEvent', (a, b) =>
  console.log(`An event occurred - Listener 2 - ${a}+${b}=${a + b}`)
);

myEmitter.emit('myEvent', 3, 7);
