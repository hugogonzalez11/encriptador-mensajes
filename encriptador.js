const d = document;
const textArea = d.querySelector(".form_input");
const imagen_muneco = d.querySelector(".result_img");
const loader = d.querySelector(".loader");
const resultadoTitulo = d.querySelector(".result_title");
const resultadoText = d.querySelector(".result_text");
const botonEncriptar = d.querySelector(".form_btn");
const botonDesencriptar = d.querySelector(".form_btn");
const botonCopiar = d.querySelector(".result_btn");



/*
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
*/
const llaves= [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];

//funcion para encriptar
function encriptarMensaje(mensaje) {
    let mensajeEncriptado =""
    //mensaje = mensaje.toLowerCase();
    for (let i = 0; i < mensaje.length; i++) {
      let letra = mensaje[i];
      let encriptada = letra;
      for (let j = 0; j < llaves.length; j++) {
        if(letra===llaves[j][0]){
            encriptada = llaves[j][1];//reemplaza la letra por su equivalente encriptado
            break;//Termina el bucle cuando se encuentra la correspondencia
        }
        
      }
      mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}
//funcion para desencriptar
function desencriptarMensaje(mensaje) {
    //let mensajeDesencriptado = mensaje.toLowerCase();
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0])
    }
    return mensajeDesencriptado;
}
//Ocultar elementos dinamicamente
textArea.addEventListener("input", (e)=>{
    console.log(e.target.value);
    imagen_muneco.style.display="none";
    loader.classList.remove("hidden");
    resultadoTitulo.textContent = "Capturando Mensaje.";
    resultadoText.textContent = "";
})

//Funcion boton Encriptar
botonEncriptar.addEventListener("click", (e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarMensaje(mensaje);
    resultadoText.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "El resultado es: ";
    //textArea.value("");
})

//Funcion boton Desencriptar
botonDesencriptar.addEventListener("click", (e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultadoText.textContent = mensajeDesencriptado;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "El resultado es: ";
})

//Funcion boton Copiar
botonCopiar.addEventListener("click", (e)=>{
    let textoCopiado = resultadoText.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=>{
        console.log("Texto copiado");
        imagen_muneco.style.display = "block";
        loader.classList.add("hidden");
        resultadoTitulo.textContent = "Texto copiado";
        botonCopiar.classList.add("hidden");
        resultadoText.textContent ="";
    })
})
