/*
//
// The JS file for the Square Matrix Calculator
// 
*/

//Variables
var currentSize = 5;
var textSizeCheck = 0;

//Resizes the matrices
function resize(size) {
    containerLeft = document.getElementById("matrixContainerLeft");
    containerRight = document.getElementById("matrixContainerRight");     
    for (let i = 0; i < 5; i++) {
        for(let o = 0; o < 5; o++) {     
            if (i < size && o < size) {
                containerLeft.children[i].children[o].removeAttribute("disabled");
                containerRight.children[i].children[o].removeAttribute("disabled");
            } else {
                containerLeft.children[i].children[o].setAttribute("disabled", true);
                containerRight.children[i].children[o].setAttribute("disabled", true);
                containerLeft.children[i].children[o].value = '';
                containerRight.children[i].children[o].value = '';
            }
        }
    }
    currentSize = size;
}

//Clears the matrices
function clearMatrix(buttonID) {
    if (buttonID == "leftButton") {
        containerLeft = document.getElementById("matrixContainerLeft");
        for (let i = 0; i < 5; i++) {
            for(let o = 0; o < 5; o++) {
                containerLeft.children[i].children[o].value = '';
            }
        }
    } else {
        containerRight = document.getElementById("matrixContainerRight");
        for (let i = 0; i < 5; i++) {
            for(let o = 0; o < 5; o++) {     
                containerRight.children[i].children[o].value = '';                        
            }
        }   
    }
}

//Command for testing, fills the current matrix with random integers between 1-10
function fillMatrix() {
    containerLeft = document.getElementById("matrixContainerLeft");
    containerRight = document.getElementById("matrixContainerRight");
    for (let i = 0; i < currentSize; i++) {
        for(let o = 0; o < currentSize; o++) {
            containerLeft.children[i].children[o].value = (Math.floor(Math.random() * 10) + 1);
        }
    }
    for (let i = 0; i < currentSize; i++) {
        for(let o = 0; o < currentSize; o++) {     
            containerRight.children[i].children[o].value = (Math.floor(Math.random() * 10) + 1);                        
        }
    }   
    
}


//Calculates the text based matrix calculation
function textCalculate(textBasedMatrixString) {
    splitString = textBasedMatrixString.split(" ");
    
    matrixLeft = checkMatrixValidity(splitString[0]);
    firstMatrixSize = textSizeCheck;
    matrixRight = checkMatrixValidity(splitString[2]);

    if (firstMatrixSize != textSizeCheck) {
        openErrorModal("Matrices are different sizes!");
        throw "Error9";
    }

    calculationType = splitString[1];

    if (calculationType == '+') {
        console.log("Calculation is a +");
        var result = [];
        var row = [];
    
        for (i = 0; i < textSizeCheck; i++) {
            for (k = 0; k < textSizeCheck; k++) {
                row.push(parseInt(matrixLeft[i][k]) + parseInt(matrixRight[i][k]));
            }
            result.push(row);
            row = [];
        }
        console.log(result);
    } else if (calculationType == '-') {
        console.log("Calculation is a -");
        var result = [];
        var row = [];
    
        for (i = 0; i < textSizeCheck; i++) {
            for (k = 0; k < textSizeCheck; k++) {
                row.push(parseInt(matrixLeft[i][k]) - parseInt(matrixRight[i][k]));
            }
            result.push(row);
            row = [];
        }
        console.log(result);


    } else if (calculationType == '*' || calculationType == 'x') {
        console.log("Calculation is a *");
        var result = [];
        var row = [];

        cloneMatrix = matrixLeft;

        var i,k,j;
        for (i = 0; i < textSizeCheck; i++) {
            for (j = 0; j < textSizeCheck; j++) {
                temporaryInt = 0;
                for (k = 0; k < textSizeCheck; k++) {
                    temporaryInt += parseInt(cloneMatrix[i][k]) * parseInt(matrixRight[k][j]);
                    console.log(row)
                }
                row.push(temporaryInt);
            
            }
            result.push(row);
            row = [];
        }

    } else {
        openErrorModal("Invalid calculation type!");
    }
    document.getElementById("resultBox2").innerHTML = printTextMatrix(result);
}

