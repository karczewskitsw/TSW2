/*jshint node: true, browser: true, jquery: true */
/*global io: false */
$(document).ready(function () {
    'use strict';
    var socket = io.connect('http://localhost:3000'),
        entry_el = $('#entry');

    socket.on('connect', function () {
        console.log('Połączony!');
    });

    socket.on('time', function (msg, msg2) {
		var x=document.getElementById("player");
//		var x=$('#player ul').append('<li>' + msg +'</li>');
//		var y=document.getElementById("log");
		while(x.childNodes.length>=1){
		x.removeChild(x.firstChild);	
	//	y.removeChild(y.firstChild);	
		
		}
		x.appendChild(x.ownerDocument.createTextNode(msg, msg2));
//		y.appendChild(y.ownerDocument.createTextNode(msg, msg2));
		
	});
    socket.on('username', function (msg) {
		var y=$('#log ul').append('<li>' + msg +'</li>');
		while(y.childNodes.length>=1){
		y.removeChild(y.firstChild);	
		}
		y.appendChild(y.ownerDocument.createTextNode(msg));
		
	});
/*	socket.on('username', function (msg, msg2){
	    $('#log ul').append('<li>' + msg + msg2+'</li>');
		entry_el.focus();
		var x=document.getElementById("log");
	    while(x.childNodes.length>=1){
			x.removeChild(x.firstChild);	
		}

	});
*/
    entry_el.keypress(function (event) {
        if (event.keyCode !== 13) {
            return;
        }
        var msg = entry_el.attr('value');
        if (msg) {
            socket.send(msg);
            entry_el.attr('value', '');
        }
    });
});
	function myFunction(){
		if(wynik=29){
			document.getElementById("wynik").innerHTML="6";
		}
	}