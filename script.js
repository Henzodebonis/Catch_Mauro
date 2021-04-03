const screens = document.querySelectorAll('.screen')
const chooseMauro = document.querySelectorAll('.choose-mauro-btn')
const startBtn = document.getElementById('start-btn')
const gameContainer = document.getElementById('game-container')
const time = document.getElementById('time')
const score = document.getElementById('score')
const message = document.getElementById('message')
var seconds = 0
var points = 0
var selectedMauro = {}

startBtn.addEventListener('click', () => screens[0].classList.add('up'))

chooseMauro.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selectedMauro = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createMauro, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    time.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createMauro() {
    const mauro = document.createElement('div')
    mauro.classList.add('mauro')
    const { x, y } = getRandomLocation()
    mauro.style.top = `${y}px`
    mauro.style.left = `${x}px`
    mauro.innerHTML = `<img src="${selectedMauro.src}" alt="${selectedMauro.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    mauro.addEventListener('click', catchMauro)

    gameContainer.appendChild(mauro)

}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100

    return { x, y }
}

function catchMauro() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addMauros()
}

function addMauros() {
    setTimeout(createMauro, 1000)
    setTimeout(createMauro, 1200)
}


function increaseScore() {
    points++
    if (points > 14) {
        message.classList.add('visible')
    }

    score.innerHTML = `Score: ${points}`
}