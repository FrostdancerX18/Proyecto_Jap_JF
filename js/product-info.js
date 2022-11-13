const categoria = localStorage.getItem('catID');
const productoComentID = localStorage.getItem('productoID');
const producto_info_contenedor = document.getElementById('producto_info_contenedor');
const btnComentario = document.getElementById('btn_comentario');
const nombreUser = localStorage.getItem('nombreUsuario');
const comentario_contenedor = document.getElementById('comentario_contenedor');
const calificacion_puntos = document.getElementById('puntaje_select');
const contenedor_productos_relacionados = document.getElementById('carousel_productos_relacionados');
const productoJSON = getJSONData2(PRODUCT_INFO_URL + productoComentID + EXT_TYPE);
const productoComentarioJSON = getJSONData2(PRODUCT_INFO_COMMENTS_URL + productoComentID + EXT_TYPE);
const btn_comprar = document.getElementById('boton_comprar');
const productoID = localStorage.getItem('productoID');
listaComentarios =[];
let currentItem ={};
let carrito =[];  /* Tengo el array vacio de carrito para luego añadir los items con el boton de comprar */


const fecha = new Date();
const fechaHoy= fecha.toLocaleString();



/* DESAFIATE E3 - Comentarios y comentarios agragados por el usuario- */
function comentariosArray(item_comentario){
    listaComentarios.push(item_comentario)
}

function ComentariosObject(nombre,fecha,comentario,puntaje){
    this.nombre = nombreUser;
    this.fecha = fechaHoy;
    this.comentario =document.getElementById('comentario_inp').value;
    this.puntaje = calificacion_puntos.value
} 

function toNewProduct(id){
    localStorage.setItem("productoID", id);
    window.location = "product-info.html"
}

/* DESAFIATE E5_PARTE 1 - Funcion para comprar producto */
function comprarProducto(array,producto){
     
    if(array.length == 0){
        array.push(producto);
        
    }
    else if(array.every(item=> item.id !== producto.id)) {  
                array.push(producto);
        }
        else{ /* Cuando el item es el mismo, suma la canitdad en lugar de agregar otra vez el mismo item */
            for (let i = 0; i < array.length; i++) {
                    if(array[i].id == producto.id){
                        array[i].count ++
                    } 
                }
        }
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
    let objProductoJson = await productoJSON;
    
    if(localStorage.getItem("Usuario_compra") == null){ /* Genero en el local Storage un espacio para posible compra,comienza vacio */
        localStorage.setItem("Usuario_compra","")
    }
    producto_info_contenedor.innerHTML =`
    <h1 class=" col-8 m-2">${objProductoJson.name}</h1>
    <hr class="m-2">
    <h4><b>Precio</b></h4>
    <p>${objProductoJson.currency} <span>${objProductoJson.cost}</span></p>
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
    <hr class="m-3">`
    currentItem ={  /* Aca genero el objeto con las propiedades necesarias para carrito a partir del objeto Json cargado en pantalla y luego lo trabajao desde aca */
            
        count:1,
        currency:`${objProductoJson.currency}`,
        id:`${objProductoJson.id}`,
        image:`${objProductoJson.images[0]}`,
        name:`${objProductoJson.name}`,
        unitCost:`${objProductoJson.cost}`
    }
})
            
/* DESAFIATE E4 -Productos relacionados */
document.addEventListener('DOMContentLoaded',async()=>{
    let listaRelacionados = await productoJSON;
    listaRelacionados = listaRelacionados.relatedProducts ;
    listaRelacionados.forEach(element => {
        
         contenedor_productos_relacionados.innerHTML +=`
         <div class="carousel-item cursor-active" >
         <img src="${element.image}" class="img-fluid d-block mx-auto mt-3" alt="..." width="400" height="auto" onclick="toNewProduct(${element.id})">
         <h5 class="text-center mt-4">${element.name}</h5>
         </div>` 
        });
        contenedor_productos_relacionados.firstElementChild.classList.add('active')
    })
    
    
      
/* DESAFIATE E5_PARTE 2 - Escucha en el boton de comprar para ejecutar la funcion de compra */
btn_comprar.addEventListener('click',()=>{
    comprarProducto(carrito,currentItem)
    if(localStorage.getItem('Usuario_compra') == ''){
    localStorage.setItem('Usuario_compra',JSON.stringify(carrito))
    }  
    else{
        carrito = JSON.parse(localStorage.getItem('Usuario_compra'))
        comprarProducto(carrito,currentItem)
        localStorage.setItem('Usuario_compra',JSON.stringify(carrito))
    }
})







