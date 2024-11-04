window.onload = loadCards

let scores = JSON.parse(localStorage.getItem("scores")) || []
let clicks = 0
var cards = new Array("cards/bonnie.png", "cards/chica.png", "cards/foxy.png", "cards/freddy.png", "cards/golden.png", "cards/matpat.png", "cards/scott.png", "springtrap.png")

function reset() {
    clicks = 0
    document.getElementById("current-score").innerHTML = "Score: " + clicks
}

function shuffleCards() {

}

function loadCards() {
    for (let i = 1; i <= 16; i++) {
        let index = i.toString
        document.getElementById(index).appendChild()
    }
}

function revealCard() {
    
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