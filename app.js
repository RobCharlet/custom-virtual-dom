let name = ""
let vDOM = createVDOM()
let prevVDOM
let elems

function createVDOM() {
  return [
    ["input", name, handle],
    ["div", `Hello ${name}`],
    ["div", "Great job!"]
  ]
}

function handle(event) {
  name = event.target.value
}

function updateDOM() {
  if (elems == null) {
    elems = vDOM.map(convert)
    document.body.append(...elems)
  }
  else {
    prevVDOM = [...vDOM]
    vDOM = createVDOM()
    findDiff(prevVDOM, vDOM)
  }
}

function convert(node) {
  const element = document.createElement(node[0])
  element.value = node[1]
  element.oninput = node[2]
  return element
}

function findDiff(prev, current) {
  for (let i = 0; i < current.length; i++) {
    if (JSON.stringify(prev[i]) !== JSON.stringify(current[i])) {
      elems[i].textContent = current[i][1]
      elems[i].value = current[i][1]
    }
  }
}

setInterval(updateDOM, 15)
