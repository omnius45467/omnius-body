var alexa = require('alexa-app');
var app = new alexa.app();
var Cylon = require("cylon");

/**
 * LaunchRequest.
 */
app.launch(function(request,response) {
	response.say('Hey there fancy pants!');
	response.card("Hey there fancy pants!","This is an example card");
});


/**
 * IntentRequest.
 */
app.intent('DirectionIntent',
  {
    'slots':{'direction':'LIST_OF_DIRECTIONS'},
    'utterances':[ 'go {direction} using LITERAL' ]
  },
  function(request,response) {
    var direction = request.slot('direction');
	  if(direction != undefined){
		  response.say('going '+direction);
		  response.shouldEndSession(true);
		  response.send();
	  }

	  Cylon.robot({
		  connections: {
			  arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' }
		  },

		  devices: {
			  led: { driver: 'led', pin: 13 }
		  },

		  work: function(my) {
			  every((1).second(), my.led.toggle);
		  }
	  }).start();

  }
);



/**
 * Error handler for any thrown errors.
 */
app.error = function(exception, request, response) {
    response.say('Sorry, something bad happened');
};

// Connect to lambda
exports.handler = app.lambda();
