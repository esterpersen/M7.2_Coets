// Array per guardar els rockets.
let rocketsArray: Rocket[] = [];

// Array de <div> creats per cada rocket mostrat per pantalla.
let rocketsShown: HTMLDivElement[] = [];

// Creem els 2 rockets i els posem a l'array de rockets.
const rocket01: Rocket = new Rocket("32WESSDS");
const rocket02: Rocket = new Rocket("LDSFJA32");
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
let createARocketForm = <HTMLFormElement>document.getElementById("createARocketForm");
// El form dels Propellers.
let createPropellersForm = <HTMLFormElement>document.getElementById("createPropellersForm");

// Tots els divs que s'han creat per afegir el maxPower de cada propeller.
let propellerMaxPower = <HTMLInputElement>document.getElementById("propellerMaxPower");

// Expressions regulars per a la validació.
const exp = {
    code: /^[\da-zA-Z]{8}$/gi, // [Digits + lletres] {8 vegades}.
};

// EXEMPLES AMB ELS ROCKETS CREATS
let propellersMaxPower1: number[] = mapPropellersMaxPowersOfARocket(rocketsArray[0]);
let maxPower1: number = calculateMaxPowerOfARocket(propellersMaxPower1);
showAllButtons(rocketsArray[0], maxPower1);

let propellersMaxPower2: number[] = mapPropellersMaxPowersOfARocket(rocketsArray[1]);
let maxPower2: number = calculateMaxPowerOfARocket(propellersMaxPower2);
showAllButtons(rocketsArray[1], maxPower2);

// Mostrar les dades de tots els rockets de l'array (code i potència màxima de propellers.).
function printAllRockets() {
    clearShownData();
    for (let i = 0; i < rocketsArray.length; i++) {
        printInfoRocketIndividual(rocketsArray[i], i + 1);
    };
}

// Mostrar les dades d'un rocket individual.
function printInfoRocketIndividual(rocket: Rocket, position: number) {
    let allPropellersMaxPowersOfARocket: number[] = mapPropellersMaxPowersOfARocket(rocket);
    let maxPower: number = calculateMaxPowerOfARocket(allPropellersMaxPowersOfARocket);
    createRocketCard(position, rocket.code, allPropellersMaxPowersOfARocket, maxPower);
    rocket.shownOnScreen = true;
}

// Funció per crear i retornar un nou array amb les potencies maximes de tots els propellers d'1 coet
function mapPropellersMaxPowersOfARocket(rocket: Rocket) {
    let allPropellersMaxPowersOfARocket = rocket.propellers.map((propeller: Propeller) => {
        return propeller.maximumPower;
    });
    return allPropellersMaxPowersOfARocket;
}

// Funció per crear una card amb el coet que se li envia.
function createRocketCard(i: number, code: string, allPropellersMaxPowersOfARocket: number[], maxPower: number) {
    let showInfoHere1 = <HTMLInputElement>document.getElementById("rocketsInfo");

    const element1 = document.createElement("div");
    element1.className = "individualRocketCard";

    rocketsShown.push(element1);

    element1.innerHTML = `
    <div class="card text-center mb-3 bg-transparent border-light">
        <div class="card-body ">
            <div class="row">
                <div class="col">
				<strong>Rocket: </strong>${i}
                </div>
            </div>
            <div class="row">
                <div class="col">
				${code + ": " + allPropellersMaxPowersOfARocket + "."}
                </div>
            </div>
            <div class="row">
                <div class="col">
				Maximum power: ${maxPower}
                </div>
            </div>
        </div>
    </div>
    `;
    showInfoHere1.appendChild(element1);
}

// Funcio per posar en blanc la zona de mostrar rockets i que no es dupliqui el que es mostra.
function clearShownData() {
    let individualRocketCards: HTMLDivElement[] =
        Array.prototype.slice.call(document.getElementsByClassName('individualRocketCard'), 0);

    for (let card of individualRocketCards) {
        card.remove();
    }

    for (let rocket of rocketsArray) {
        rocket.shownOnScreen = false;
    }

    rocketsShown = [];
}

// 3) Fes una funció que calculi la potència màxima del coet (serà el sumatori de les potències màximes dels propulsors).
function calculateMaxPowerOfARocket(potencies: number[]) {
    let maxPower = potencies.reduce((a, b) => a + b, 0);
    return maxPower;
}

