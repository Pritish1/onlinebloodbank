//Make Connection through the front end
var socket=io.connect("http://localhost:1337/profile");
//the var io here can be used because of the socket.io library we have imported
//the socket variable used here is ccompletely different from the one used in the backend

//DOM
var message=document.getElementById('message');
var output=document.getElementById('output');
var username=document.getElementById('username');
var btn=document.getElementById('send');
var feedback=document.getElementById('feedback');

//Emit events
btn.addEventListener('click',function(){
	socket.emit('chat',{
		message:message.value,
		username:username.value
	});
});

message.addEventListener('keypress',function(){
	socket.emit('typing',{
		user:username.value
	});
});

//Listen for the events
socket.on('chat',function(data){
	feedback.innerHTML="";
	output.innerHTML+='<p><strong>'+data.username+' :</strong>'+data.message+'</p>';
});

socket.on('typing',function(data){
	feedback.innerHTML='<p><em>'+data.user+' is typing a message.....</em></p>';
});

