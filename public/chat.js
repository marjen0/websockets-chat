const socket = io.connect('http://localhost:3000');

const message = document.getElementById('message'),
      name = document.getElementById('name'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

btn.addEventListener('click', (e) =>{
    socket.emit('chat', {
        message: message.value,
        name: name.value
    });
    message.value = "";
});
message.addEventListener('keypress', () => {
    socket.emit('typing', name.value);
});

socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.name + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});