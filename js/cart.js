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
        <td class="col-2">USD <span class="precioUnd">${element.unitCost}</span></td>
        <td class="col-2"><input type="number"  value="${element.count}" min="1" class="cantidad_elemento col-2" ></td>
        <td class="fw-bold col-2">USD <span class="subtotal">${element.unitCost*element.count}</span></td>
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
        <td class="col-2">USD <span class="precioUnd">${element.unitCost}</span></td>
        <td class="col-2"><input type="number" value="${element.count}" min="1" class="cantidad_elemento col-2" "></td>
        <td class="fw-bold col-2">USD <span class="subtotal">${element.unitCost*element.count}</span></td>
        </tr>`
        
    });

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


/* Aca se cargan en el Html solamente los items comrpados que estan dentro de Local Storage */
document.addEventListener('DOMContentLoaded',()=>{
    arrayCarrito = JSON.parse(localStorage.getItem('Usuario_compra'))
    
    addItemCarritoProd(arrayCarrito,tablaCompras)
    
    
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
                console.log(arrayCarrito[i].unitCost*arrayCarrito[i].count)
                itemNewCantidad.setAttribute("value",arrayCarrito[i].count)
                itemNewSubTotal.innerText = arrayCarrito[i].unitCost*arrayCarrito[i].count;
            }
            
            localStorage.setItem('Usuario_compra',JSON.stringify(arrayCarrito))
            
            
        
        }
        
        
           console.log(itemCarritoId)
           console.log(itemNewCantidad.value)
        
        
        
        
        
        
        
        
    })
    

/* Funcion para boton de vaciar carrito
btnVaciarCarrito.addEventListener('click',()=>{
    localStorage.setItem('Usuario_compra','');
    addItemCarritoProd(arrayCarrito,tablaCompras)
})*/
    
    
    
     
    
    
    
    
    
    

      
           
       
        








