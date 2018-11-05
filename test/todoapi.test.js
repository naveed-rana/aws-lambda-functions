var chai = require('chai');
const fetch = require('isomorphic-fetch');
const should = chai.should();

const headers = {
  "Access-Control-Allow-Origin" : "*",
}

// describe('/POST todo', () => {
//   it('it should Login, and check token', (done) => {

//     fetch('https://e7evvqbpp4.execute-api.us-east-1.amazonaws.com/dev/todo/api/v1.0/tasks', {
//       headers: headers,
//       method: 'POST',
//       body: JSON.stringify({title:'some',
//                             description:'some desc',
//                             done:false,
//                             createat:'23-oct',
//                             id:'2341213234'
//     })
//     }).then(function(res) {
//       return res.json()
//     }).then(function(data) {

//       console.log('====================================');
//       console.log(data);
//       console.log('====================================');
//       done();
//     })

//   })
// })

describe('/get todos', () => {
  it('it should get todos, and check token', (done) => {
    fetch('https://e7evvqbpp4.execute-api.us-east-1.amazonaws.com/dev/todo/api/v1.0/tasks', {
      headers: headers,
      method: 'GET'
    }).then(function(res) {
      res.should.have.status(200);
      return res.json()
    }).then(function(data) {
      
      data.should.be.a('array');
      data[0].should.have.property('title');
      data[0].should.have.property('description');
      data[0].should.have.property('id');
      data[0].should.have.property('createat');
      data[0].should.have.property('done');
      done();
    })

  })
})











