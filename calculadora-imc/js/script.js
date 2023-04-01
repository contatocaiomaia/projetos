const data = [
    {
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        info: "Magreza",
        obesity: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Normal",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre 25,0 e 29,9",
        info: "Sobrepeso",
        obesity: "I",
    },
    {
        min: 30,
        max: 39.9,
        classification: "Entre 30,0 e 39,9",
        info: "Obesidade",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classification: "Maior que 40,0",
        info: "Obesidade grave",
        obesity: "III",
    },
];

//Seleção de elementos
const imcTable = document.querySelector("#imc-table")
//Ações principais da api

const heightInput = document.querySelector("#height")
const weightInput = document.querySelector("#weight")
const calcBtn = document.querySelector("#calc-btn")
const clearBtn = document.querySelector("#clear-btn")
const calcContainer = document.querySelector("#calc-container")
const resultContainer = document.querySelector("#result-container")
const imcNumber = document.querySelector("#imc-number span")
const imcInfo = document.querySelector("#imc-info")
const backBtn = document.querySelector("#back-btn")

const updatedValue = document.querySelector("#valid-digits")

//Função pra procurar todos os items do banco   
function createTable(data) {
    data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("table-data");

        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div);
    });
    //Função para limpar
}
function cleanInputs() {
    heightInput.value = ""
    weightInput.value = ""
}

//Validar o tipo do input. Nesse caso só vai ser aceito número e vírgula
//Dentro do colchete é informado o que pode. Nesse caso, pode números de 0 à 9 e , "virgula".
function validacao(text) {
    return text.replace(/[^0-9,]/g, "")
}
//Função pra calcular
function calcImc(weight, height) {
    //Aqui informo que o calculo vai ter uma casa decimal
    const imc = (weight / (height * height)).toFixed(1)
    return imc
}

//Aqui digo que se tem hide tira e se não tem coloca
function showOrHideResults() {
    calcContainer.classList.toggle("hide")
    resultContainer.classList.toggle("hide")

}



//Inicialização
createTable(data);

//Eventos
[heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updatedValue = validDigits(e.target.value);
        e.target.value = updatedValue;
        //Valor digitado pelo usuário
        //Limpa dígitos não
    });
});

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //Aqui informo que toda a vírgula terá um ponto
    const weight = +weightInput.value.replace(",", ".")
    const height = +heightInput.value.replace(",", ".")

    //Acontece o bloqueio p/ próxima tela caso os valores não sejam inseridos.
    if (!weight || !height) return;
    const imc = calcImc(weight, height)

    //Encontrando informações do input. Validando
    let info
    data.forEach((item) => {
        if (imc >= item.min && imc <= item.max) {
            info = item.info;
        }
    });
    console.log(info)
    //Se não houver input
    if (!info) return;

    //Com os valores que calculei preencho os spans
    imcNumber.innerText = imc
    imcInfo.innerText = info;

    switch (info) {
        
        case "Magreza":
            imcNumber.classList.add("low")
            imcInfo.classList.add("low")
            break;

        case "Normal":
            imcNumber.classList.add("good")
            imcInfo.classList.add("good")
            break;

        case "Sobrepeso":
            imcNumber.classList.add("low")
            imcInfo.classList.add("low")
            break;

        case "Obesidade":
            imcNumber.classList.add("medium")
            imcInfo.classList.add("medium")
            break;
        case "Obesidade Grave":
            imcNumber.classList.add("high")
            imcInfo.classList.add("high")
            break;
    }
    showOrHideResults();
});

//Botão de limpar os dados do input
clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cleanInputs();
});

//Método do botão/ação voltar
backBtn.addEventListener("click", (back) => {
    back.preventDefault();
    cleanInputs();
    showOrHideResults();

});




