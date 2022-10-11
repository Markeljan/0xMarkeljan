export default function changeCursor(cursorName) {
  document.body.style.cursor = `url(/images/${cursorName}.svg) 32 32, default`;
}
