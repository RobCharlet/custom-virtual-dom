let name = ""
let vDOM = createVDOM()
let prevVDOM
let elems

function createVDOM() {
  return [
    ["input", name, { padding: "10px", margin: "10px", borderRadius: "4px" }, handle],
    ["div", `Hello ${name}`, { color: "blue", fontSize: "20px" }],
    ["div", "Great job!", { color: "green", fontWeight: "bold" }]
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
  element.textContent = node[1]

  const styles = node[2]
  Object.assign(element.style, styles)
  
  if (node[3]) {
    element.oninput = node[3]
  }
  
  return element
}

function findDiff(prev, current) {
  for (let i = 0; i < current.length; i++) {
    if (JSON.stringify(prev[i]) !== JSON.stringify(current[i])) {
      elems[i].textContent = current[i][1]
      elems[i].value = current[i][1]
      Object.assign(elems[i].style, current[i][2])
    }
  }
}

setInterval(updateDOM, 15)
