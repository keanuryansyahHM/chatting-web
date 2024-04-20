// THIS IS ME
const body = document.body.getAttribute('id');

// const date = new Date();

// console.log(`Year: ${date.getFullYear()} Month: ${date.getMonth()} Day: ${date.getDay()} Hour: ${date.getHours()} Minutes: ${date.getMinutes()} Seconds: ${date.getSeconds()}`)


// THIS IS ME END

// CREATE LIST CHAT

let createListChat = (listChats) => {

    let result = [];

    listChats.forEach(listChat => {

        if (listChat.sender_message == body) {

            let div = document.createElement('div');
            div.classList.add('sender');

            let p = document.createElement('p');
            p.innerText = listChat.message;

            div.append(p);

            result.push(div);


        } else {
            let div = document.createElement('div');
            div.classList.add('receiver');

            let p = document.createElement('p');
            p.innerText = listChat.message;

            div.append(p);;

            result.push(div)


        }

    })

    return result;

}

// CREATE LIST CHAT END


/*

--------------- INI ADALAH KONFIGURASI UNTUK WEBSOCKET SISI CLIENT -------------------- 

*/

/*
    EVENT
    DATA
    STATUS
    BODY
*/

// WEBSOCKET CLIENT

const socket = io('http://localhost:3000');

// CLIENT SEND MESSAGE TO WEBSOCKET SERVER
const sendMessage = message => {

    socket.emit('message', message);

}

// CLIENT SEND MESSAGE TO WEBSOCKET SERVER

// CLIENT CONNECTED TO WEB SOCKET SERVER
socket.on('connect', () => {

    sendMessage({
        body: body,
        status: false,
        event: 'user online',
        data: ''
    });

})

// CLIENT CONNECTED TO WEB SOCKET SERVER END

// ROOM CHAT ID
let idRC;

// CLIENT RECEIVE MESSAGE FROM SERVER
socket.on('message', data => {

    let event = data.event;

    console.log(data);

    switch (event) {

        // User online
        case 'user online':

            let onlineUsers = document.querySelectorAll('.status');

            if (data.status) {

                onlineUsers.forEach(onlineUser => {

                    if (onlineUser.getAttribute('id') == data.body) {
                        onlineUser.innerHTML = 'Online';
                    }

                })

            }

            break;

        // REMOVE PICTURE
        case 'remove picture':
            if (data.status) {

                // REMOVE PICTURE ON DIRECTORY
                fetch('remove-picture.php', {
                    method: 'post',
                    body: data.data
                })
                    .then(response => response.text())
                    .then(res => {
                        if (res) {
                            let allPicture = document.querySelectorAll('.picture-user');

                            allPicture.forEach(picture => {

                                if (picture.getAttribute('id') == data.body) {
                                    picture.src = 'images/no-picture.png';
                                }

                            })
                        }
                    })


            }
            break;

        case 'change picture':
            // GANTI POTO PROFILE
            let allPicture = document.querySelectorAll('.picture-user');

            allPicture.forEach(picture => {

                if (picture.getAttribute('id') == data.body) {

                    picture.src = data.data;

                }

            })

            break;

        case 'change username':
            // GANTI USERNAME
            if (data.status) {
                let usernames = document.querySelectorAll('.username-user');

                usernames.forEach(username => {
                    if (username.getAttribute('id') == data.body) {

                        username.innerHTML = data.data;

                    }
                })

                let usernameButton = document.querySelector('#profile-ctn-row3 button');

                usernameButton.disabled = true;

            } else {
                if (body == data.body) {

                    alert('Username sudah terpakai.');

                }
            }

            break;

        case 'open chat':

            let statusUser = document.querySelector('.status');
            let listChattingWrap = document.querySelector('.list-chatting');


            if (data.body == body) {

                // Change status user on chatting box top

                statusUser.innerHTML = data.data.statusTarget;

                // Jika ada list message
                if (data.data.listMessage != '') {

                    listChattingWrap.innerHTML = '';

                    let listMessages = createListChat(data.data.listMessage);

                    listMessages.forEach(listMessage => {

                        listChattingWrap.appendChild(listMessage);

                    })



                } else {
                    listChattingWrap.innerHTML = '';
                }


            }


            break;

        case 'send message':

            let listChattingWr = document.querySelector('.list-chatting');

            if (data.status) {

                if (body == data.sender) {

                    let div = document.createElement('div')

                    div.classList.add('sender');

                    let p = document.createElement('p');

                    p.innerText = data.data;

                    div.appendChild(p);

                    listChattingWr.appendChild(div);

                } else if (body == data.receiver) {
                    let div = document.createElement('div');

                    div.classList.add('receiver');

                    let p = document.createElement('p');

                    p.innerText = data.data;

                    div.appendChild(p);

                    listChattingWr.appendChild(div);



                }


            }



            break;


        default:
            // USER LOGOUT
            if (data.status) {

                let userStatus = document.querySelectorAll('.status');

                userStatus.forEach(userOffline => {

                    if (userOffline.getAttribute('id') == data.body) {
                        userOffline.innerHTML = data.data;
                    }

                })


            }
    }

})

// WebSocket config end

// LOGOUT BUTTON CLICK
let logoutButton = document.querySelector('#profile-ctn-row5 a');

logoutButton.addEventListener('click', (e) => {

    let session = JSON.parse(localStorage.getItem('session'));

    session.logout = true;

    sendMessage(session);

    setTimeout(() => {

        window.location.href = `logout.php?id-user=${body}&page=user`;
        localStorage.removeItem('session');

    }, 1000)


})

const profileContentButtons = document.querySelectorAll('#profile-ctn button');


// PROFILE CONFIG