const btnCrear = document.querySelector("#btnCrear");
const btnBorrarTodo= document.querySelector("#btn_borrar");
const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const secNotas = document.querySelector("#secNotas");
const formulario = document.querySelector("#formulario");
const params = new URLSearchParams(window.location.search);
const mes = Number(params.get("mes"));
const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
const tituloWebMes= document.querySelector("#tituloWebMes");
tituloWebMes.textContent=nombresMeses[mes];

const CLAVE_STORAGE="calendarioNotas"; 

let notas= JSON.parse(localStorage.getItem("notas")) || [];

let modo="crear";
let idEnEdicion=null; 

function ValidarTitulo(){
    if(!titulo.checkValidity()){
        titulo.reportValidity();
        return false;
    }else{
        return true;
    }
};

function ValidarDescripcion(){
    
    if(!descripcion.checkValidity()){
        descripcion.reportValidity();
        return false;
    }else{
        return true;
    }
};

function crearNota(){
    const nota={
        id: crypto.randomUUID(),
        titulo: titulo.value,
        descripcion: descripcion.value,
        mes: mes
    };
    return nota
}

function cargarNotasMes(){
    const raw = localStorage.getItem("notas");

  if (!raw) return [];

  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("JSON inválido:", error);
    return [];
  }
}

function mostrarNotasMes(){

    const notasMes = notas.filter(nota => Number(nota.mes) === mes)

secNotas.innerHTML = notasMes.map(nota => `
        <div class="nota" data-id="${nota.id}">
            <h3 id="titulo"><strong>Título:</strong> ${nota.titulo}</h3>
            <p id="descripcion"><strong>Descripción:</strong> ${nota.descripcion}</p>
            <button class="btnEditar" data-id="${nota.id}">Editar</button>
            <button class="btnEliminar" data-id="${nota.id}">Eliminar</button>
        </div>
    `).join("");
}

function render(){
    mostrarNotasMes();
}

btnBorrarTodo.addEventListener("click",(e)=>{
if (confirm("¿Seguro que quieres borrar todas las notas de este mes?")) {
        notas = notas.filter(nota => Number(nota.mes) !== mes);
        localStorage.setItem("notas", JSON.stringify(notas));
        render();
    }

});

formulario.addEventListener("submit",(e) => {
e.preventDefault();

if(!ValidarTitulo() || !ValidarDescripcion()){
    return;
};
if(modo==="crear"){
    const nota= crearNota();
    notas.push(nota);
    localStorage.setItem("notas",JSON.stringify(notas));
    render();
    formulario.reset();
}else if(modo === "editar"){

    if(confirm("¿Quieres editar la nota actual?")){

        notas=notas.map(nota => nota.id===idEnEdicion? 
            { ...nota, titulo: titulo.value, descripcion: descripcion.value }
                : nota)

    }
        modo = "crear";
        idEnEdicion=null;
        btnCrear.textContent = "Crear nota";
        localStorage.setItem("notas",JSON.stringify(notas))
        render();
        formulario.reset();
}
});

secNotas.addEventListener("click",(e) =>{

    if(e.target.classList.contains("btnEliminar")){
        const id= e.target.dataset.id;

        notas = notas.filter(nota => nota.id !== id);
        localStorage.setItem("notas", JSON.stringify(notas))
        render();
    }
    if(e.target.classList.contains("btnEditar")){
        const id= e.target.dataset.id;

        const nota= notas.find(nota => nota.id === id);
       
        titulo.value= nota.titulo;
        descripcion.value= nota.descripcion;

         modo = "editar";
         idEnEdicion= id;

        btnCrear.textContent = "Guardar cambios";

    };
});

render();