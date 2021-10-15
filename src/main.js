const listOfValues = document.querySelector('ol')
const result = document.querySelector('#result h2')
/*============== Inputs ========================*/
const number = document.querySelector('#number')
const weight = document.querySelector('#weight')
/*============== Buttons ========================*/
const buttonWeight = document.querySelector('#show_weight')
const buttonAddValue = document.querySelector('#add_value')
const buttonCalc = document.querySelector('#calc')
const buttonClean = document.querySelector('#clean')

let numValue = () => Number(number.value)
let weightValue = () => {
  if (Number(weight.value) === 0) {
    return 1
  } else {
    return Number(weight.value)
  }
}

buttonWeight.addEventListener('click', function () {
  if (numValue() !== 0) {
    weight.parentElement.classList.remove('hidden')
    buttonWeight.classList.add('hidden')
  }
})

number.addEventListener('keyup', keyPress)
weight.addEventListener('keyup', keyPress)
buttonAddValue.addEventListener('click', addValue)
buttonCalc.addEventListener('click', calc)
buttonClean.addEventListener('click', clean)

function changeSize(element, size) {
  element.addEventListener('input', function () {
    element.style.width = size(element)
    element.nextElementSibling.style.width = size(element)
  })
}

function addValue() {
  if (numValue() !== 0) {
    let size = e => `${e.value.length * 8 + 16}px`
    let line = document.createElement('li')
    let element = `<input type="number" value="${numValue()}" style="width: ${size(
      number
    )}"/>`
    element += `<input type="number" value="${weightValue()}" style="width: ${size(
      number
    )}"/>`
    line.innerHTML = element
    listOfValues.appendChild(line)
    listOfValues.parentElement.classList.remove('hidden')
    changeSize(line.firstElementChild, size)
  }
}

function calc() {
  let values = listOfValues.children
  let sum = 0
  for (let i = 1; i < values.length; i++) {
    let n = values[i].firstElementChild.value
    let w = values[i].lastElementChild.value
    sum += Number(n) * Number(w)
  }
  result.innerHTML = `A média é ${sum / (values.length - 1)}`
  result.parentElement.classList.remove('hidden')
}

function clean() {
  let titles = '<li><h2>Valores</h2><h2>pesos</h2></li>'
  listOfValues.innerHTML = titles
  listOfValues.parentElement.classList.add('hidden')
  result.parentElement.classList.add('hidden')
}

function keyPress(e) {
  if (e.key === 'Enter') {
    addValue()
  }
}