// 4) El coet tindrà dos mètodes, accelerar o frenar i augmentarà o es reduirà de 10 en 10 la potencia del propulsor. El coet tindrà una potència actual.
// ACCELERAR
function accelerateRocket(rocket: Rocket, rocketPosition: number) {
    let maxPower: number = calculateMaxPowerOfARocket(mapPropellersMaxPowersOfARocket(rocket));
    // Comprovar si ha arribat a la max potencia total del coet AKA si pot seguir accelerant o no.
    if (rocket.currentPower >= maxPower) {
    }
    else {
        rocket.accelerate();
        checkSpeed(rocket, rocketPosition, maxPower);
    }
}

//FRENAR
function breakRocket(rocket: Rocket, rocketPosition: number) {
    let progressBar = <HTMLProgressElement>document.getElementById("progressBar" + rocketPosition);
    let maxPower: number = calculateMaxPowerOfARocket(mapPropellersMaxPowersOfARocket(rocket));

    // Comprovar si ha arribat a la min potencia total del coet (0) AKA si pot seguir frenant o no.
    if (rocket.currentPower <= 0) {
        progressBar.style.width = 0 + "%";
        progressBar.innerHTML = "This rocket is stopped";
    } else {
        rocket.break();
        checkSpeed(rocket, rocketPosition, maxPower);
    }
}

