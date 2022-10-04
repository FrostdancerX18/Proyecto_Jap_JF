const categoria = localStorage.getItem('catID');
const containerProductos = document.getElementById('lista-productos-nuevos');
const btnFilter =document.getElementById('rangeFilterPrice');

let productos = [];


function addProductos(){productos.forEach(producto => {
    containerProductos.innerHTML += `<li class="articulos list-group-item list-group-item-action cursor-active" onclick="setProductoID(${producto.id})">
    <div class="row">
    <div class="col-3 ">
    <img src="${producto.image}" alt="Imagen ref. del producto descripto." class="img-thumbnail">
    </div>
    <div class="col">
    <div class="d-flex w-100 justify-content-between">
    <h4 class="mb-1"> <span >${producto.name}</span> - <span >${producto.currency}</span> <span >${producto.cost}</span></h4>
    <small class="text-muted"><span >${producto.soldCount}</span> ventas</small>
    </div>
    <p class="mb-1"><span >${producto.description}</span></p>
    </div>
    </div>
    </li>
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

    /* Entrega 3 */
    
    function setProductoID(id) {    /* Con esta funcion agrego el id a la clave "productoID" en el localStorage,para llamar al a funcion, uso onclick
    que agrego en la linea 9  */
        localStorage.setItem("productoID", id);
        window.location = "product-info.html"
    }
    


    
   /* Funcion para buscador de articulos- desafiate E2 */

   document.addEventListener('keyup',(e)=>{
    if(e.target.matches('#buscador_articulo')){
        document.querySelectorAll('.articulos').forEach(articulo =>{
            articulo.textContent.toLowerCase().includes(e.target.value)
            ? articulo.classList.remove('filtro')
            : articulo.classList.add('filtro');
        })
    }
   })