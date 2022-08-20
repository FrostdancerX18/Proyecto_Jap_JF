
async function getJSONData2(url){
    const respuesta = await fetch(url);
    if(respuesta.ok){
        const data = await respuesta.json();
        return data;
    }else{
        console.error("error")
    }
}
document.addEventListener('DOMContentLoaded', async () =>{ //Con este evento espero a que se cargue el Html y luego puedo ejecutar la funcion//
    const listaProductos = await getJSONData2(PRODUCTS_URL);
    const containerProductos = document.querySelector('.lista-productos-nuevos');
    const productos = listaProductos.products
    document.querySelector('#catName').innerHTML = listaProductos.catName
    
    
   productos.forEach(producto => {
    containerProductos.innerHTML += `<div class="list-group-item list-group-item-action cursor-active">
       <div class="row">
       <div class="col-3">
       <img src="${producto.image}" alt="Los mejores precios en autos 0 kilómetro, de alta y media gama." class="img-thumbnail">
       </div>
       <div class="col">
       <div class="d-flex w-100 justify-content-between">
       <h4 class="mb-1"> <span id="productoName">${producto.name}</span> - <span id="productoMoneda">${producto.currency}</span> <span id="productoPrice">${producto.cost}</span></h4>
       <small class="text-muted"><span id="productoVentas">${producto.soldCount}</span> ventas</small>
       </div>
       <p class="mb-1"><span id="productoDescripcion">${producto.description}</span></p>
       </div>
       </div>
       </div>
       `;   
  });
    
    
})
