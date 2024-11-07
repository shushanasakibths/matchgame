window.onload = function() {
    loadCards()
    let cardSelectors = document.querySelectorAll(".card") //https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
    cardSelectors.forEach(card => card.addEventListener("click", revealCard))
}

let scores = JSON.parse(localStorage.getItem("scores")) || []
let clicks = 0
let firstCard = null
let secondCard = null
let lockBoard = false
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

function maxScore() {
    let maxScore = Math.max(parseInt(scores))
    document.getElementById("highest-score").innerHTML = "Highest Score: " + maxScore
}