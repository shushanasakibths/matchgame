window.onload = function() {
    loadCards()
    let cardSelectors = document.querySelectorAll(".card")
    cardSelectors.forEach(
        card => card.addEventListener("click", revealCard)
    )
}

let scores = JSON.parse(localStorage.getItem("scores")) || []
let clicks = 0
let firstCard = null
let secondCard = null
let lockBoard = false
var cards = ["cards/bonnie.png", "cards/chica.png", "cards/foxy.png", "cards/freddy.png", "cards/golden.png", "cards/matpat.png", "cards/scott.png", "springtrap.png"]

function reset() {
    location.reload()
}

function shuffleCards() {
    
}

function loadCards() {
    shuffleCards()
    for (let i = 1; i <= 16; i++) {
        
    }
}

function revealCard(event) {
    
}

function check() {

}

function resetCards() {
    
}

function addScore() {
    clicks++
    revealCard()
    document.getElementById("current-score").innerHTML = "Score: " + clicks
}

function maxScore() {
    let maxScore = Math.max(parseInt(scores))
    document.getElementById("highest-score").innerHTML = "Highest Score: " + maxScore
}