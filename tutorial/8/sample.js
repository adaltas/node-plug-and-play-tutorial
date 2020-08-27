const plugandplay = require('../../lib')
// Initialize a parent and register a hook
const parent = plugandplay()
parent.register({
  hooks: {
    'app:test': () => {
      console.log('call parent')
    }
  }
})
// Initialize a child referencing a parent and register a hook
const child = plugandplay({
  parent: parent
})
child.register({
  hooks: {
    'app:test': () => {
      console.log('call child')
    }
  }
})
// Call the hook
child.call({
  event: 'app:test',
  args: {},
  handler: () => {
    console.log('original handler')
  }
})

// 
// plugs = plugins()
// plugs.register hooks: 'my:hook': -> 1
// plugs.register hooks: 'my:hook': -> 2
// plugs.get event: 'my:hook'
