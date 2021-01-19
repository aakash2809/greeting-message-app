const chai = require('chai');
const server = require('../server');
const chaiHttp = require('chai-http');
const sampleGreeting = require('../testGreetings.json');
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
         chai.request(server)
        .post('/addGreeting')
        .send(sampleGreeting.greetings[0])
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
            const greetingDetails = {
                name: "Preeti",
                message: "Hello"
            };
            chai.request(server)
            .put('/updateGreeting/6005efb8cacac71300359cc2')
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
        chai.request(server)
        .delete('/greeting/6005e8f5e95d4213101c4610')
        .end((error,response)=>{ 
            response.should.have.status(200);
            
           done();
        })
    })

})
});