let question = document.getElementsByClassName("question")[0];

let optionsContainer = document.querySelector(".qs-option-container");

let nextbutton = document.getElementsByClassName("next")[0];
let prevbutton = document.getElementsByClassName("previuos")[0];
let submitbutton = document.getElementsByClassName("submit")[0];
let showQsNumberOnTop = document.getElementsByClassName("show-qs-number")[0];

let questioncounter = 0;
let useroption = [];

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

function displayQuestion(index) {
    optionsContainer.textContent = "";

    const currentquestion = quizdata[index]
    question.textContent = currentquestion.question;

    //display option

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





// function handleOptionClick(selectedOption, selectedIndex, correctIndex) {
//     // Disable all options
//     document.querySelectorAll(".option").forEach(opt => {
//         opt.style.pointerEvents = "none";
//     });

//     if (selectedIndex === correctIndex) {
//         // Correct answer
//         selectedOption.style.backgroundColor = "green";
//     } else {
//         // Incorrect answer
//         selectedOption.style.backgroundColor = "red";
//         // Highlight the correct option
//         document.querySelectorAll(".option")[correctIndex].style.backgroundColor = "green";
//     }
// }






document.addEventListener("DOMContentLoaded", () => {
    displayQuestion(questioncounter);
});

// next button
// nextbutton.addEventListener("click", () => {
//     if (questioncounter < quizdata.length - 1) {
//         questioncounter++;
//         displayQuestion(questioncounter);
//         if (useroption==options) {
//             alert("okekrerferf")
//         }
//     }


// });

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
    }, 5000);
});



















// prev button
prevbutton.addEventListener("click", () => {
    if (questioncounter > 0) {
        questioncounter--;
        displayQuestion(questioncounter);
    }
});