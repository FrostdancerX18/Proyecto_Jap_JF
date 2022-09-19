const categoria = localStorage.getItem('catID');
const productoComentID = localStorage.getItem('productoID');
const producto_info_contenedor = document.getElementById('producto_info_contenedor');
const btnComentario = document.getElementById('btn_comentario');
const nombreUser = localStorage.getItem('nombreUsuario');
const comentario_contenedor = document.getElementById('comentario_contenedor');
const calificacion_puntos = document.getElementById('puntaje_select');

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







function comentariosArray(item_comentario){
    listaComentarios.push(item_comentario)
    
    
    
}
function ComentariosObject(nombre,fecha,comentario,puntaje){
    this.nombre = nombreUser;
    this.fecha = fechaHoy;
    this.comentario =document.getElementById('comentario_inp').value;
    this.puntaje = calificacion_puntos.value
} 


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
    console.log(puntaje)
    
}; 





       
        


document.addEventListener('DOMContentLoaded',async ()=>{
    const productoJSON = getJSONData2(PRODUCTS_URL + categoria + EXT_TYPE)
    const productoID = localStorage.getItem('productoID')
    const productoCat = await productoJSON;
    let arrayProductoJson = await productoJSON;
    arrayProductoJson = arrayProductoJson.products;
    productoInfo = arrayProductoJson.filter(producto => producto.id == productoID)
    
    
    
    
    productoInfo.forEach(element => {
        
        
    producto_info_contenedor.innerHTML =`<div class="row">
    <h1 class="m-4">${element.name}</h1>
    <hr>
    <h4><b>Precio</b></h4>
    <p>UYU <span>${element.cost}</span></p>
    <h4><b>Descripción</b> </h4>
    <p>${element.description}</p>
    <h4><b>Categoria</b></h4>
    <p>${productoCat.catName}</p>
    <h4><b>Cantidad de vendidos</b></h4>
    <p>${element.soldCount}</p>
    <h4><b>Imagen</b></h4>
    <div class="col">
    <img class="col-3" src="${element.image}" alt="Aca va una imagen">
    <img class="col-3" src="${element.image}" alt="Aca va otra imagen">
    <img class="col-3" src="${element.image}" alt="Aca va otra imagen mas">
    </div>
    
    <hr class="m-3">
    
    
`
});
    
    
})

