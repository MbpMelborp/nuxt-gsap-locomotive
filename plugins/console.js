export function disableLogs() {
  console.log = () => {}
  // or you can override any other stuff you want
}
// eslint-disable-next-line no-unused-expressions
process.env.CONSOLE === 'false' ? disableLogs() : null