//Creates the matrix string from the cells
function createMatrix() {
    containerLeft = document.getElementById("matrixContainerLeft");
    containerRight = document.getElementById("matrixContainerRight");

    var matrixStringLeft = "[";
    var matrixStringRight = "[";

    for (let i = 0; i < currentSize; i++) {
        matrixStringLeft = matrixStringLeft.concat("[");
        for(let o = 0; o < currentSize; o++) {
            if (containerLeft.children[i].children[o].value == '') {
                openErrorModal("There is an empty cell or multiple empty cells in one of the matrices!");
                throw "Error8";
            }
            matrixStringLeft = matrixStringLeft.concat(containerLeft.children[i].children[o].value);
            if (o < currentSize - 1) {
                matrixStringLeft = matrixStringLeft.concat(",");
            }       
        }
        matrixStringLeft = matrixStringLeft.concat("]");
    }
    matrixStringLeft = matrixStringLeft.concat("]");

    for (let i = 0; i < currentSize; i++) {
        matrixStringRight = matrixStringRight.concat("[");
        for(let o = 0; o < currentSize; o++) {     
            if (containerRight.children[i].children[o].value == '') {
                openErrorModal("There is an empty cell or multiple empty cells in one of the matrices!");
                throw "Error8";
            }
            matrixStringRight = matrixStringRight.concat(containerRight.children[i].children[o].value);
            if (o < currentSize - 1) {
                matrixStringRight = matrixStringRight.concat(",");
            }                       
        }
        matrixStringRight = matrixStringRight.concat("]");
    }
    matrixStringRight = matrixStringRight.concat("]");

    matrixLeft = checkMatrixValidity(matrixStringLeft);
    matrixRight = checkMatrixValidity(matrixStringRight);

    matrices = [];
    matrices.push(matrixLeft);
    matrices.push(matrixRight);

    //matrixStringComplete = matrixStringLeft.concat("&" ,matrixStringRight);
    return matrices;
}

//Prints out the matrix
function printMatrix(matrix) {
    string = '';
    columnDigitAmount = 0;
    var length;
    for (z = 0; z < currentSize; z++) {
        for (f = 0; f < currentSize; f++) {
            length = ("" + matrix[z][f]).length
            if (matrix[z][f] <= 0) {
                length++;
            }
            if (length > columnDigitAmount) {
                columnDigitAmount = length;      
            }
        }
    }

    for (i = 0; i < currentSize; i++) {
        for (k = 0; k < currentSize; k++) {
            length = ("" + matrix[i][k]).length
            string = string + matrix[i][k];
            string = string + " ";          
            for (j = length; j < columnDigitAmount; j++) {
                string = string + "&nbsp";
            }
        }
        string = string + "<br>"
    }
    return string;
}

//Prints out the text matrix string
function printTextMatrix(matrix) {
    string = '[';
    console.log(matrix);
    for (i = 0; i < textSizeCheck; i++) {
        string = string + '[';
        for (k = 0; k < textSizeCheck; k++) {
            string = string + matrix[i][k];
            if (k < textSizeCheck - 1) {
                string = string + ',';
            }  
        }
        string = string + ']';
    }
    string = string + ']';
    return string;
}


//Adds two matrices together
function addMatrices() {
    matrices = createMatrix();

    matrixLeft = matrices[0];
    matrixRight = matrices[1];

    var result = [];
    var row = [];

    for (i = 0; i < currentSize; i++) {
        for (k = 0; k < currentSize; k++) {
            row.push(parseInt(matrixLeft[i][k]) + parseInt(matrixRight[i][k]));
        }
        result.push(row);
        row = [];
    }

    console.log(result);
    document.getElementById("resultBox2").innerHTML = printMatrix(result);
}

//Subtracts one matrix from another
function subtractMatrices() {
    matrices = createMatrix();

    matrixLeft = matrices[0];
    matrixRight = matrices[1];

    var result = [];
    var row = [];

    for (i = 0; i < currentSize; i++) {
        for (k = 0; k < currentSize; k++) {
            row.push(parseInt(matrixLeft[i][k]) - parseInt(matrixRight[i][k]));
        }
        result.push(row);
        row = [];
    }

    console.log(result);
    document.getElementById("resultBox2").innerHTML = printMatrix(result);
}

//Multiplies the matrices together
function multiplyMatrices() {
    matrices = createMatrix();

    matrixLeft = matrices[0];
    matrixRight = matrices[1];

    var result = [];
    var row = [];

    cloneMatrix = matrixLeft;

    var i,k,j;
    for (i = 0; i < currentSize; i++) {
        for (j = 0; j < currentSize; j++) {
            temporaryInt = 0;
            for (k = 0; k < currentSize; k++) {
                temporaryInt += parseInt(cloneMatrix[i][k]) * parseInt(matrixRight[k][j]);
                console.log(row)
            }
            row.push(temporaryInt);
         
        }
        result.push(row);
        row = [];
    }
    document.getElementById("resultBox2").innerHTML = printMatrix(result);
}

