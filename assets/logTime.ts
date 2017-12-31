const header = document.querySelector('header')

const logRoot = document.createElement('DIV')
logRoot.classList.add('log-time')

const logTime = (timeUsed: number | string): void => {
  logRoot.innerHTML = `Time useed: approx. ${timeUsed}s`
  header.appendChild(logRoot)
}

export default logTime
