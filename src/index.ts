type Message = {
    body: string,
    from: string
  }
   
  let message: Message = {
    from: 'Max',
    body: 'Hi!'
  }
   
  console.log(`New message from ${message.from}: ${message.body}`)