fetch('http://localhost:3000/api/chat', { 
  method: 'POST', 
  headers: {'Content-Type': 'application/json'}, 
  body: JSON.stringify({messages: [{role: 'user', content: 'hi'}]}) 
})
.then(async r => {
  console.log('STATUS:', r.status);
  console.log('TEXT:', await r.text());
})
.catch(console.error);
