const tablaCompras = document.getElementById('tabla_items');
const btnVaciarCarrito = document.getElementById('boton_vaciarCarrito');
const btnFinalizarCompra = document.getElementById('boton_finalizar_compra');
const btnCerrarModal = document.getElementById('btn_cerrar_modal');

let arrayCarrito = [];
let inputCalle = document.getElementById('FormControlInput_calle');
let inputNumero =  document.getElementById('FormControlInput_numero');
let inputEsquina =  document.getElementById('FormControlInput_esquina');
let formaPagoTarjetaCheck = document.getElementById('tarjCredit_check_radio');
let formaPagoBancoCheck = document.getElementById('tansfBanc_check_radio');



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

  
/* Funcion para agregar item desde carrito */
function addItemCarritoProd (array,tablaInner){
    if(array.length >0){
    array.forEach(element => {
        if(element.currency === "USD"){
        tablaInner.innerHTML +=`<tr class="item_carrito" data-id="${element.id}"> 
        <th scope="row col-2"><img src="${element.image}" alt="Imagen" class="w-25"></th>
        <td class="col-2">${element.name}</td>
        <td class="col-2">${element.currency}<span class="precioUnd">${element.unitCost}</span></td>
        <td class="col-2"><input type="number"  value="${element.count}" min="1" class="cantidad_elemento col-2" ></td>
        <td class="fw-bold col-2 subtotal_main"><span class="subtotal_currency">${element.currency}</span><span class="subtotal">${element.unitCost*element.count}</span></td>
        </tr>`
        }
        if(element.currency != "USD"){
            tablaInner.innerHTML +=`<tr class="item_carrito" data-id="${element.id}"> 
            <th scope="row col-2"><img src="${element.image}" alt="Imagen" class="w-25"></th>
            <td class="col-2">${element.name}</td>
            <td class="col-2">USD <span class="precioUnd">${Math.round(element.unitCost / 42)}</span></td>
            <td class="col-2"><input type="number" value="${element.count}" min="1" class="cantidad_elemento col-2" "></td>
            <td class="fw-bold col-2 subtotal_main"><span class="subtotal_currency">USD</span><span class="subtotal">${Math.round(element.unitCost / 42)*element.count}</span></td>
            </tr>`  
        }
    });
}
}

/* Funcion para agregar item del JSON  */
function addItemCarrito (array,tablaInner){
    array.forEach(element => {
        
        tablaInner.innerHTML +=`<tr class="item_carrito" data-id="${element.id}"> 
        <th scope="row col-2"><img src="${element.image}" alt="Imagen" class="w-25"></th>
        <td class="col-2">${element.name}</td>
        <td class="col-2">${element.currency} <span class="precioUnd">${element.unitCost}</span></td>
        <td class="col-2"><input type="number" value="${element.count}" min="1" class="cantidad_elemento col-2" "></td>
        <td class="fw-bold col-2 subtotal_main"><span class="subtotal_currency">${element.currency}</span><span class="subtotal">${element.unitCost*element.count}</span></td>
        </tr>`
    });
}

/* E6-part_1 Funcion para obtener el subtotal final,busco todos los elementos con clase subtototal para luego obtener los valores numericos 
        con for sobre lastSubtotal, agrego los valores a un nuevo array para luego hacer la suma,son strings, asi que los paso a numero con parseInt  */
function sumarSubTotales(){
        
    let subtotalCurrency = document.querySelectorAll('.subtotal')
    let lastSubtotal = [].slice.call(subtotalCurrency)
    let newLastSubtotal =[];
    for (let e = 0; e < lastSubtotal.length; e++) {
        newLastSubtotal.push (parseInt(lastSubtotal[e].innerHTML))
    }
    let finishNewSubtotal = newLastSubtotal.reduce((acu, ele)=> acu + ele, 0) /* Con reduce hago la suma de todos los elementos dentro del array con los subtotales */
    document.getElementById('cart_subtotal').innerHTML = finishNewSubtotal;
}

