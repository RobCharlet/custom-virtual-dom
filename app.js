let name = ""
let posts = ["Gingerbread", "Chocolate", "Vanilla"]
let vDOM = createVDOM()
let prevVDOM
let elems
let isDirty = false
let isUpdateScheduled = false

// UI Components example
function Post(content) {
  return ["div", content, { padding: "10px", margin: "10px", borderRadius: "4px" }, null]
}

function createVDOM() {
  return [
    ["input", name, { padding: "10px", margin: "10px", borderRadius: "4px" }, handle],
    ["div", `Hello ${name}`, { color: "blue", fontSize: "20px" }],
    ["div", "Great job!", { color: "green", fontWeight: "bold" }],
    // UI Components example
    ...posts.map(Post)
  ]
}

function handle(event) {
  name = event.target.value
  markDirty()
}

function markDirty() {
  isDirty = true
  scheduleUpdate()
}

function scheduleUpdate() {
  if (!isUpdateScheduled) {
    // Prevent multiple updates
    isUpdateScheduled = true
    // Synchronized with the browser's refresh rate
    requestAnimationFrame(updateDOM)
  }
}

function updateDOM() {
  isUpdateScheduled = false
  
  if (!isDirty) return
  
  if (elems == null) {
    elems = vDOM.map(convert)
    document.body.append(...elems)
  }
  else {
    prevVDOM = [...vDOM]
    vDOM = createVDOM()
    findDiff(prevVDOM, vDOM)
  }
  
  isDirty = false
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

function compareNodes(node1, node2) {
  // Compare tag
  if (node1[0] !== node2[0]) return false
  
  // Compare content
  if (node1[1] !== node2[1]) return false
  
  // Compare styles
  const styles1 = node1[2]
  const styles2 = node2[2]
  
  if (Object.keys(styles1).length !== Object.keys(styles2).length) return false
  
  for (const key in styles1) {
    if (styles1[key] !== styles2[key]) return false
  }
  
  // Compare handler (if exists)
  if (node1[3] !== node2[3]) return false
  
  return true
}

function findDiff(prev, current) {
  for (let i = 0; i < current.length; i++) {
    if (!compareNodes(prev[i], current[i])) {
      elems[i].textContent = current[i][1]
      elems[i].value = current[i][1]
      Object.assign(elems[i].style, current[i][2])
    }
  }
}

// Initial render
markDirty()
