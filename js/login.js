const email =document.getElementById('email-inpt')
const contrasena =document.getElementById('password-inpt')
const boton =document.getElementById('formulario-boton')
const pass_error =document.querySelector('.formulario-invalido-pass')
const email_error = document.querySelector('.formulario-invalido-email')
const pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; 

function validarEmail(mail){
    if(mail.value.match(pattern) ){
       return true
    }

}

boton.addEventListener('click', ()=>{
    

    if(email.value.length <= 0 && contrasena.value.length <= 0 ){
        email_error.style.display = "block";
        pass_error.style.display = "block";
    }
    if (contrasena.value.length <= 0 ){
        pass_error.style.display = "block";
        return false;
    }
    if (email.value.length <= 0 ){
        email_error.style.display = "block";
    }
    if(email.value.length >=1  && validarEmail(email) ===true && contrasena.value.length >=1){
        moveToHome()
        
    }
})

function moveToHome(){
    location.href= "home.html"
}

boton.addEventListener('click', () =>{
   localStorage.setItem('nombreUsuario', (email.value));
})


