const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 4000;

const firebase = require('./firebase-config');

var credentials;


server.listen(4000, () => {
	console.log('Listening on port 4000');
});


io.on('connection', (socket) => {
	console.log('Successful connection');

	socket.on('set room', (roomcode) => {
		// Make sure room code is in correct format
		var rc = roomcode.toUpperCase();
		// Store it
		socket.roomcode = rc;
		console.log('Room code is %s', socket.roomcode);
	});

	socket.on('set username', (username) => {
		socket.username = username;
		console.log('Displayname  set to %s', socket.username);
	});

	socket.on('send move', (direction) => {
	});

	socket.on('initialize',
});

io.on('disconnect', (socket) => {
	console.log('Client disconnected');
});


const joinRoom = (authState, displayName, roomCode) => {firebase.database().ref('games').orderByChild('code').equalTo(roomCode).on("value", (snapshot) => {
	let id
	if(snapshot && snapshot.val()){
		snapshot.forEach(function(data) {
			id = data.key
		})

		firebase.database().ref('games/' + id + '/connected_players/' + authState.uid).set({name: displayName})
		return id
	}
})
};

const loginAnonymously =  () => firebase.auth().signInAnonymously()


//For waiting for variables to be set

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function initializeFn() {

	
	while(!(socket.username && socket.roomcode)){
		console.log('Not set yet.')
		await sleep(1000);
	}

	credentials = loginAnonymously();
	console.log(credentials);
	joinRoom(credentials, socket.username, socket.roomcode);
		

}