/* E6-part_1  Funcion para calcular envio */ 
function costoDeEnvio(){
    let envioPremium = document.getElementById('selector_envio_premium');
    let envioExpress = document.getElementById('selector_envio_express');
    let envioStandar = document.getElementById('selector_envio_standar');
    let subTotalParaEnvio = parseInt(document.getElementById('cart_subtotal').innerHTML);
    let costoDeEnvio = 0;
    if(envioStandar.checked){
        costoDeEnvio = 0.05
    }
    if(envioExpress.checked){
        costoDeEnvio = 0.07;
    }
    if(envioPremium.checked){
        costoDeEnvio = 0.15;
    }
    
    document.getElementById('cart_costo_envio').innerHTML = Math.round(subTotalParaEnvio*costoDeEnvio);
    
 } 

/* E6-part_1 Funcion para calular el Total */
function totalVenta(){
    let envioCost = parseInt(document.getElementById('cart_costo_envio').innerHTML)
    let subCost = parseInt(document.getElementById('cart_subtotal').innerHTML)  
    let total = envioCost + subCost;
    document.getElementById('cart_total').innerHTML = total;
  
}      
        
/* Aca carga el elemento del JSON y se adjunta al array con los elementos comprados dentro del Local Storage */     
document.addEventListener('DOMContentLoaded', async()=>{
    const itemJson = await getJSONData2(CART_INFO_URL + (localStorage.getItem("Usuario_ID")) + EXT_TYPE); /* Usuario_ID lo genero en init.js */
    let articuloCompra = itemJson.articles
    for (let e = 0; e < articuloCompra.length; e++) {
        objetoDeArtiCompra = articuloCompra[e]
        if(arrayCarrito.some(item =>item.id == articuloCompra[e].id)){
        }
        else{
            arrayCarrito.push(objetoDeArtiCompra)
        }
    }
    localStorage.setItem('Usuario_compra',JSON.stringify(arrayCarrito))
    tablaCompras.innerHTML = '';
    addItemCarritoProd(arrayCarrito,tablaCompras)
})

/* Aca se cargan en el Html solamente los items comprados que estan dentro de Local Storage,tambien se ejecutan las funciones de los costos */
document.addEventListener('DOMContentLoaded',()=>{
    arrayCarrito = JSON.parse(localStorage.getItem('Usuario_compra'))
    
    addItemCarritoProd(arrayCarrito,tablaCompras)
    sumarSubTotales();
    costoDeEnvio();
    totalVenta();
})

/* Funcion para modificar cantidades de articulo y subtotal*/
document.getElementById('tabla_items').addEventListener('change',(e)=>{
        let itemCarritoId = e.target.parentElement.parentElement
        let itemCarritoIdHtml =itemCarritoId.getAttribute("data-id");
        let cantidadItem = e.target.value
        let itemNewCantidad = itemCarritoId.querySelector('.cantidad_elemento');
        let itemNewSubTotal = itemCarritoId.querySelector('.subtotal');
        let itemMonedaSubtotal = itemCarritoId.querySelector('.subtotal_currency');
       
        for (let i = 0; i < arrayCarrito.length; i++) {
            if(arrayCarrito[i].id == itemCarritoIdHtml && arrayCarrito[i].currency === "USD"){
                arrayCarrito[i].count = parseInt(cantidadItem)
               
                itemNewCantidad.setAttribute("value",arrayCarrito[i].count)
                itemNewSubTotal.innerText = arrayCarrito[i].unitCost*arrayCarrito[i].count;
                
            }
            if(arrayCarrito[i].id == itemCarritoIdHtml && arrayCarrito[i].currency != "USD"){
                arrayCarrito[i].count = parseInt(cantidadItem)
               
                itemNewCantidad.setAttribute("value",arrayCarrito[i].count)
                itemNewSubTotal.innerText = (Math.round(arrayCarrito[i].unitCost / 42))*arrayCarrito[i].count;
                itemMonedaSubtotal.innerHTML = 'USD';
            }
            
            
            localStorage.setItem('Usuario_compra',JSON.stringify(arrayCarrito))
        }
})
    