//This function validates matrices
//It's translated from a C++ matrix validation function
//So if it looks weird, it's probably because of that
function checkMatrixValidity(matrixString){
    var c;
    var rowAmount = 0, columnAmount = 0, columnFirstAmount = 0, tempInt = 0;
    var columnCheck = false;

    console.log(matrixString);

    var matrix = [];
    var row = [];
    //If the string doesn't start with [ it is invalid
    if (matrixString.charAt(0) != '[') {
        openErrorModal("Invalid matrix, consult the help button for more information!");
        throw "Error1";
    }

    for (var i = 1; i < matrixString.length; i++) {
        
        c = matrixString.charAt(i);
        if (matrixString.charAt(i+1) == '') { break; }

        if (c == '[') {
            //Loop until next character is ]
            while (matrixString.charAt(i+1) != ']') {
                if (matrixString.charAt(i+1) == '-') {
                    c = matrixString.charAt(i+1);
                    tempInt = matrixString.charAt(i+1);
                    i = i + 1;
                    while (Number.isInteger(parseInt(matrixString.charAt(i+1)))) {
                        tempInt = tempInt.concat(matrixString.charAt(i+1));
                        i = i + 1;
                    }
                    tempInt *= -1;
                    row.push(tempInt);
                } else if (Number.isInteger(parseInt(matrixString.charAt(i+1)))) {
                    tempInt = matrixString.charAt(i+1);
                    i = i + 1;
                    while (Number.isInteger(parseInt(matrixString.charAt(i+1)))) {
                        tempInt = tempInt.concat(matrixString.charAt(i+1));
                        i = i + 1;
                    }
                    row.push(tempInt);
                } else { console.log(matrixString.charAt(i+1)); openErrorModal("Invalid matrix, consult the help button for more information!"); throw "Error2"; }
                columnAmount += 1;
                if (matrixString.charAt(i+1) == ',') {
                    i = i + 1;
                } else if (matrixString.charAt(i+1) != ']') { console.log(matrixString.charAt(i+1)); openErrorModal("Invalid matrix, consult the help button for more information!"); throw "Error3"; }

            }
        } else {openErrorModal("Invalid matrix, consult the help button for more information!"); throw "Error4"; }

        if (!columnCheck) {
            columnFirstAmount = columnAmount;
            columnCheck = true;
        } else {
            if (columnFirstAmount != columnAmount) { openErrorModal("Invalid matrix, consult the help button for more information!"); throw "Error5"; }
        }
        console.log(row);
        matrix.push(row);
        row = [];
        columnAmount = 0;
        rowAmount += 1;
        i = i + 1;
        console.log(matrix);
    }
    
    //Final check
    if (c != ']' || (rowAmount != columnFirstAmount)) {
        openErrorModal("Invalid matrix, consult the help button for more information!");
        throw "Error7";
    }

    textSizeCheck = columnFirstAmount;
    console.log("Matrix passed!");
    return matrix;
}



//Modals
function openSettingsModal() {
    document.getElementById("settingsModal").style.display = "block";
}

function openHelpModal() {
    document.getElementById("helpModal").style.display = "block";
}

function closeSettingsModal() {
    document.getElementById("settingsModal").style.display = "none";
}

function closeHelpModal() {
    document.getElementById("helpModal").style.display = "none";
}


//Handles closing the modals if user clicks outside the modal
window.onclick = function(event) {
    modal1 = document.getElementById("settingsModal")
    modal2 = document.getElementById("helpModal")
    errorModal = document.getElementById("errorModal");
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
    if (event.target == errorModal) {
        errorModal.style.display = "none";
    }
}


//Error messages
function openErrorModal(errorMessage) {
    document.getElementById("errorModal").style.display = "block";
    document.getElementById("errorText").innerText = errorMessage;
}
function closeErrorModal() {
    document.getElementById("errorModal").style.display = "none";
}


//Themes
function switchTheme() {
    if (localStorage.getItem('theme') == 'dark' || localStorage.getItem('theme') == null) {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');

    } else {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

function checkTheme() {
    if (localStorage.getItem('theme') == 'light') {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById('light').checked = 'true';
    }
}