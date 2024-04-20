const removePictureButton = document.querySelector('.profcont2-r button:first-child');


removePictureButton.addEventListener('click', () => {

    removePictureButton.disabled = true;

    let removeProfilePicture = {
        event: 'remove picture',
        status: false,
        data: '',
        body: body
    }

    sendMessage(removeProfilePicture);


    fileInput.value = '';


})

