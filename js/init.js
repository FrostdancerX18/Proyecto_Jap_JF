const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/"; //+ "101.json";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const $navbarUsuarioName = document.getElementById('navbar-usuario-name');
const $listaCarrito = document.getElementById('lista_carrito');
const $listaPerfil = document.getElementById('lista_perfil');
const $listaCerrarSesion = document.getElementById('lista_cerrarSesion');





/*  FUncion para realizar fetch y obtener el documento JSON */
async function getJSONData2(url){
  const respuesta = await fetch(url);
  if(respuesta.ok){
      const data = await respuesta.json();
      return data;
  }else{
      console.error("error")
  }
}

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}


let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

/*  Funcion para colocar nombre de usuario en el navbar ademas de E7-parte 1 */
document.addEventListener('DOMContentLoaded', () =>{
  const usuarioName = localStorage.getItem('nombreUsuario');
  if(localStorage.getItem('nombreUsuario') === ""){
    $navbarUsuarioName.innerHTML = "-Ingrese usuario-"
    $listaCarrito.classList.add('d-none')
    $listaPerfil.innerHTML = '<a class="dropdown-item" href="index.html">-Ingresar usuario- </a>'
    
  }
  else{
    $navbarUsuarioName.innerHTML = usuarioName;
  }
})
    
 /* Parte de Entrega 4 */
function cierraSesion(){
  localStorage.setItem('nombreUsuario','');
  document.getElementById('navbar-usuario-name').innerHTML = '';
}
