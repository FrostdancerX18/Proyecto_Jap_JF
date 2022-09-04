const email =document.getElementById('email-inpt')
const contrasena =document.getElementById('password-inpt')
const boton =document.getElementById('formulario-boton')
const pass_error =document.querySelector('.formulario-invalido-pass')
const email_error = document.querySelector('.formulario-invalido-email')




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
    if(email.value.length >=1 && contrasena.value.length >=1){
        moveToHome()
        
    }
})

function moveToHome(){
    location.href= "home.html"
}


boton.addEventListener('click',async() =>{
    await localStorage.setItem('nombreUsuario', (email.value));
    
})



