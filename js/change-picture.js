let changePictureButton = document.querySelector('.profcont2-r button:last-child');

let fileInput = document.getElementById('file-input');

changePictureButton.addEventListener('click', () => {

    fileInput.click();

})

// SELECT NEW PROFILE PICTURE
fileInput.addEventListener('change', () => {
    let files = fileInput.files;
    let file = files[0];

    const formData = new FormData();

    formData.append('file', file);

    fetch('upload.php', {
        method: 'post',
        body: formData
    })
        .then(response => response.text())
        .then(res => {

            switch (res) {

                case 'file tidak diizinkan':
                    alert('File tidak izinkan!');

                    break;
                case 'file terlalu besar':
                    alert('Ukuran gambar maksimal 2mb.');

                    break;

                default:

                    let changeProfilePicture = {
                        event: 'change picture',
                        status: false,
                        data: '',
                        body: body
                    };

                    sendMessage(changeProfilePicture);

                    removePictureButton.disabled = false;

            }

        })




})

