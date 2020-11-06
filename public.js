function testToast() {
  toast('Hi, I\'m Daniela 👋')
}
function testDecide() {
  decide('Did you already drink water today? 🤔')
    .then(answer => toast(answer ? 'Good for you! ✨' : 'Why? 😶'))
}
function testInput() {
  input('Tell me your name 😊')
    .then(name => name && toast(`Hi, ${name}! 🤗`))
}
