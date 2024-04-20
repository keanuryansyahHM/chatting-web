// REGEX NO SPACE INPUT VALUE

let noSpace = input => {
    let regex = /\s/

    return regex.test(input)
}

// VALIDATE ON CLIENT SIDE

let validateOnClient = (page) => {

    switch (page) {
        case "user-signup":
            let scLabels = document.querySelectorAll('.sc .label')

            let userInputs = document.querySelectorAll('.sc input')

            let dataSignup = {

                gmail: form.elements.gmail.value,
                username: form.elements.username.value,
                password: form.elements.password.value,
                conpassword: form.elements.conpassword.value,
                page: page

            }

            if (!dataSignup.gmail.includes('@')) {
                alert('Masukin gmail yang valid cuk!')

                userInputs[0].value = ''
                userInputs[0].focus()

            } else if (noSpace(dataSignup.username)) {
                alert('Username tidak boleh mengandung spasi cuk!')

                userInputs[1].value = ''
                userInputs[1].focus()

            } else if (dataSignup.password.length < 8) {

                alert('Password minimal mengandung 8 karakter!')

                userInputs[2].value = ''
                userInputs[3].value = ''
                userInputs[2].focus()


            } else if (dataSignup.password !== dataSignup.conpassword) {
                alert('Password lu ga sama coyyy.')

                userInputs[2].value = ''
                userInputs[3].value = ''
                userInputs[2].focus()

            } else {

                // VALIDATE ON SERVER SIDE

                // FETCH METHOD
                let methods = {
                    method: 'post',
                    body: JSON.stringify(dataSignup)
                }

                fetch('validasi.php', methods)
                    .then(response => response.text())
                    .then(responseData => {


                        switch (responseData) {
                            case 'username available':
                                alert('Username udah dipake coy!')

                                userInputs[1].value = ''
                                userInputs[1].focus()

                                break;
                            case 'gmail available':
                                alert('gmail udah dipake coy!')

                                userInputs[0].value = ''
                                userInputs[0].focus()

                                break;
                            default:
                                alert('selamat akun anda berhasil dibuat!')

                                userInputs.forEach(userInput => {
                                    userInput.value = ''
                                })

                                scLabels.forEach(scLabel => {
                                    scLabel.classList.remove('active')
                                })

                                userInputs[0].focus()

                        }




                    })

            }

            let signupBtn = document.getElementById('signup-btn')

            signupBtn.disabled = true


            break;

        case 'user-login':

            // THIS IS USER LOGIN PAGE

            let dataLogin = {

                user: form.elements.username.value,
                password: form.elements.password.value,
                page: page

            }

            let send = {
                method: 'post',
                body: JSON.stringify(dataLogin)
            }

            fetch('validasi.php', send)
                .then(response => response.text())
                .then(responseData => {

                    console.log(responseData);

                    switch (responseData) {
                        case 'success':
                            setTimeout(() => {
                                window.location.href = 'index.php'
                            }, 1800)
                            break
                        default:
                            alert('Username / Password Incorrect.')
                            form.elements.password.value = ''
                    }

                })
            form.elements.loginBtn.disabled = true;

            break;

    }



}





