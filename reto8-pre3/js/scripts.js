document.addEventListener('DOMContentLoaded', function(){
    const number1 = document.getElementById('number1');
    const number2 = document.getElementById('number2');
    const addButton =document.getElementById('addButton');
    const resultext = document.getElementById('resultText');

    addButton.addEventListener('click', function(){
        const num1 = Number(number1.value);
        const num2 = Number(number2.value);
        if(
            num1==='' ||
            num2==='' ||
            isNaN(Number(num1)) ||
            isNaN(Number2(num2)) {
                resultText.textContent ='por favor, ingrese numeros validos.';
                return;
            }
        )
        let result = Number(num1) Number(num2)
        resultText.textContent = result;
    });
});