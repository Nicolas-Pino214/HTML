document.addEventListener('DOMContentLoaded', function() {
    //obtener la referencia de los documentos de la pagina//
  const inputBox =document.getElementById('inputBox');
  const showBtn = document.getElementById('showBtn');
  const outputBox = document.getElementById('outputBox');
  
  //Añadir un observador al bóton//
    showBtn.addEventListener('click', function() {
    const message = inputBox.value;
    console.log('Dato ingresado',message);
    outputBox.textContent=message;
  });
});