const categoria = localStorage.getItem('catID');
const containerProductos = document.querySelector('.lista-productos-nuevos');
const btnFilter =document.getElementById('rangeFilterPrice');

let productos = [];


function addProductos(){productos.forEach(producto => {
    containerProductos.innerHTML += `<div class="list-group-item list-group-item-action cursor-active">
    <div class="row">
    <div class="col-3">
    <img src="${producto.image}" alt="Imagen ref. del producto descripto." class="img-thumbnail">
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
}

document.getElementById('clearRangeFilterPrice').addEventListener('click',()=>{
    location.reload();    //Una escucha en el boton para hacer una funcion para recargar la pagina y limpiar los filtros
})



async function getJSONData2(url){
    const respuesta = await fetch(url);
    if(respuesta.ok){
        const data = await respuesta.json();
        return data;
    }else{
        console.error("error")
    }
}
/*document.addEventListener('DOMContentLoaded', async () =>{ //Con este evento espero a que se cargue el Html y luego puedo ejecutar la funcion//
    const listaProductos = await getJSONData2(PRODUCTS_URL);
    const containerProductos = document.querySelector('.lista-productos-nuevos');
    const productos = listaProductos.products
    document.querySelector('#catName').innerHTML = listaProductos.catName */
    
    document.addEventListener('DOMContentLoaded', async()=>{
        const listaProductos = await getJSONData2(PRODUCTS_URL + categoria + EXT_TYPE);
        productos = listaProductos.products
        document.querySelector('#catName').innerHTML = listaProductos.catName
        
        addProductos()
        
    })

    let curretProductArray =[];
    
    
    async function getItemsByRelev(){
        curretProductArray = await getJSONData2(PRODUCTS_URL + categoria + EXT_TYPE);
        curretProductArray = curretProductArray.products;
        const arrayItems = curretProductArray;
        const sortItemsPrice = arrayItems.sort((a, b)=>{
            return b.soldCount - a.soldCount
        })
        productos = sortItemsPrice;
        containerProductos.innerHTML = '';
        addProductos()
        
    }
    async function getItemsByPriceAsc(){
        curretProductArray = await getJSONData2(PRODUCTS_URL + categoria + EXT_TYPE);
        curretProductArray = curretProductArray.products;
        const arrayItems = curretProductArray;
        const sortItemsPrice = arrayItems.sort((a, b)=>{
            return a.cost - b.cost
        })
        productos = sortItemsPrice;
        containerProductos.innerHTML = '';
        addProductos()
        
    }
    async function getItemsByPriceDesc(){
        curretProductArray = await getJSONData2(PRODUCTS_URL + categoria + EXT_TYPE);
        curretProductArray = curretProductArray.products;
        const arrayItems = curretProductArray;
        const sortItemsPrice = arrayItems.sort((a, b)=>{
            return b.cost - a.cost
        })
        productos = sortItemsPrice;
        containerProductos.innerHTML = '';
        addProductos()
        
    }
    const precioMin = document.getElementById('rangeFilterPriceMin');
    const precioMax = document.getElementById('rangeFilterCPriceMax');
    async function filterItems(){
        
        curretProductArray = await getJSONData2(PRODUCTS_URL + categoria + EXT_TYPE);
        curretProductArray = curretProductArray.products;
        const arrayItems = curretProductArray;
        const filterItems = arrayItems.filter(element => element.cost <= precioMax.value && element.cost >= precioMin.value)
        productos = filterItems;
        containerProductos.innerHTML = '';
        addProductos()
        
    }