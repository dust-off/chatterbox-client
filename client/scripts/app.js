// YOUR CODE HERE:
var app = {};

app.init = function () {
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
    // This is the url you should use to communicate with the parse API server.
    // url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message got');
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
  // console.log(message);
  // var msg = JSON.stringify(message.text);
  // var html = '<div class="chat">${msg}</div>';
  $('#chats').prepend('<div>message</div>');
  // $( "#chats" ).append( "<p>Test</p>" );
};

// http://parse.sfs.hackreactor.com/chatterbox/classes/messages













//