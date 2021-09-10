const EventEmitter = require('events');

class MyEmmiterClass extends EventEmitter {
  constructor() {
    super();

    this.on('myEventMessage', (message) => console.log(message))
      .on('myEvent', (a, b) =>
        console.log(`An event occurred - Listener 1 - ${a}+${b}=${a + b}`)
      )
      .on('myEvent', (a, b) =>
        console.log(`An event occurred - Listener 2 - ${a}+${b}=${a + b}`)
      );
  }
}

const myEmitter = new MyEmmiterClass();

myEmitter.emit('myEvent', 3, 7);
myEmitter.emit('myEventMessage', 'Hello World!');
