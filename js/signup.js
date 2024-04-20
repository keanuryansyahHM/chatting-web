// ----------------- ISI DARI FILE INI ADALAH SCRIPT SIGN UP PAGE. ------------------------------------

// SEE PASSWORD

let seePassBtn = document.querySelector('.see-password')

let password = document.querySelector('input#password');

seePassBtn.addEventListener('click', () => {

    if (seePassBtn.innerHTML == 'Hide') {

        seePassBtn.innerHTML = 'See'
        password.removeAttribute('type')
        password.setAttribute('type', 'password')

        return

    }

    seePassBtn.innerHTML = 'Hide'

    password.removeAttribute('type')
    password.setAttribute('type', 'text')

})

// BUTTON ENABLED, IF ALL INPUTS VALUES NOT EMPTY.

let signupInputs = document.querySelectorAll('.sc input')

let signupBtn = document.getElementById('signup-btn')

let checkInput = true

signupInputs.forEach(signupInput => {

    signupInput.addEventListener('input', () => {
        checkInput = false

        signupInputs.forEach(signupInp => {

            if (signupInp.value === '') {
                checkInput = true
            }

        })

        signupBtn.disabled = checkInput


    })


})

// IF INPUT FOCUS

signupInputs.forEach(signupInput => {

    signupInput.addEventListener('focus', () => {

        signupInput.previousElementSibling.classList.add('active')

        signupInput.addEventListener('blur', () => {
            if (signupInput.value != '') {
                return
            }

            signupInput.previousElementSibling.classList.remove('active')

        })


    })

})

// IF LABEL ON CLICK

let scLabels = document.querySelectorAll('.sc .label')

scLabels.forEach(scLabel => {

    scLabel.addEventListener('click', () => {
        scLabel.classList.add('active')
        scLabel.nextElementSibling.focus()
    })

})

// BUTTON SIGN UP ON CLICK

let form = document.getElementById('signup-form')

form.addEventListener('submit', event => {

    event.preventDefault()

    let thisPage = document.body.getAttribute('class')

    validateOnClient(thisPage)



})