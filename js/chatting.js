const profileContentWr = document.getElementById('profile-ctn-wr');

const profileContent = document.getElementById('profile-ctn');

window.addEventListener('click', (event) => {


    if (event.target == profileContentWr) {

        profileContentWr.classList.remove('show');

        profileContent.classList.remove('show');

    }

})

// LIST ELEMENTS CAN CHANGE
const pictureUsers = document.querySelectorAll('.picture-user');
const usernameUsers = document.querySelectorAll('.username-user');
const usernameInput = document.querySelector('#profile-ctn-row3 input');

// LIST ELEMENTS CAN CHANGE END


// PROFILE SECTION SHOW
let profileBtn = document.getElementById('profile-user');

profileBtn.addEventListener('click', () => {


    profileContentWr.classList.add('show');


    profileContent.classList.add('show');



})

// PROFILE SECTION SHOW END

// CONTACT SELECTED

const contacts = document.querySelectorAll('.contact');

let idTarget;

contacts.forEach(contact => {
    contact.addEventListener('click', () => {

        if (contact.classList.contains('selected')) {
            return;
        }

        for (let contact of contacts) {
            contact.classList.remove('selected');
        }


        contact.classList.add('selected');


        // CHATTING BOX SHOW
        let chattingElement = document.querySelectorAll('.chatting-root-right-child');

        chattingElement[0].classList.remove('show');
        chattingElement[1].classList.add('show');

        // GET ID TARGET USER
        idTarget = contact.getAttribute('id');

        // GET PROFILE PICTURE TARGET
        let pictureTarget = contact.querySelector('.contact-left img').getAttribute('src');

        // GET USERNAME TARGET
        let usernameTarget = contact.querySelector('.contact-right span:first-child').innerHTML;

        // CHANGE PROFILE PICTURE ON CHATTING TOP
        let pictureOnChatting = document.querySelector('.chatting-top-left img');
        pictureOnChatting.setAttribute('id', idTarget);
        pictureOnChatting.src = pictureTarget;

        // CHANGE USERNAME ON CHATTING TOP
        let usernameOnChatting = document.querySelector('.chatting-top-right span:first-child');
        usernameOnChatting.setAttribute('id', idTarget);
        usernameOnChatting.innerHTML = usernameTarget;

        // SET ID IN STATUS USER ON CHATTING TOP
        let statusUser = document.querySelector('.status');
        statusUser.setAttribute('id', idTarget);

        // OPEN CHAT
        sendMessage({
            event: 'open chat',
            status: false,
            data: '',
            sender: body,
            receiver: idTarget,
            body: body
        });


    })
})

// CONTACT SELECTED END

// INPUT MESSAGE
let textarea = document.getElementById('message-input');
let chattingBoxBottom = document.querySelector('.chatting-bottom');
let chattingBoxMiddle = document.querySelector('.chatting-middle');
let currentScroll = 16;

textarea.addEventListener('input', () => {

    if (textarea.scrollHeight > currentScroll) {

        if (textarea.scrollHeight > 96) {
            textarea.style.overflow = 'auto';

            return;
        }

        chattingBoxBottom.style.height = `${chattingBoxBottom.clientHeight + 16}px`;

        chattingBoxMiddle.style.height = `${chattingBoxMiddle.clientHeight - 16}px`;


    }

    textarea.style.height = '0';

    textarea.style.height = `${textarea.scrollHeight}px`;

    if (textarea.scrollHeight < currentScroll) {

        chattingBoxBottom.style.height = `${chattingBoxBottom.clientHeight - 16}px`;

        chattingBoxMiddle.style.height = `${chattingBoxMiddle.clientHeight + 16}px`;

        if (textarea.scrollHeight == 16) {

            chattingBoxMiddle.style.height = '430.4px';

            chattingBoxBottom.style.height = '66px';
        }
    }

    currentScroll = textarea.scrollHeight;

});

// INPUT MESSAGE END

// USER SEND MESSAGE TO TARGET CONTACT

let sendMessageButton = document.getElementById('send-message-button');

sendMessageButton.addEventListener('click', () => {

    let message = textarea.value;

    let msg = {
        event: 'send message',
        status: false,
        data: message,
        sender: body,
        receiver: idTarget,
        body: body
    }

    sendMessage(msg);

    textarea.value = '';

})
