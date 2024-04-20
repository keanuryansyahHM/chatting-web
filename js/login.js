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

// BUTTON LOGIN ENABLE, IF INPUTS LOGIN NOT EMPTY VALUE

let buttonLogin = document.getElementById('login-btn')

let inputsLogin = document.querySelectorAll('.login-inp')

let checkField = true

for (let inputLogin of inputsLogin) {
    inputLogin.addEventListener('input', () => {

        checkField = false

        inputsLogin.forEach((inp) => {

            if (inp.value == '' || password.value.length <= 3) {


                checkField = true

            }

        })

        buttonLogin.disabled = checkField
    })
}

inputsLogin.forEach(inputLogin => {

    inputLogin.addEventListener('focus', () => {

        inputLogin.previousElementSibling.classList.add('active')

        inputLogin.addEventListener('blur', () => {

            if (inputLogin.value != '') {
                return
            }

            inputLogin.previousElementSibling.classList.remove('active')

        })
    })


})

let placeholders = document.querySelectorAll('.lc .label')

placeholders.forEach(placeholder => {

    placeholder.addEventListener('click', () => {
        placeholder.classList.add('active')

        placeholder.nextElementSibling.focus()

    })

})

// LOGIN FORM SUBMIT

let form = document.getElementById('login-form')

form.addEventListener('submit', event => {
    event.preventDefault()

    let thisPage = document.body.getAttribute('class')

    validateOnClient(thisPage)
})