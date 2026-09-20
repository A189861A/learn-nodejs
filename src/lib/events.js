const EventEmitter = require('node:events');

class NoteEvents extends EventEmitter {
  publish(event, note) {
    this.emit(event, note);
  }
}

module.exports = new NoteEvents();
