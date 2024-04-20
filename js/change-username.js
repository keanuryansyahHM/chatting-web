let usernameButton = document.querySelector('#profile-ctn-row3 button');

let newUsername;

usernameInput.addEventListener('input', () => {

    if (usernameInput.value.length < 4) {
        usernameButton.disabled = true;
        return;
    }

    newUsername = usernameInput.value;

    usernameButton.disabled = false;
})

usernameButton.addEventListener('click', () => {

    let data = {
        event: 'change username',
        status: false,
        data: newUsername,
        body: body
    };

    sendMessage(data);


})