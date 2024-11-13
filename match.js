window.onload = function() {
    loadCards()
    displayScores()
    let cardSelectors = document.querySelectorAll(".card") //https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
    cardSelectors.forEach(card => card.addEventListener("click", revealCard))
}

let scores = JSON.parse(localStorage.getItem("scores")) || []
let clicks = 0
let firstCard = null
let secondCard = null
let lockBoard = false
let matchedPairs = 0
var totalPairs = 8
var cards = ["cards/bonnie.png", "cards/chica.png", "cards/foxy.png", "cards/freddy.png", "cards/golden.png", "cards/matpat.png", "cards/scott.png", "cards/springtrap.png"]

function reset() {
   location.reload()
}

function shuffleCards() {
    let duplicatedCards = [...cards, ...cards]
    duplicatedCards.sort(() => Math.random() - 0.5) //https://www.w3schools.com/js/js_array_sort.asp

    for (let i = 1; i <= 16; i++) {
        let card = document.getElementById(i.toString())
        card.dataset.image = duplicatedCards[i - 1]
    }
}


function loadCards() {
    shuffleCards()
    for (let i = 1; i <= 16; i++) {
        let card = document.getElementById(i.toString())
        let frontImage = card.querySelector(".front")
        let backImage = card.querySelector(".back")

        frontImage.src = "cards/hiddencard.jpg"
        backImage.src = card.dataset.image
        backImage.style.display = "none"
    }
}


function revealCard(event) {
    if (lockBoard) return
    let clickedCard = event.currentTarget
    if (clickedCard === firstCard) return

    let frontImage = clickedCard.querySelector(".front")
    let backImage = clickedCard.querySelector(".back")
    frontImage.style.display = "none"
    backImage.style.display = "block"

    if (!firstCard) {
        firstCard = clickedCard
    } else {
        secondCard = clickedCard
        lockBoard = true
        addScore()
        check()
    }
}


function check() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image

    if (isMatch) {
        firstCard.removeEventListener("click", revealCard)
        secondCard.removeEventListener("click", revealCard)
        resetCards()
        matchedPairs++
        if (matchedPairs === totalPairs) {
            endGame() 
        }
        resetCards()
    } else {
        setTimeout(() => {
            firstCard.querySelector(".front").style.display = "block"
            firstCard.querySelector(".back").style.display = "none"
            secondCard.querySelector(".front").style.display = "block"
            secondCard.querySelector(".back").style.display = "none"
            resetCards()
        }, 1000)
    }
}


function resetCards() {
    firstCard = null
    secondCard = null
    lockBoard = false
}


function addScore() {
    clicks++
    document.getElementById("current-score").innerHTML = "Score: " + clicks
}

function displayScores() {
    if (scores.length > 0) {
        let bestScore = Math.min(...scores)
        document.getElementById("highest-score").innerHTML = "Highest Score: " + bestScore
        document.getElementById("previous-scores").innerHTML = "Past Scores: " + scores.join(", ")
    } else {
        document.getElementById("highest-score").innerHTML = "Highest Score: "
        document.getElementById("previous-scores").innerHTML = "Past Scores: "
    }
}

function endGame() {
    scores.push(clicks)
    localStorage.setItem("scores", JSON.stringify(scores))
    displayScores()
}