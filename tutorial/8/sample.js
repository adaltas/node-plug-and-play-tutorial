const plugable = require('../../lib')
// Initialize a parent and register a hook
const parent = plugable()
parent.register({
  hooks: {
    'app:test': () => {
      console.log('call parent')
    }
  }
})
// Initialize a child referencing a parent and register a hook
const child = plugable({
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
child.hook({
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
