const tablaCompras = document.getElementById('tabla_items');
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






/* Funcion para agregar item del JSON  */
function addItemCarrito (array,tablaInner){
    array.forEach(element => {
        
        tablaInner.innerHTML +=`<tr> 
        <th scope="row col-2"><img src="${element.image}" alt="Imagen" class="w-25"></th>
        <td class="col-2">${element.name}</td>
        <td class="col-2">USD <span class="precioUnd">${element.unitCost}</span></td>
        <td class="col-2"><input type="number" value="${element.count}" min="1" class="col-2" "></td>
        <td class="fw-bold col-2">USD <span class="subtotal">${element.unitCost*element.count}</span></td>
        </tr>`
        
    });

}
/* Funcion para agregar item desde carrito */
function addItemCarritoProd (array,tablaInner){
    
    array.forEach(element => {
        tablaInner.innerHTML +=`<tr class="item_carrito"> 
        <th scope="row col-2"><img src="${element.articles.image}" alt="Imagen" class="w-25"></th>
        <td class="col-2">${element.articles.name}</td>
        <td class="col-2">USD <span class="precioUnd">${element.articles.unitCost}</span></td>
        <td class="col-2"><input type="number"  value="${element.articles.count}" min="1" class="cantidad_elemento col-2" ></td>
        <td class="fw-bold col-2">USD <span class="subtotal">${subtotal(element.articles.unitCost,element.articles.count)}</span></td>
        </tr>
        
        `
    });
}

 /* Funcion para obtener subtotal */
function subtotal (precio,cantidad){
       
    return precio*cantidad;
 }

 /* Funcion para modificar cantidades */
function setCantidad(array,cantElem){
    for (let i = 0; i < array.length; i++) {
         let cantidadEle = array[i].articles.count;
        array[i].articles.count = cantidadEle
        
        console.log(cantidadEle)
        
        
    }
};
    
        
        

document.addEventListener('DOMContentLoaded', async()=>{
    const itemJson = await getJSONData2(CART_INFO_URL + (localStorage.getItem("Usuario_ID")) + EXT_TYPE); /* Usuario_ID lo genero en init.js */
    let articuloCompra = itemJson.articles
    addItemCarrito(articuloCompra,tablaCompras)
    document.addEventListener('click',()=>{
        
    })
})



document.addEventListener('DOMContentLoaded',()=>{
    arrayCarrito = JSON.parse(localStorage.getItem('Usuario_compra'))
    addItemCarritoProd(arrayCarrito,tablaCompras)
    document.addEventListener('click',()=>{
        
    })
    
})
    
    
tablaCompras.addEventListener('change',(e)=>{
    const cantidadEle = parseInt(e.target.value)
    
    for (let n = 0; n < arrayCarrito.length; n++) {
        arrayCarrito[n].articles.count = cantidadEle;
        
    }
    
    console.log(arrayCarrito)
})
    
     
    
    
    
    
    
    

      
           
       
        





/* const inputCantidadElemento = document.getElementsByClassName('cantidad_elemento')
console.log(typeof inputCantidadElemento.value) */


