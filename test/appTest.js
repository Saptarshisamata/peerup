const chai = require('chai')
const chai_http = require('chai-http')

const app = require('../src/app')

chai.should()
chai.use(chai_http)


describe("peer-up api testing",()=>{
	after(()=>{
		// process.kill(process.pid, 'SIGTERM')
		console.log("test completed ctrl-c to close the server")
	})
	describe("sign up api testing",()=>{
		
		it("should sign in successfully and status 200",(done)=>{
			chai.request(app)
				.post('/auth/login')
				.send({
					"email":"ss@223.com",
					"password":"12345678"
				})
				.end((err,response) => {
					if(err) done(err)
					else{
						response.should.have.status(200)
						response.body.should.have.property('token')
						done()
					}
				})
		})

		it("should not sign up successfully and status 400",(done)=>{
			chai.request(app)
				.post('/auth/signup')
				.send({
					"email":"ss@221.com",
					"username":"sapta",
					"password":"12345678",
					"goal" :1,
					"exp":1
				})
				.end((err,response) => {
					if(err) done(err)
					else{
						response.should.have.status(400)
						response.body.message.should.equal('user_already_exist')
						done()
					}
				})
		})
		it("should not sign in successfully and status 404 user not found",(done)=>{
			chai.request(app)
				.post('/auth/login')
				.send({
					"email":"wrong@2236.com",
					"password":"12345678"
				})
				.end((err,response) => {
					if(err) done(err)
					else{
						response.should.have.status(404)
						response.body.message.should.equal("user not found")
						done()
					}
				})
		})

		it("should not sign in successfully and status 401 invalid password",(done)=>{
			chai.request(app)
				.post('/auth/login')
				.send({
					"email":"ss@223.com",
					"password":"wrong12345678"
				})
				.end((err,response) => {
					if(err) done(err)
					else{
						response.should.have.status(401)
						response.body.message.should.equal("invalid password")
						done()
					}
				})
		})

	})
})