// Comprovar velocitat actual i canviar l'aparença de la barra segons uns intervals
function checkSpeed(rocket: Rocket, rocketPosition: number, maxPower: number) {
    let spaceBG = <HTMLDivElement>document.getElementById("sliding-background" + rocketPosition);
    let currentPowerPercentage = (rocket.currentPower * 100) / maxPower;
    let progressBar = <HTMLProgressElement>document.getElementById("progressBar" + rocketPosition);

    if (currentPowerPercentage >= 100) {
        progressBar.innerHTML = currentPowerPercentage.toFixed(0) + "% Complete - Max. Power Reached!";
        progressBar.style.backgroundColor = "red";
        spaceBG.style.animation = "displace 1s linear infinite reverse";
    } else if (currentPowerPercentage >= 80) {
        progressBar.innerHTML = currentPowerPercentage.toFixed(0) + "% Complete - Alert! High Power!";
        progressBar.style.backgroundColor = "orange";
        progressBar.style.color = "black";
        spaceBG.style.animation = "displace 2s linear infinite reverse";
    } else if (currentPowerPercentage >= 60) {
        progressBar.innerHTML = currentPowerPercentage.toFixed(0) + "% Complete";
        progressBar.style.backgroundColor = "green";
        progressBar.style.color = "white";
        spaceBG.style.animation = "displace 5s linear infinite reverse";
    } else if (currentPowerPercentage >= 30) {
        progressBar.innerHTML = currentPowerPercentage.toFixed(0) + "% Complete";
        progressBar.style.backgroundColor = "green";
        progressBar.style.color = "white";
        spaceBG.style.animation = "displace 10s linear infinite reverse";
    } else if (currentPowerPercentage >= 10) {
        progressBar.innerHTML = currentPowerPercentage.toFixed(0) + "% Complete";
        progressBar.style.backgroundColor = "green";
        progressBar.style.color = "white";
        spaceBG.style.animation = "displace 20s linear infinite reverse";
    } else {
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
    let newRocketCodeInput: HTMLInputElement = <HTMLInputElement>document.getElementById("rocketCode");
    // DATA _Code_ del Rocket
    let newRocketCodeData: string = newRocketCodeInput.value.toUpperCase();

    // ZONA Input _Propellers_
    let howManyPropellersInput: HTMLSelectElement = <HTMLSelectElement>document.getElementById("rocketNumPropellers");
    // DATA _Propellers_
    let howManyPropellersData: number = parseInt(howManyPropellersInput.value);

    // Comprovar que els inputs no estan en blanc
    let infoRocketFormValid: boolean = checkIfInputsHaveData(1, createARocketForm, newRocketCodeInput, newRocketCodeData);

    // Si la info es correcta:
    if (infoRocketFormValid == true) {
        // Que apareguin tants com hagi dit 
        let showInfoHere2 = <HTMLInputElement>document.getElementById("propellerMaxPower");

        showInfoHere2.innerHTML = "";

        for (let i = 0; i < howManyPropellersData; i++) {
            const element2 = document.createElement("div");
            element2.className = "form-group mb-3";
            element2.id = "propellerDiv" + i;
            element2.innerHTML = `
                <label for="propellerMaxPowerData"> Maximum Power of Propeller ${(i + 1)}</label>
                <input type="number" id="propellerMaxPowerData${(i)}" autofocus placeholder="Min 10 - Max 100 - Use the arrows" class="form-control" name="propellerMaxPowerNumber" min="10" max="100" step="10" onkeydown="return false">
                <div class="invalid-feedback" id="errorPropellerMaxPower${(i)}"></div>
                <div class="valid-feedback" id="okPropellerMaxPower${(i)}"></div>
               
                `;
            showInfoHere2.appendChild(element2);
        }

        // Canvi de form.
        canviDeForms();

        // Crear un objecte Rocket amb el code.
        let newRocket: Rocket = new Rocket(newRocketCodeData);
        rocketsArray.push(newRocket);

        // Resetejar formulari.
        clearForm(createARocketForm);
        newRocketCodeInput.classList.remove('is-valid');
    }
}

function addPropellers() {
    //Agafar l'últim rocket creat per afegir-li els propellers.
    let rocket = rocketsArray[rocketsArray.length - 1];
    let maxPowerOfEachPropeller: number;
    let arrayPropellers: number[] = [];

    // Agafar el valor de cada Max Power del form.
    let propellerMaxPowerArea = <HTMLDivElement>document.getElementById("propellerMaxPower");
    let inputsOfPropellerMaxPowerArea = <HTMLCollectionOf<HTMLInputElement>>propellerMaxPowerArea.getElementsByTagName('input');

    let arrayResultsValidInfo: boolean[] = [];

    // Per cada propeller creat, agafem el valor de Max Power i comprovem que no estigui buit.
    for (let i = 0; i <= inputsOfPropellerMaxPowerArea.length - 1; i++) {
        maxPowerOfEachPropeller = Number(inputsOfPropellerMaxPowerArea.item(i)?.value);

        let propellerMaxPowerData = <HTMLDivElement>document.getElementById("propellerMaxPowerData" + i);

        // Comprovar que els inputs no estan en blanc
        let infoPropellersFormValid: boolean = checkIfInputsHaveData(2, createPropellersForm, propellerMaxPowerData, maxPowerOfEachPropeller.toString(), i);

        arrayResultsValidInfo.push(infoPropellersFormValid);
        arrayPropellers.push(maxPowerOfEachPropeller);
    }

    //Comprovem si tots els Max Power han sigut omplerts
    let isInfoValid = (currentValue: boolean) => currentValue == true;
    let isAllInfoValid = arrayResultsValidInfo.every(isInfoValid);

    // Si tota la info es correcta:
    if (isAllInfoValid == true) {
        // Creem el propeller amb aquesta max power
        for (let i = 0; i <= inputsOfPropellerMaxPowerArea.length - 1; i++) {
            rocket.addPropeller(new Propeller(arrayPropellers[i]));
        }
        // Canvi de form.
        canviDeForms();

        // Resetejar formulari.
        clearForm(createPropellersForm);

        // Agrupar tots els max powers de tots els propellers del coet en un array.
        let allPropellersMaxPowersOfARocket: number[] = mapPropellersMaxPowersOfARocket(rocket);

        // Calcular el max power del coet.
        let maxPower: number = calculateMaxPowerOfARocket(allPropellersMaxPowersOfARocket);

        // Mostrar botons per cada coet. 
        showAllButtons(rocket, maxPower);
    }
}

// Crear una funcio perque creii els botons un cop creat el coet.
function showAllButtons(rocket: Rocket, maxPowerRocket: number) {
    let rocketButtonsAndRaceColumn = <HTMLDivElement>document.getElementById("rocketButtonsAndRaceColumn");
    let rocketPosition = rocketsArray.indexOf(rocket) + 1;

    let createRow = document.createElement("div");
    createRow.className = "row gx-4 mb-3";
    rocketButtonsAndRaceColumn.appendChild(createRow);

    let createButtonsColumn = document.createElement("div");
    createButtonsColumn.className = "col-md-3";
    createRow.appendChild(createButtonsColumn);

    // Row-col on vaniran els 4 botons
    let createRowCols = document.createElement("div");
    createRowCols.className = "row row-cols-4 mx-1";
    createRowCols.id = "otherFunctionsButtons";
    createButtonsColumn.appendChild(createRowCols);

    // "Botó" de número de coet - disabled
    let createNumberButton = document.createElement("button");
    createNumberButton.className = "individualRocketButtons btn btn-secondary disabled px-1"
    createNumberButton.innerHTML = `${rocketPosition}
    `;
    createRowCols.appendChild(createNumberButton);

    // Botó accelerate
    let createAccelerateButton = document.createElement("button");
    createAccelerateButton.className = "individualRocketButtons btn btn-outline-warning px-1"
    createAccelerateButton.innerHTML = `<i class="fas fa-plus"></i>
    `;
    createAccelerateButton.onclick = function () { accelerateRocket(rocket, rocketPosition) };
    createRowCols.appendChild(createAccelerateButton);

    // Bbotó break
    let createBreakButton = document.createElement("button");
    createBreakButton.className = "individualRocketButtons btn btn-outline-warning px-1"
    createBreakButton.innerHTML = `<i class="fas fas fa-minus"></i> 
    `;
    createBreakButton.onclick = function () { breakRocket(rocket, rocketPosition) };
    createRowCols.appendChild(createBreakButton);

    // Botó print
    let createPrintButton = document.createElement("button");
    createPrintButton.className = "individualRocketButtons btn btn-outline-info px-1"
    createPrintButton.innerHTML = `<i class="far far fa-eye"></i>
    `;
    createPrintButton.onclick = function () {
        if (rocket.shownOnScreen == false) {
            printInfoRocketIndividual(rocket, rocketPosition);
        }
    };
    createRowCols.appendChild(createPrintButton);

    // Columna de la Race
    let createRaceColumn = document.createElement("div");
    createRaceColumn.className = "col-md-9 ";
    createRaceColumn.innerHTML = ` 
    <!-- Aquí és l'espai de la progress bar del rocket -->
    <div class="row text-start spaceBG" id="rocketRaceArea" style="background-color: darkcyan;">
        <div class="sliding-background p-0 m-0" id="sliding-background${rocketPosition}">    
            <div class="col">
                <i class="fas fa-space-shuttle fa-2x p-1" id="rocketIcon"></i>
                <div class="progress">
                    <div class="progress-bar" id="progressBar${rocketPosition}" role="progressbar" aria-valuenow="0"
                        aria-valuemin="0" aria-valuemax="${maxPowerRocket}" style="width:0%">
                          ${rocket.currentPower}% Complete
                    </div>
                </div>
            </div>
        </div>
    </div>    
    `;
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
function checkIfInputsHaveData(formNumber: number, form: HTMLFormElement, newRocketInput: HTMLInputElement | HTMLDivElement, newRocketData: string, i?: number): boolean {
    // Feedback correcte
    let okFeedback = "Looks good!";
    let infoValid: boolean;

    // Treure la class is-invalid de moment
    form.classList.remove('is-invalid');

    switch (formNumber) {
        case 1:
            //missatges d'error i d'ok pel Rocket Code
            let errorRocketCode = <HTMLDivElement>document.getElementById("errorRocketCode");
            let okRocketCode = <HTMLDivElement>document.getElementById("okRocketCode");

            //Què passa si es deixa en blanc el CODE, o si és incorrecte:
            let infoValidaRocket: boolean = whatIfInputIsEmptyOrIncorrect(1, newRocketInput, newRocketData, errorRocketCode, okRocketCode, okFeedback, exp.code);
            infoValid = infoValidaRocket;
            break;
        case 2:
            //missatges d'error i d'ok pels proppellers
            let errorNumberPropellers = <HTMLDivElement>document.getElementById("errorPropellerMaxPower" + i);
            let okNumberPropellers = <HTMLDivElement>document.getElementById("okPropellerMaxPower" + i);

            //Què passa si es deixa en blanc el Max Power de cada Propeller:
            let infoValidaPropellers: boolean = whatIfInputIsEmptyOrIncorrect(2, newRocketInput, newRocketData, errorNumberPropellers, okNumberPropellers, okFeedback, undefined);
            infoValid = infoValidaPropellers;
            break;
        default:
            infoValid = false;
    }
    return infoValid;
}

// Comprovacio de cada field
function whatIfInputIsEmptyOrIncorrect(formNum: number, htmlInputElArea: HTMLInputElement | HTMLDivElement, input: string, incorrectFeedback: HTMLDivElement, correctFeedback: HTMLDivElement, allGoodFeedback: string, regexToValidate?: RegExp) {
    // Es valida la info o no
    let infoValida: boolean = false;

    if (input === '' || input == "0") {
        htmlInputElArea.classList.add("is-invalid");
        incorrectFeedback.innerHTML = "Data missing.";
        correctFeedback.innerHTML = "";

    } else if (formNum == 1 && validation(input, regexToValidate) == false) {
        htmlInputElArea.classList.add("is-invalid");
        incorrectFeedback.innerHTML = "Please enter valid data.";
        correctFeedback.innerHTML = "";

    } else {
        htmlInputElArea.classList.remove('is-invalid');
        htmlInputElArea.classList.add("is-valid");
        incorrectFeedback.innerHTML = "";
        correctFeedback.innerHTML = allGoodFeedback;
        infoValida = true;
    }
    return infoValida;
}

// VALIDACIÓ
function validation(paraula: string, expr?: RegExp) {
    return expr?.test(paraula) ? true : false;
}

// RESETEJAR EL FORMULARI
function clearForm(myForm: HTMLFormElement) {
    myForm.reset();
}