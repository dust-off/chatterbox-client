// YOUR CODE HERE:
var app = {};

app.init = function () {
  // $('.username').on('click', function() {
  //   app.handleUsernameClick();
  // });
  $('#send').on('click', app.handleSubmit);
  app.fetch();
  
  $('#roomSelect').change(app.changeRoom);
  
  
  
  // $('#send').on('submit', function() {
  //   console.log('this is working')
  // });
  
};

app.send = function (message) {
  // message.text = JSON.stringify(message.text);
  // console.log(JSON.stringify(message));
  console.log(message);
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};


// app.send = function(message) {
//   $.ajax({
//     url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function (data) {
//     },
//     error: function (data) {
//     }
//   });
// };

app.fetch = function (obj) {
  //'where' : {'roomname': 'GoT'}
  if (!obj) {
    var obj = {'order': '-createdAt'};
  }
  var arrayOfRooms = [];

  $.ajax({
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    data: obj,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log(data); //JSON.stringify(data.results[0]));
      data.results.forEach(function(message) {
        app.renderMessage(message);
        var room = message.roomname;
        if (arrayOfRooms.indexOf(room) === -1 && room !== undefined) {
          arrayOfRooms.push(room);
          app.renderRoom(room);
        }
      });
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error(data);
    }
  });
};

app.clearMessages = function () {
  $('#chats').empty();
};

app.renderMessage = function (message) {
  var username = `<p class="username">${message.username}</p>`;
  var msg = `<p>${escape(JSON.stringify(message.text))}</p>`;
  var html = `<div class="chat">${username}${msg}</div>`;
  $('#chats').append(html);
};

app.renderRoom = function (roomName) {
  var html = `<option>${roomName}</option>`;
  $('#roomSelect').append(html);
};

app.changeRoom = function () {
  var roomSelect = $('#roomSelect').val();
  var obj = {'order': '-createdAt', 'where': {'roomname': `${roomSelect}`}};
  app.clearMessages();
  app.fetch(obj);
};

app.handleUsernameClick = function (name) {
  //do something with name
};

app.handleSubmit = function () {
  var msgObj = {};
  msgObj.username = window.location.search.slice(10);
  msgObj.text = $('#input').val();
  msgObj.roomname = $('#roomSelect').val();
  // console.log(msgObj);
  app.send(msgObj);
};

app.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';

$(document).ready(app.init);

// http://parse.sfs.hackreactor.com/chatterbox/classes/messages













//