const tablaCompras = document.getElementById('tabla_items');
const btnVaciarCarrito = document.getElementById('boton_vaciarCarrito');

let arrayCarrito = [];









async function getJSONData2(url){
    const respuesta = await fetch(url);
    if(respuesta.ok){
        const data = await respuesta.json();
        return data;
    }else{
        console.error("error")
    }
} /* La funcion de arriba deberia haberla definido en un unico archivo JS y agregar ese script en cada html en lugar de volver a definirla en
cada archivo JS, por el momento lo dejo de esa forma para evitar romper otra cosa y complicarme los tiempos de entrega */





/* Funcion para agregar item desde carrito */
function addItemCarritoProd (array,tablaInner){
    if(array.length >0){
    array.forEach(element => {
        tablaInner.innerHTML +=`<tr class="item_carrito" data-id="${element.id}"> 
        <th scope="row col-2"><img src="${element.image}" alt="Imagen" class="w-25"></th>
        <td class="col-2">${element.name}</td>
        <td class="col-2">${element.currency}<span class="precioUnd">${element.unitCost}</span></td>
        <td class="col-2"><input type="number"  value="${element.count}" min="1" class="cantidad_elemento col-2" ></td>
        <td class="fw-bold col-2 subtotal_main"><span class="subtotal_currency">${element.currency}</span><span class="subtotal">${element.unitCost*element.count}</span></td>
        </tr>
        
        `
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

 /*Funcion para obtener el subtotal final,busco todos los elementos con clase subtototal para luego obtener los valores numericos 
        con for sobre lastSubtotal, agrego los valores a un nuevo array para luego hacer la suma,son strings, asi que los paso a numero con parseInt*/
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

/* Funcion para calcular envio */
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

/* Funcion para calular el Total */
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
        let itemCarritoIdHtml =itemCarritoId.getAttribute("data-id")
        let cantidadItem = e.target.value
        let itemNewCantidad = itemCarritoId.querySelector('.cantidad_elemento')
        let itemNewSubTotal = itemCarritoId.querySelector('.subtotal')
       
        for (let i = 0; i < arrayCarrito.length; i++) {
            if(arrayCarrito[i].id == itemCarritoIdHtml){
                arrayCarrito[i].count = parseInt(cantidadItem)
               
                itemNewCantidad.setAttribute("value",arrayCarrito[i].count)
                itemNewSubTotal.innerText = arrayCarrito[i].unitCost*arrayCarrito[i].count;
                
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


    
    
    
     
    
    
    
    
    
    

      
           
       
        








