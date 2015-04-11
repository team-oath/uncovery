
module.exports = Reactive = ()=> {

  window.Reactive;

  Reactive.states = {};

  Reactive.on = function(event, callback) {
    if ( this.states[event] === undefined ){
      this.states[event] = [];
      this.states[event].push(callback);
    } else {
      this.states[event].push(callback);
    }
  }

  Reactive.trigger = function(event) {
    var extraArgs = [].slice.call(arguments, 1);
    if ( this.states[event] ) {
      this.states[event].forEach( function (callback) {
        callback.apply(this, extraArgs);
      });
    }
  }
  
};