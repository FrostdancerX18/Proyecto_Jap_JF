
const $perfilGuardarDatos =document.getElementById('perfil_datos_guardarDatos');
const $perfilImagen = document.getElementById('perfil_imagen');


const $form_input_primer_nombre = document.getElementById('form_input_primer_nombre');
const $form_input_segundo_nombre = document.getElementById('form_input_segundo_nombre');
const $form_input_primer_apellido = document.getElementById('form_input_primer_apellido');
const $form_input_segundo_apellido = document.getElementById('form_input_segundo_apellido');
const $formInputEmail = document.getElementById('form_input_email');
const $formInputImagen = document.getElementById('form_input_img');
const $form_input_telefono = document.getElementById('form_input_telefono');



(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  
/* Funcion que carga valores de inputs guardados en localstorage en caso de que existan */
  document.addEventListener('DOMContentLoaded',()=>{
    $formInputEmail.value = localStorage.getItem('nombreUsuario')
      if(localStorage.getItem('Usuario_perfil') != null){
        let arrayUserPerfil = JSON.parse(localStorage.getItem('Usuario_perfil'));
        $form_input_primer_nombre.value = arrayUserPerfil.Nombre
        $form_input_segundo_nombre .value =arrayUserPerfil.SegundoNombre
        $form_input_primer_apellido.value = arrayUserPerfil.Apellido
        $form_input_segundo_apellido.value = arrayUserPerfil.SegundoApellido
        $form_input_telefono.value = arrayUserPerfil.Telefono 
        
      }
      imagenPerfil()
  })
  
/* DESAFIATE E7 - Funcion para cargar imagen de perfil */
function imagenPerfil(){
  if(localStorage.getItem('Perfil_Imagen') != null){
  const url = localStorage.getItem('Perfil_Imagen');

  const img = new Image();
  img.src = url;
  $perfilImagen.src = url
}
}

/* Funcion para guardar los datos en localStorage */
$perfilGuardarDatos.addEventListener('click',()=>{
  imagenPerfil()
  const userDataPerfil = {
                          Id:`${localStorage.getItem('Usuario_ID')}`,
                          Nombre:`${$form_input_primer_nombre.value}`,
                          SegundoNombre:`${$form_input_segundo_nombre.value}`,
                          Apellido:`${$form_input_primer_apellido.value}`,
                          SegundoApellido:`${$form_input_segundo_apellido.value}`,
                          Email:`${$formInputEmail.value}`,
                          Telefono:`${$form_input_telefono.value}`,
                          Imagen:`${localStorage.getItem('Perfil_Imagen')}`
                        }

  if($form_input_primer_nombre.value != '' && $form_input_primer_apellido.value !='' && $formInputEmail !=''){
    localStorage.setItem('Usuario_perfil',JSON.stringify(userDataPerfil));
  }else{
      document.querySelector('.form').classList.add("was-validated");
  }
  if($formInputImagen.value != ''){
  const fr = new FileReader();
  
  fr.readAsDataURL($formInputImagen.files[0]);
  fr.addEventListener('load',()=>{
    const imgUrl = fr.result;
    
   localStorage.setItem('Perfil_Imagen',imgUrl)

  })
}

  
})
