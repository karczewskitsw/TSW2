/*jshint node: true */
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var less = require('less-middleware');

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(less({
        src: __dirname + '/public',
        compress: true
    }));
    app.use(express.static(path.join(__dirname, 'public')));
});

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Serwer nasłuchuje na porcie " + app.get('port'));
});

var io = require('socket.io');
var socket = io.listen(server);


socket.on('connection', function (client) {
    'use strict';
	var username;
	var data;
    client.on('message', function (msg) {
        if (!username) {
            username = msg;
			//client.emit('username','game started');
			var date= new Date();
			var lol=date.getTime();
			var memo=lol;
			client.emit('username', '<h2>' + username + '</h2>');
   	        client.broadcast.emit('username', username);
			while(memo<lol+3000){
			//delete date;
				date=new Date();
				memo=date.getTime();
				client.emit('time', (date.getTime()-lol)/100);
	           	client.broadcast.emit('time', (date.getTime()-lol)/100);
				}
//			client.emit('username', 'game over');
	        return;
        }
    });
	client.on('message', function (msg){
		    

	});
});
/*    socket.on('printTime', function(){
        if(isTakingAvailable){
            var timeForMove = 10;

            interval = setInterval(function() {

                if(timeForMove>0){
                    $('#clock').text(timeForMove);
                }
                else{
                    $("#clock").text("");
//                    socket.emit('changeTurn');
                    clearInterval(interval);
                }
                timeForMove--;

            }, 1000);

        }

    });*/
