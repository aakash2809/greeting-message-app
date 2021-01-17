let chai = require('chai');
let server = require('../server');
const chaiHttp = require('chai-http');

chai.should();

chai.use(chaiHttp);

describe('Test API', () => {
  
    /**
    * Test the GET route
    */
   describe('GET /allGreetings',()=>{
    it('It should GET all greeting', (done)=>{
        chai.request(server)
        .get('/allGreetings')
        .end((error,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('Object');
            done();
        })
    })
    it('It should should not GET all greetings', (done)=>{
        chai.request(server)
        .get('/all')
        .end((error,response)=>{
            response.should.have.status(404);
            done();
        })
    })
   })

  /**
     * Test the POST route
    */
   describe('POST /addGreeting',()=>{
    it('It should POST new Greeting', (done)=>{
        const greetingDetails = {
            name: "Rajkumar",
            message: "Hello"
        };
        chai.request(server)
        .post('/addGreeting')
        .send(greetingDetails)
        .end((error,response)=>{ 
            response.should.have.status(200);
            response.body.should.be.a('Object');
           done();
        })
    })
})

    /**
    * Test the PUT route
     */
    describe('PUT /updateGreeting/:greetingId',()=>{
        it('It should update the task', (done)=>{
            const greetingId = '60045735cd3728136899f043';
            const greetingDetails = {
                name: "Priya",
                message: "Hello"
            };
            chai.request(server)
            .put('/updateGreeting/:greetingId' + greetingId)
            .send(greetingDetails)
            .end((error,response)=>{ 
                response.should.have.status(200);
                response.body.should.be.a('Object');
               done();
            })
        })
    })
    /**
    * Test the DELETE route
   */
  describe('DELETE /greeting/:greetingId',()=>{
    it('It should delete an existing greeting', (done)=>{
        const greetingId = '60045735cd3728136899f043';
        chai.request(server)
        .delete('/greeting/:greetingId' + greetingId)
        .end((error,response)=>{ 
            response.should.have.status(200);
           done();
        })
    })
    it('It should delete an existing greeting', (done)=>{
        const greetingId = '60045735cd3728136899';
        chai.request(server)
        .delete('/greeting/:greetingId' + greetingId)
        .end((error,response)=>{ 
            response.should.have.status(404);
           done();
        })
    })
})
});