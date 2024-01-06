let chai = require('chai');
let chaiHttp = require('chai-http')
let server = require('../index');

//chai.should();
const should = chai.should();

chai.use(chaiHttp);

describe('Test API', () => {

    describe('GET v1/health-check', () =>{
        it("It should get OK response", (done)=>{
            chai.request(server)
            .get('/v1/health-check')
            .end((err,response)=>{
                // console.log(response);
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.text.should.be.eq('OK');
                done();
            })
        })
    })
})