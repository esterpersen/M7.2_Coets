"use strict";
// Array per guardar els rockets.
var rocketsArray = [];
// Array de <div> creats per cada rocket mostrat per pantalla.
var rocketsShown = [];
// Creem els 2 rockets i els posem a l'array de rockets.
var rocket01 = new Rocket("32WESSDS");
var rocket02 = new Rocket("LDSFJA32");
rocketsArray.push(rocket01, rocket02);
// Els 3 propellers del rocket 1.
rocket01.addPropeller(new Propeller(10));
rocket01.addPropeller(new Propeller(30));
rocket01.addPropeller(new Propeller(80));
// Els 6 propellers del rocket 2.
rocket02.addPropeller(new Propeller(30));
rocket02.addPropeller(new Propeller(40));
rocket02.addPropeller(new Propeller(50));
rocket02.addPropeller(new Propeller(50));
rocket02.addPropeller(new Propeller(30));
rocket02.addPropeller(new Propeller(10));
// El form del Rocket.
var createARocketForm = document.getElementById("createARocketForm");
// El form dels Propellers.
var createPropellersForm = document.getElementById("createPropellersForm");
// Tots els divs que s'han creat per afegir el maxPower de cada propeller.
var propellerMaxPower = document.getElementById("propellerMaxPower");
// Expressions regulars per a la validació.
var exp = {
    code: /^[\da-zA-Z]{8}$/gi, // [Digits + lletres] {8 vegades}.
};
// EXEMPLES AMB ELS ROCKETS CREATS
var propellersMaxPower1 = mapPropellersMaxPowersOfARocket(rocketsArray[0]);
var maxPower1 = calculateMaxPowerOfARocket(propellersMaxPower1);
showAllButtons(rocketsArray[0], maxPower1);
var propellersMaxPower2 = mapPropellersMaxPowersOfARocket(rocketsArray[1]);
var maxPower2 = calculateMaxPowerOfARocket(propellersMaxPower2);
showAllButtons(rocketsArray[1], maxPower2);
// Mostrar les dades de tots els rockets de l'array (code i potència màxima de propellers.).
function printAllRockets() {
    clearShownData();
    for (var i = 0; i < rocketsArray.length; i++) {
        printInfoRocketIndividual(rocketsArray[i], i + 1);
    }
    ;
}
// Mostrar les dades d'un rocket individual.
function printInfoRocketIndividual(rocket, position) {
    var allPropellersMaxPowersOfARocket = mapPropellersMaxPowersOfARocket(rocket);
    var maxPower = calculateMaxPowerOfARocket(allPropellersMaxPowersOfARocket);
    createRocketCard(position, rocket.code, allPropellersMaxPowersOfARocket, maxPower);
    rocket.shownOnScreen = true;
}
// Funció per crear i retornar un nou array amb les potencies maximes de tots els propellers d'1 coet
function mapPropellersMaxPowersOfARocket(rocket) {
    var allPropellersMaxPowersOfARocket = rocket.propellers.map(function (propeller) {
        return propeller.maximumPower;
    });
    return allPropellersMaxPowersOfARocket;
}
// Funció per crear una card amb el coet que se li envia.
function createRocketCard(i, code, allPropellersMaxPowersOfARocket, maxPower) {
    var showInfoHere1 = document.getElementById("rocketsInfo");
    var element1 = document.createElement("div");
    element1.className = "individualRocketCard";
    rocketsShown.push(element1);
    element1.innerHTML = "\n    <div class=\"card text-center mb-3 bg-transparent border-light\">\n        <div class=\"card-body \">\n            <div class=\"row\">\n                <div class=\"col\">\n\t\t\t\t<strong>Rocket: </strong>" + i + "\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n\t\t\t\t" + (code + ": " + allPropellersMaxPowersOfARocket + ".") + "\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col\">\n\t\t\t\tMaximum power: " + maxPower + "\n                </div>\n            </div>\n        </div>\n    </div>\n    ";
    showInfoHere1.appendChild(element1);
}
// Funcio per posar en blanc la zona de mostrar rockets i que no es dupliqui el que es mostra.
function clearShownData() {
    var individualRocketCards = Array.prototype.slice.call(document.getElementsByClassName('individualRocketCard'), 0);
    for (var _i = 0, individualRocketCards_1 = individualRocketCards; _i < individualRocketCards_1.length; _i++) {
        var card = individualRocketCards_1[_i];
        card.remove();
    }
    for (var _a = 0, rocketsArray_1 = rocketsArray; _a < rocketsArray_1.length; _a++) {
        var rocket = rocketsArray_1[_a];
        rocket.shownOnScreen = false;
    }
    rocketsShown = [];
}
// 3) Fes una funció que calculi la potència màxima del coet (serà el sumatori de les potències màximes dels propulsors).
function calculateMaxPowerOfARocket(potencies) {
    var maxPower = potencies.reduce(function (a, b) { return a + b; }, 0);
    return maxPower;
}
// 4) El coet tindrà dos mètodes, accelerar o frenar i augmentarà o es reduirà de 10 en 10 la potencia del propulsor. El coet tindrà una potència actual.
// ACCELERAR
function accelerateRocket(rocket, rocketPosition) {
    var maxPower = calculateMaxPowerOfARocket(mapPropellersMaxPowersOfARocket(rocket));
    // Comprovar si ha arribat a la max potencia total del coet AKA si pot seguir accelerant o no.
    if (rocket.currentPower >= maxPower) {
    }
    else {
        rocket.accelerate();
        checkSpeed(rocket, rocketPosition, maxPower);
    }
}
//FRENAR
function breakRocket(rocket, rocketPosition) {
    var progressBar = document.getElementById("progressBar" + rocketPosition);
    var maxPower = calculateMaxPowerOfARocket(mapPropellersMaxPowersOfARocket(rocket));
    // Comprovar si ha arribat a la min potencia total del coet (0) AKA si pot seguir frenant o no.
    if (rocket.currentPower <= 0) {
        progressBar.style.width = 0 + "%";
        progressBar.innerHTML = "This rocket is stopped";
    }
    else {
        rocket.break();
        checkSpeed(rocket, rocketPosition, maxPower);
    }
}
// Comprovar velocitat actual i canviar l'aparença de la barra segons uns intervals
function checkSpeed(rocket, rocketPosition, maxPower) {
    var spaceBG = document.getElementById("sliding-background" + rocketPosition);
    var currentPowerPercentage = (rocket.currentPower * 100) / maxPower;
    var progressBar = document.getElementById("progressBar" + rocketPosition);
    if (currentPowerPercentage >= 100) {
        progressBar.innerHTML = currentPowerPercentage.toFixed(0) + "% Complete - Max. Power Reached!";
        progressBar.style.backgroundColor = "red";
        spaceBG.style.animation = "displace 1s linear infinite reverse";
    }
    else if (currentPowerPercentage >= 80) {
        progressBar.innerHTML = currentPowerPercentage.toFixed(0) + "% Complete - Alert! High Power!";
        progressBar.style.backgroundColor = "orange";
        progressBar.style.color = "black";
        spaceBG.style.animation = "displace 2s linear infinite reverse";
    }
    else if (currentPowerPercentage >= 60) {
        progressBar.innerHTML = currentPowerPercentage.toFixed(0) + "% Complete";
        progressBar.style.backgroundColor = "green";
        progressBar.style.color = "white";
        spaceBG.style.animation = "displace 5s linear infinite reverse";
    }
    else if (currentPowerPercentage >= 30) {
        progressBar.innerHTML = currentPowerPercentage.toFixed(0) + "% Complete";
        progressBar.style.backgroundColor = "green";
        progressBar.style.color = "white";
        spaceBG.style.animation = "displace 10s linear infinite reverse";
    }
    else if (currentPowerPercentage >= 10) {
        progressBar.innerHTML = currentPowerPercentage.toFixed(0) + "% Complete";
        progressBar.style.backgroundColor = "green";
        progressBar.style.color = "white";
        spaceBG.style.animation = "displace 20s linear infinite reverse";
    }
    else {
        progressBar.innerHTML = currentPowerPercentage.toFixed(0) + "% Complete";
        progressBar.style.backgroundColor = "green";
        progressBar.style.color = "white";
        spaceBG.style.animation = "displace 30s linear infinite reverse";
    }
    progressBar.style.width = currentPowerPercentage + "%";
}
function accelerateRocket01() {
    accelerateRocket(rocket01, 0);
}
function breakRocket01() {
    breakRocket(rocket01, 1);
}
// Crear un nou rocket
function createRocket() {
    // ZONA Input _Code_ del Rocket
    var newRocketCodeInput = document.getElementById("rocketCode");
    // DATA _Code_ del Rocket
    var newRocketCodeData = newRocketCodeInput.value.toUpperCase();
    // ZONA Input _Propellers_
    var howManyPropellersInput = document.getElementById("rocketNumPropellers");
    // DATA _Propellers_
    var howManyPropellersData = parseInt(howManyPropellersInput.value);
    // Comprovar que els inputs no estan en blanc
    var infoRocketFormValid = checkIfInputsHaveData(1, createARocketForm, newRocketCodeInput, newRocketCodeData);
    // Si la info es correcta:
    if (infoRocketFormValid == true) {
        // Que apareguin tants com hagi dit 
        var showInfoHere2 = document.getElementById("propellerMaxPower");
        showInfoHere2.innerHTML = "";
        for (var i = 0; i < howManyPropellersData; i++) {
            var element2 = document.createElement("div");
            element2.className = "form-group mb-3";
            element2.id = "propellerDiv" + i;
            element2.innerHTML = "\n                <label for=\"propellerMaxPowerData\"> Maximum Power of Propeller " + (i + 1) + "</label>\n                <input type=\"number\" id=\"propellerMaxPowerData" + (i) + "\" autofocus placeholder=\"Min 10 - Max 100 - Use the arrows\" class=\"form-control\" name=\"propellerMaxPowerNumber\" min=\"10\" max=\"100\" step=\"10\" onkeydown=\"return false\">\n                <div class=\"invalid-feedback\" id=\"errorPropellerMaxPower" + (i) + "\"></div>\n                <div class=\"valid-feedback\" id=\"okPropellerMaxPower" + (i) + "\"></div>\n               \n                ";
            showInfoHere2.appendChild(element2);
        }
        // Canvi de form.
        canviDeForms();
        // Crear un objecte Rocket amb el code.
        var newRocket = new Rocket(newRocketCodeData);
        rocketsArray.push(newRocket);
        // Resetejar formulari.
        clearForm(createARocketForm);
        newRocketCodeInput.classList.remove('is-valid');
    }
}
function addPropellers() {
    var _a;
    //Agafar l'últim rocket creat per afegir-li els propellers.
    var rocket = rocketsArray[rocketsArray.length - 1];
    var maxPowerOfEachPropeller;
    var arrayPropellers = [];
    // Agafar el valor de cada Max Power del form.
    var propellerMaxPowerArea = document.getElementById("propellerMaxPower");
    var inputsOfPropellerMaxPowerArea = propellerMaxPowerArea.getElementsByTagName('input');
    var arrayResultsValidInfo = [];
    // Per cada propeller creat, agafem el valor de Max Power i comprovem que no estigui buit.
    for (var i = 0; i <= inputsOfPropellerMaxPowerArea.length - 1; i++) {
        maxPowerOfEachPropeller = Number((_a = inputsOfPropellerMaxPowerArea.item(i)) === null || _a === void 0 ? void 0 : _a.value);
        var propellerMaxPowerData = document.getElementById("propellerMaxPowerData" + i);
        // Comprovar que els inputs no estan en blanc
        var infoPropellersFormValid = checkIfInputsHaveData(2, createPropellersForm, propellerMaxPowerData, maxPowerOfEachPropeller.toString(), i);
        arrayResultsValidInfo.push(infoPropellersFormValid);
        arrayPropellers.push(maxPowerOfEachPropeller);
    }
    //Comprovem si tots els Max Power han sigut omplerts
    var isInfoValid = function (currentValue) { return currentValue == true; };
    var isAllInfoValid = arrayResultsValidInfo.every(isInfoValid);
    // Si tota la info es correcta:
    if (isAllInfoValid == true) {
        // Creem el propeller amb aquesta max power
        for (var i = 0; i <= inputsOfPropellerMaxPowerArea.length - 1; i++) {
            rocket.addPropeller(new Propeller(arrayPropellers[i]));
        }
        // Canvi de form.
        canviDeForms();
        // Resetejar formulari.
        clearForm(createPropellersForm);
        // Agrupar tots els max powers de tots els propellers del coet en un array.
        var allPropellersMaxPowersOfARocket = mapPropellersMaxPowersOfARocket(rocket);
        // Calcular el max power del coet.
        var maxPower = calculateMaxPowerOfARocket(allPropellersMaxPowersOfARocket);
        // Mostrar botons per cada coet. 
        showAllButtons(rocket, maxPower);
    }
}
// Crear una funcio perque creii els botons un cop creat el coet.
function showAllButtons(rocket, maxPowerRocket) {
    var rocketButtonsAndRaceColumn = document.getElementById("rocketButtonsAndRaceColumn");
    var rocketPosition = rocketsArray.indexOf(rocket) + 1;
    var createRow = document.createElement("div");
    createRow.className = "row gx-4 mb-3";
    rocketButtonsAndRaceColumn.appendChild(createRow);
    var createButtonsColumn = document.createElement("div");
    createButtonsColumn.className = "col-md-3";
    createRow.appendChild(createButtonsColumn);
    // Row-col on vaniran els 4 botons
    var createRowCols = document.createElement("div");
    createRowCols.className = "row row-cols-4 mx-1";
    createRowCols.id = "otherFunctionsButtons";
    createButtonsColumn.appendChild(createRowCols);
    // "Botó" de número de coet - disabled
    var createNumberButton = document.createElement("button");
    createNumberButton.className = "individualRocketButtons btn btn-secondary disabled px-1";
    createNumberButton.innerHTML = rocketPosition + "\n    ";
    createRowCols.appendChild(createNumberButton);
    // Botó accelerate
    var createAccelerateButton = document.createElement("button");
    createAccelerateButton.className = "individualRocketButtons btn btn-outline-warning px-1";
    createAccelerateButton.innerHTML = "<i class=\"fas fa-plus\"></i>\n    ";
    createAccelerateButton.onclick = function () { accelerateRocket(rocket, rocketPosition); };
    createRowCols.appendChild(createAccelerateButton);
    // Bbotó break
    var createBreakButton = document.createElement("button");
    createBreakButton.className = "individualRocketButtons btn btn-outline-warning px-1";
    createBreakButton.innerHTML = "<i class=\"fas fas fa-minus\"></i> \n    ";
    createBreakButton.onclick = function () { breakRocket(rocket, rocketPosition); };
    createRowCols.appendChild(createBreakButton);
    // Botó print
    var createPrintButton = document.createElement("button");
    createPrintButton.className = "individualRocketButtons btn btn-outline-info px-1";
    createPrintButton.innerHTML = "<i class=\"far far fa-eye\"></i>\n    ";
    createPrintButton.onclick = function () {
        if (rocket.shownOnScreen == false) {
            printInfoRocketIndividual(rocket, rocketPosition);
        }
    };
    createRowCols.appendChild(createPrintButton);
    // Columna de la Race
    var createRaceColumn = document.createElement("div");
    createRaceColumn.className = "col-md-9 ";
    createRaceColumn.innerHTML = " \n    <!-- Aqu\u00ED \u00E9s l'espai de la progress bar del rocket -->\n    <div class=\"row text-start spaceBG\" id=\"rocketRaceArea\" style=\"background-color: darkcyan;\">\n        <div class=\"sliding-background p-0 m-0\" id=\"sliding-background" + rocketPosition + "\">    \n            <div class=\"col\">\n                <i class=\"fas fa-space-shuttle fa-2x p-1\" id=\"rocketIcon\"></i>\n                <div class=\"progress\">\n                    <div class=\"progress-bar\" id=\"progressBar" + rocketPosition + "\" role=\"progressbar\" aria-valuenow=\"0\"\n                        aria-valuemin=\"0\" aria-valuemax=\"" + maxPowerRocket + "\" style=\"width:0%\">\n                          " + rocket.currentPower + "% Complete\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>    \n    ";
    createRow.appendChild(createRaceColumn);
}
// Funcio per amagar un form i mostrar l'altre.
function canviDeForms() {
    // Quan cliquem a Create Rocket
    if (createPropellersForm.style.display == "none") {
        createPropellersForm.style.display = "block";
        createARocketForm.style.display = "none";
    }
    // Quan cliquem a Add Propellers, que torni a l'estat inicial
    else if (createARocketForm.style.display == "none") {
        createPropellersForm.style.display = "none";
        createARocketForm.style.display = "block";
    }
}
// Els inputs contenen informacio?
function checkIfInputsHaveData(formNumber, form, newRocketInput, newRocketData, i) {
    // Feedback correcte
    var okFeedback = "Looks good!";
    var infoValid;
    // Treure la class is-invalid de moment
    form.classList.remove('is-invalid');
    switch (formNumber) {
        case 1:
            //missatges d'error i d'ok pel Rocket Code
            var errorRocketCode = document.getElementById("errorRocketCode");
            var okRocketCode = document.getElementById("okRocketCode");
            //Què passa si es deixa en blanc el CODE, o si és incorrecte:
            var infoValidaRocket = whatIfInputIsEmptyOrIncorrect(1, newRocketInput, newRocketData, errorRocketCode, okRocketCode, okFeedback, exp.code);
            infoValid = infoValidaRocket;
            break;
        case 2:
            //missatges d'error i d'ok pels proppellers
            var errorNumberPropellers = document.getElementById("errorPropellerMaxPower" + i);
            var okNumberPropellers = document.getElementById("okPropellerMaxPower" + i);
            //Què passa si es deixa en blanc el Max Power de cada Propeller:
            var infoValidaPropellers = whatIfInputIsEmptyOrIncorrect(2, newRocketInput, newRocketData, errorNumberPropellers, okNumberPropellers, okFeedback, undefined);
            infoValid = infoValidaPropellers;
            break;
        default:
            infoValid = false;
    }
    return infoValid;
}
// Comprovacio de cada field
function whatIfInputIsEmptyOrIncorrect(formNum, htmlInputElArea, input, incorrectFeedback, correctFeedback, allGoodFeedback, regexToValidate) {
    // Es valida la info o no
    var infoValida = false;
    if (input === '' || input == "0") {
        htmlInputElArea.classList.add("is-invalid");
        incorrectFeedback.innerHTML = "Data missing.";
        correctFeedback.innerHTML = "";
    }
    else if (formNum == 1 && validation(input, regexToValidate) == false) {
        htmlInputElArea.classList.add("is-invalid");
        incorrectFeedback.innerHTML = "Please enter valid data.";
        correctFeedback.innerHTML = "";
    }
    else {
        htmlInputElArea.classList.remove('is-invalid');
        htmlInputElArea.classList.add("is-valid");
        incorrectFeedback.innerHTML = "";
        correctFeedback.innerHTML = allGoodFeedback;
        infoValida = true;
    }
    return infoValida;
}
// VALIDACIÓ
function validation(paraula, expr) {
    return (expr === null || expr === void 0 ? void 0 : expr.test(paraula)) ? true : false;
}
// RESETEJAR EL FORMULARI
function clearForm(myForm) {
    myForm.reset();
}
