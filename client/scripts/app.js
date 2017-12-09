// YOUR CODE HERE:
var app = {};

app.init = function () {
  //scan the body for each post
  //assign a listener to each found
  $('.username').on('click', function() {
    app.handleUsernameClick();
  });
  // $('#send').on('submit', function() {
  app.handleSubmit();
  // });
};

app.send = function (message) {
  message.text = JSON.stringify(message.text);
  // console.log(JSON.stringify(message));
  // console.log(message);
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
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

app.fetch = function () {
  $.ajax({
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message got', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message', data);
    }
  });
};

app.clearMessages = function () {
  $('#chats').empty();
};

app.renderMessage = function (message) {
  var username = `<p class="username">${message.username}</p>`;
  var msg = `<p>${JSON.stringify(message.text)}</p>`;
  var html = `<div class="chat">${username}${msg}</div>`;
  $('#chats').prepend(html);
};

app.renderRoom = function (roomName) {
  var html = `<option>${roomName}</option>`;
  $('#roomSelect').append(html);
};

app.handleUsernameClick = function (name) {
  //do something with name
};

app.handleSubmit = function () {
  $('#send').on('submit', function() {
    // app.handleSubmit();
  });
};

app.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';


// http://parse.sfs.hackreactor.com/chatterbox/classes/messages













//