const startBtn = document.querySelector('#start')
const restartBtn = document.querySelector('#restart')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const scoreTitle = document.querySelector('.score')
const garden = document.querySelectorAll('.garden')
const cnt = document.querySelectorAll('.cnt')
const audio = new Audio('/assets/one-punch.mp3')
audio.volume = 0.05

let clickItemId = 0
let time = 0
let score = 0
let timer, createEnemyTimer, removeEnemyTimer = null

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  screens[0].classList.add('up')
})

restartBtn.addEventListener('click', e => {
  e.preventDefault()
  screens[1].classList.remove('up')
  setTimeout(() => {
    scoreTitle.parentNode.classList.add('hide')
    cnt.forEach(item => item.className = 'cnt')
    score = 0
    timeEl.parentNode.classList.remove('hide')
  }, 0);
})

timeList.addEventListener('click', e => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

garden.forEach(garden => {
  garden.addEventListener('click', e => {
    if (e.target.parentNode.className === 'cnt kill') {
      e.stopPropagation()
      audio.play()
      removeMole(e.target.id)
      createMole()
      if (clickItemId === e.target.id) {
        score--
      }
      console.log(score)
      score++
      clickItemId = e.target.id
    }
  })
})
function startGame() {
  decreaseTime()
  timer = setInterval(decreaseTime, 1000)
  createMole()
  // createEnemyTimer = setInterval(createGarden, getRandomNumber(5500, 7500))
  // removeEnemyTimer = setInterval(removePlayer, 5500)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    let seconds, minutes
    minutes = `0${Math.floor(current / 60)}`
    seconds = `${Math.round(current % 60)}`
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    setTime(minutes, seconds)
  }
}

function setTime(minutes, seconds) {
  timeEl.innerHTML = `${minutes}:${seconds}`
  timeEl.parentNode.classList.remove('hide')
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  scoreTitle.innerHTML = `
  <span class="primary">Счёт: </span>${score}
  `
  scoreTitle.parentNode.classList.remove('hide')

  clearInterval(timer)
  // clearInterval(createEnemyTimer)
  // clearInterval(removeEnemyTimer)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function createMole() {
  clickItemId = 0
  const index = getRandomNumber(0, garden.length - 1)
  cnt[index].classList.add('kill')
}

function removeMole(value) {
  cnt[value].classList.remove('kill')
}
