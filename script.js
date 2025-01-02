let question = document.getElementsByClassName("question")[0];


//  this is the main (parent)  container of options, and option is the (child ) of qs-option-container
let optionsContainer = document.querySelector(".qs-option-container");

let nextbutton = document.getElementsByClassName("next")[0];
let prevbutton = document.getElementsByClassName("previuos")[0];
let submitbutton = document.getElementsByClassName("submit")[0];
let showQsNumberOnTop = document.getElementsByClassName("show-qs-number")[0];


//this is the counter fot tracking the current question to be display to user
let questioncounter = 0;
let useroption = [];


// quizdat ais the an array which consist of object ( 5 question with descriotion) ,we can access each opject of an array by index 
let quizdata = [
    {
        question: "How Many Days in the Week?",
        options: [2, 4, 6, 7],
        correct: 3,
    },
    {
        question: "How Many Hours in a day?",
        options: [21, 24, 26, 17],
        correct: 1,
    },
    {
        question: "How Many Minutes in an Hour?",
        options: [212, 60, 61, 63],
        correct: 1,
    },
    {
        question: "How Many seconds in One minute?",
        options: [60, 49, 61, 72],
        correct: 0,
    },
    {
        question: "How Many months in a year?",
        options: [22, 14, 12, 17],
        correct: 2,
    }
]


// <--------------this is the function for display th equestion to user ------------------->
function displayQuestion(index) {

    // at initial before display the options are intiale to blank it will be shown according to question  number
    optionsContainer.textContent = "";


    // this (currentquestion) store the question  according to the number the number depends on [index(which is parameter/argument of function)]
    const currentquestion = quizdata[index]
    question.textContent = currentquestion.question;


    //for each loop is used to display the each option of question .at first we create dynamically the (P) element to to show option . currentquestion.options ..in this .options ..is the key of array object
    currentquestion.options.forEach((option, opindex) => {
        let optionElement = document.createElement("p");
        optionElement.innerText = option;
        optionElement.classList.add("option");
        optionElement.addEventListener("click", () => {

            useroption[index] = opindex;
            document.querySelectorAll(".option").forEach(opt => opt.style.backgroundColor = "");
            optionElement.style.backgroundColor = "lightgray";
        });
        optionsContainer.appendChild(optionElement);
    });
    prevbutton.disabled = index === 0;
    nextbutton.hidden = index === quizdata.length - 1;
    submitbutton.hidden = index !== quizdata.length - 1;
    showQsNumberOnTop.textContent = `${index + 1} of ${quizdata.length} Questions`;

};





//<----- this function display th equestions wheneer the load ---->
document.addEventListener("DOMContentLoaded", () => {
    displayQuestion(questioncounter);
});



nextbutton.addEventListener("click", () => {
    const currentQuestion = quizdata[questioncounter];
    const selectedOptionIndex = useroption[questioncounter];

    if (selectedOptionIndex === undefined) {
        alert("Please select an option before proceeding!");
        return;
    }

    // Highlight correct and incorrect answers
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach((option, index) => {

        if (index === currentQuestion.correct) {
            option.style.backgroundColor = "green"; // Correct option
        } else if (index === selectedOptionIndex) {
            option.style.backgroundColor = "red"; // Selected incorrect option
        }
    });

    // Pause for 1 second before moving to the next question
    setTimeout(() => {
        if (questioncounter < quizdata.length - 1) {
            questioncounter++;
            displayQuestion(questioncounter);
        }
    }, 100);
});


// prev button
prevbutton.addEventListener("click", () => {
    if (questioncounter > 0) {
        questioncounter--;
        displayQuestion(questioncounter);
    }
});


// when user click on submit button the final result will be shown to user and user can alsoo restart the quix after submitted first one.
submitbutton.addEventListener("click", () => {
    let score = 0;



    quizdata.forEach((question, index) => { // check the the correct answer and then increase the score 
        if (useroption[index] === question.correct) {
            score++;
        }
    });

// after click on submit the question and optioncontainer(options) are  blank
question.textContent=""; 
    optionsContainer.textContent = "";

    // here we create the div , inside the div we create 1 (h1) element and 1 Restartbutton . we coonect the h1 tag and button to div by using .appendchild below.
    const resultcontainer = document.createElement("div");
    resultcontainer.classList.add("resultcontainer")
    const resultpara = document.createElement("h1");
    resultpara.textContent = `Your Quiz Score is ${score} Out of 5!`;
    resultpara.style.fontWeight = "3rem";



    const restartbutton = document.createElement("button");
    restartbutton.textContent = "Re-Start Quiz";
    restartbutton.classList.add("btn")
    restartbutton.addEventListener("click", () => {
        // after clicking restart button the questionCounter and useroption also intialize to deflt(0).
        questioncounter = 0;
        useroption = [];
        displayQuestion(questioncounter);
        prevbutton.hidden=false;
        nextbutton.hidden=false;
    });


resultcontainer.appendChild(resultpara)
resultcontainer.appendChild(restartbutton)
optionsContainer.appendChild(resultcontainer);

nextbutton.hidden=true;
prevbutton.hidden=true;
    submitbutton.hidden=true;
   
});