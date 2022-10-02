const categoria = localStorage.getItem('catID');
const productoComentID = localStorage.getItem('productoID');
const producto_info_contenedor = document.getElementById('producto_info_contenedor');
const btnComentario = document.getElementById('btn_comentario');
const nombreUser = localStorage.getItem('nombreUsuario');
const comentario_contenedor = document.getElementById('comentario_contenedor');
const calificacion_puntos = document.getElementById('puntaje_select');
const contenedor_productos_relacionados = document.getElementById('cont_prod_relacionados');
const productoJSON = getJSONData2(PRODUCT_INFO_URL + productoComentID + EXT_TYPE);
const productoComentarioJSON = getJSONData2(PRODUCT_INFO_COMMENTS_URL + productoComentID + EXT_TYPE);
listaComentarios =[];





const fecha = new Date();
const fechaHoy= fecha.toLocaleString();



async function getJSONData2(url){
    const respuesta = await fetch(url);
    if(respuesta.ok){
        const data = await respuesta.json();
        return data;
    }else{
        console.error("error")
    }
}





/* Comentarios */

function comentariosArray(item_comentario){
    listaComentarios.push(item_comentario)
    
    
    
}
function ComentariosObject(nombre,fecha,comentario,puntaje){
    this.nombre = nombreUser;
    this.fecha = fechaHoy;
    this.comentario =document.getElementById('comentario_inp').value;
    this.puntaje = calificacion_puntos.value
} 

document.addEventListener('DOMContentLoaded',async()=>{
    productoComentario = await productoComentarioJSON ;

productoComentario.forEach(element => {
    
    comentario_contenedor.innerHTML +=`<div class="container">
    <ul class="list-group col-10 mb-4">
    
    <li class="list-group-item">
    <div><span  class="fw-bold">${element.user}</span> - <span class="fst-italic">${element.dateTime
    }</span></div>
    <div class="m-2">
    <p >Calificación - <span >${element.score}</span> / 5</p>
    </div>
    <div class="fst-normal">${element.description
    }</div>
    </li>
    
    </ul>
    </div>`
});

})



document.addEventListener('DOMContentLoaded',()=>{
    
    itemsLocal = localStorage.getItem('comentarios'+ (productoComentID))
    listaComentarios = JSON.parse (itemsLocal);
    if(itemsLocal== null){
        listaComentarios =[];
    }

    listaComentarios.forEach(element => {
        comentario_contenedor.innerHTML +=`
        <div class="container">
    <ul class="list-group col-10 mb-4">
    
    <li class="list-group-item">
    <div><span  class="fw-bold">${element.nombre}</span> - <span class="fst-italic">${element.fecha}</span></div>
    <div class="m-2">
    <p >Calificación - <span >${element.puntaje}</span> / 5</p>
    </div>
    <div class="fst-normal">${element.comentario}</div>
    </li>
    
    </ul>
</div>` 
    }); 
});
    


btnComentario.onclick = () =>{
    
    objetoComentario = new ComentariosObject();
    comentariosArray(objetoComentario)
    
    
    localStorage.setItem('comentarios'+ (productoComentID),JSON.stringify(listaComentarios));
    newListaComentarios = listaComentarios;
    location.href = location.href;
    
    puntaje()
    
    
}; 





       
        

/* Info del producto clickeado */
document.addEventListener('DOMContentLoaded',async ()=>{
    
    
    const productoID = localStorage.getItem('productoID')
    let objProductoJson = await productoJSON;
    
    
    producto_info_contenedor.innerHTML =`<div class="row">
    <h1 class="m-4">${objProductoJson.name}</h1>
    <hr>
    <h4><b>Precio</b></h4>
    <p>UYU <span>${objProductoJson.cost}</span></p>
    <h4><b>Descripción</b> </h4>
    <p>${objProductoJson.description}</p>
    <h4><b>Categoria</b></h4>
    <p>${objProductoJson.category}</p>
    <h4><b>Cantidad de vendidos</b></h4>
    <p>${objProductoJson.soldCount}</p>
    <h4><b>Imagen</b></h4>
    <div class="col">
    <img class="col-2 p-2" src="${objProductoJson.images[0]}" alt="Aca va una imagen">
    <img class="col-2 p-2" src="${objProductoJson.images[1]}" alt="Aca va otra imagen">
    <img class="col-2 p-2" src="${objProductoJson.images[2]}" alt="Aca va otra imagen mas">
    <img class="col-2 p-2" src="${objProductoJson.images[3]}" alt="Aca va otra imagen mas">
    </div>
    
    <hr class="m-3">
    
    
`
});
    
    


function toNewProduct(id){
    localStorage.setItem("productoID", id);
    window.location = "product-info.html"
}
/* Productos relacionados */
document.addEventListener('DOMContentLoaded',async()=>{
    let listaRelacionados = await productoJSON;
    listaRelacionados = listaRelacionados.relatedProducts ;
    listaRelacionados.forEach(element => {
        
         contenedor_productos_relacionados.innerHTML +=`<div class="card m-1 cursor-active" style="width: 18rem;" onclick="toNewProduct(${element.id})">
         <img src="${element.image}" class="card-img-top" alt="...">
         <div class="card-body">
         <p class="card-text">${element.name}</p>
         </div>
         </div>
         ` 
         
     });
        
})