/* Aca ejecuto las funciones de costos cada vez que se modifican las cantidades */
document.addEventListener('change',()=>{
    sumarSubTotales();
    costoDeEnvio();
    totalVenta();
   })
        
/* Funcion para modal forma de pago */
document.addEventListener('change',()=>{
        
    let creditoRadio = document.getElementById('tarjCredit_check_radio');
    let transfBancRadio = document.getElementById('tansfBanc_check_radio');
    let creditoModalInputs = document.getElementById('credito_modal');
    let transfBancModalInput = document.getElementById('transfBancaria_modal');
    let formaPagoHtml = document.getElementById('seleccion_formaPago_html');
    if(creditoRadio.checked){
        transfBancModalInput.setAttribute("disabled","");
        creditoModalInputs.removeAttribute("disabled")
        formaPagoHtml.innerHTML = creditoRadio.parentElement.textContent
        
    }
    else if (transfBancRadio.checked){
        creditoModalInputs.setAttribute("disabled","");
        transfBancModalInput.removeAttribute("disabled");
        formaPagoHtml.innerHTML = transfBancRadio.parentElement.textContent
    }
})

/* Funcion para dar feedback por con boton finalizar compra */
btnFinalizarCompra.addEventListener('click',()=>{
    
    let formaDePagoHtml = document.getElementById('seleccion_formaPago_html');
     if(formaDePagoHtml.innerText === 'No ha seleccionado una forma de pago'){
        document.querySelector('.seleccion_pago').classList.remove('d-none');
     }
     if(formaDePagoHtml.innerText !='No ha seleccionado una forma de pago'){
        document.querySelector('.seleccion_pago').classList.add('d-none');
     }
     document.getElementById('forma_pago_modal').addEventListener('change',()=>{
        
        document.querySelector('.seleccion_pago').classList.add('d-none');
     })

     
    if(inputCalle.value =='' || inputEsquina.value == '' || inputNumero.value ==''){
        document.getElementById('direccion_envio_form').classList.add('was-validated');
    }
    let datosPago = document.querySelector('.datos_pago');
    let tipoPago = document.querySelector('.seleccion_pago');
    if(inputCalle.value != '' && inputNumero.value !='' && inputEsquina.value != '' && formaDePagoHtml.innerText != "No ha seleccionado una forma de pago" && datosPago.classList.contains("d-none") && tipoPago.classList.contains("d-none")){
        document.querySelector('.alert').classList.remove('d-none')
        setTimeout(()=>{
            document.querySelector('.alert').classList.add('d-none')
        },3000)
    }
}) 
        
/* Funcion para validar modal */
btnCerrarModal.addEventListener('click',()=>{
    document.getElementById('form_modal').classList.add('was-validated');
    
    let bancoNumModal = document.getElementById('banco_numero_input_modal');
    let tarjetaNumModal = document.getElementById('numero_tarjeta_input_modal');
    let tarjetaCodModal = document.getElementById('codigo_seguridad_input_modal');
    let tarjetaVencModal = document.getElementById('tarjeta_vencimiento_input_modal');
    
   if(formaPagoTarjetaCheck.checked && tarjetaNumModal.value == ''|| tarjetaCodModal.value == '' || tarjetaVencModal.value == ''){
        document.querySelector('.datos_pago').classList.remove('d-none');
    }
    if(formaPagoTarjetaCheck.checked && tarjetaNumModal.value != ''&& tarjetaCodModal.value != '' && tarjetaVencModal.value != '' ){
        document.querySelector('.datos_pago').classList.add('d-none');
    }
    
     if(formaPagoBancoCheck.checked && bancoNumModal.value == ''){
        document.querySelector('.datos_pago').classList.remove('d-none');
    }
    if(formaPagoBancoCheck.checked && bancoNumModal.value != ''){
        document.querySelector('.datos_pago').classList.add('d-none');
    }
})
    
   
     
 
       
        








