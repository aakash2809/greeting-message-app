let chai = require('chai');
let server = require('../server');
let chaiHttp = require('chai-http');

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
            console.log(response.body);
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

    /**
    * Test the DELETE route
   */

});