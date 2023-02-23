const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let quiestionCounter = 0
let availableQuestions = {}

let questions = [
    {
        question: "IRON MAN: What song plays at the beginning of the movie?",
        choice1: "Iron Man by Black Sabbath",
        choice2: "Back In Black by AC/DC",
        choice3: "Ordinary World by Duran Duran",
        choice4: "Stairway to Heaven by Led Zeppelin",
        answer: 2,
    },
    {
        question: "IRON MAN 2: What fake name does Natasha use when she first meets Tony?",
        choice1: "Natalie Rushman",
        choice2: "Natalia Romanoff",
        choice3: "Nicole Rohan",
        choice4: "Naya Rabe",
        answer: 1,
    },
    {
        question: "THE AVENGERS: Natasha remarks to Clint that the Battle of New York is a lot like what?",
        choice1: "Their time in Budapest",
        choice2: "Their time in Prague",
        choice3: "Their time in Istanbul",
        choice4: "Their time in Sokovia",
        answer: 1,
    },
    {
        question: "IRON MAN 3: What is the name of the little boy Tony befriends while stranded?",
        choice1: "Harry",
        choice2: "Henry",
        choice3: "Harley",
        choice4: "Holden",
        answer: 3,
    },
    {
        question: "THOR: THE DARK WORLD: Where do Sif and Volstagg hide the Reality Stone at the end of the movie?",
        choice1: "On Vormir",
        choice2: "In a vault on Asgard",
        choice3: "Inside Sif's sword",
        choice4: "They give it to the Collector",
        answer: 4,
    },
    {
        question: "GUARDIANS OF THE GALAXY: What were the three items Rocket claims he needs in order to escape the prison?",
        choice1: "A security card, a fork, and an ankle monitor",
        choice2: "A security band, a battery, and a prosthetic leg",
        choice3: "A pair of binoculars, a detonator, and a prosthetic leg",
        choice4: "A knife, cable wires, and Peter's mixtape",
        answer: 3,
    },
    {
        question: "ANT-MAN: What animal does Darren Cross unsuccessfully shrink?",
        choice1: "Mouse",
        choice2: "Sheep",
        choice3: "Duck",
        choice4: "Hamster",
        answer: 2,
    },
    {
        question: "CAPTAIN AMERICA: CIVIL WAR: Who ISN'T on Iron Man's team?",
        choice1: "Vision",
        choice2: "Black Panther",
        choice3: "Hawkeye",
        choice4: "Black Widow",
        answer: 3,
    },
    {
        question: "DOCTOR STRANGE: What type of doctor is Stephen Strange?",
        choice1: "Neurosurgeon",
        choice2: "Cardiothoracic Surgeon",
        choice3: "Trauma Surgeon",
        choice4: "Plastic Surgeon",
        answer: 1,
    },
    {
        question: "AVENGERS: INFINITY WAR: What elective class did Thor take on Asgard?",
        choice1: "Learning to speak Groot",
        choice2: "Hammer making",
        choice3: "Learning to fly a space ship",
        choice4: "How to take care of rabbits",
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()