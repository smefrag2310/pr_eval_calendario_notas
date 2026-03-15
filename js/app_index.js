const contenedor= document.querySelector(".contenedor");
const btnLista= document.querySelector("#btn_lista");
const btnLimpiar= document.querySelector("#btn_limpiar");
const secNotas= document.querySelector("#secTodasNotas");
const tituloBusqueda= document.querySelector("#tituloBusqueda");
const notaBuscar= document.querySelector("#notaBuscar");
const btnBuscar= document.querySelector("#btn_buscar");
const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let notas= JSON.parse(localStorage.getItem("notas")) || [];

function crearCalendario(){
    for(let index=0; index < nombresMeses.length ; index++){
        const div= document.createElement("div");
        div.classList.add("mes");
        const nombre= nombresMeses[index];

        const notasMes= notas.filter(nota => nota.mes === index);
        const numNotas= notasMes.length;
        if(numNotas > 0){
            div.classList.add("marcado");
        }else{
            div.classList.add("desmarcado");
        }

        div.innerHTML=`
        <h3>${nombre}</h3>
        <p>Notas: ${numNotas}</p>
        <a href="mes.html?mes=${index}" class="boton">Ver notas</a>`;

       contenedor.appendChild(div);
    };
}

btnLimpiar.addEventListener("click",(e)=>{
e.preventDefault();

localStorage.clear();
notas=[];
secNotas.innerHTML= ``;
contenedor.innerHTML= ``;
crearCalendario();

});

btnLista.addEventListener("click",(e)=>{
e.preventDefault()

secNotas.innerHTML = notas.map(nota => `
        <div class="nota" data-id="${nota.id}">
            <h3 id="titulo"><strong>Título:</strong> ${nota.titulo}</h3>
            <p id="descripcion"><strong>Descripción:</strong> ${nota.descripcion}</p>
        </div>
    `).join("");
});

btnBuscar.addEventListener("click",(e)=>{
e.preventDefault();

const nota= notas.find(nota => nota.titulo === tituloBusqueda.value);

notaBuscar.innerHTML = "";
notaBuscar.innerHTML = `<div class="nota" data-id="${nota.id}">
            <h3 id="titulo"><strong>Título:</strong> ${nota.titulo}</h3>
            <p id="descripcion"><strong>Descripción:</strong> ${nota.descripcion}</p>
        </div>`
});

    document.addEventListener("DOMContentLoaded",crearCalendario);