var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000/api';

var server = require( '../server' );

var tokenLogin;

describe('Login: ',()=>{
    it('Should login in', (done) => {
        chai.request(url).post('/login')
                .send({username:"admin", password: "fa585d89c851dd338a70dcf535aa2a92fee7836dd6aff1226583e88e0996293f16bc009c652826e0fc5c706695a03cddce372f139eff4d13959da6f1f5d3eabe"})
                .end( function(err,res){
                    expect(res.message).to.deep.include({status:'ok'});
                    tokenLogin = res.message.token;
                    done();
                });
    });
});

describe('Ping: ',()=>{
    it('Should return ok', (done) => {
        chai.request(url).get('/ping')
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});

describe('Config: ',()=>{
    it('Should return the config data', (done) => {
        chai.request(url).get('/config')
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});

describe('Users: ',()=>{
    it('Should return the users', (done) => {
        chai.request(url).get('/user')
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});


//region duplicates
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});
describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});

//endregion

describe('Get CPU: ',()=>{
    it('Should return cpu data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/cpu')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});

describe('Get Memory: ',()=>{
    it('Should return memory data', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/mem')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});

describe('Get Networking: ',()=>{
    it('Should return networking', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).post('/look/network')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});


describe('Get login users: ',()=>{
    it('Should return users', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).get('/look/usersLogin')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});

describe('Get disk: ',()=>{
    it('Should return disk', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).get('/look/disk')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});


describe('Get uptime: ',()=>{
    it('Should return uptime', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).get('/look/uptime')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});

describe('Get status: ',()=>{
    it('Should return status', (done) => {
        var d = new Date();
        d.setDate(d.getDate()-3);
        chai.request(url).get('/look/uptime')
            .set('Authorization', tokenLogin)
            .send({dateStart: d})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});

describe('Run command: ',()=>{
    it('Should Run a command', (done) => {
        chai.request(url).post('/run/scripts/launch')
            .send({command: "ls -l"})
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});

/*
describe('Run command: ',()=>{
    it('Should Run a command', (done) => {
        chai.request(url).post('/run/scripts/launch')
            .send({command: "ls -l"})
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});


describe('Run command: ',()=>{
    it('Should Run a command', (done) => {
        chai.request(url).post('/run/scripts/launch')
            .send({command: "ls -l"})
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});


describe('Run command: ',()=>{
    it('Should Run a command', (done) => {
        chai.request(url).post('/run/scripts/launch')
            .send({command: "ls -l"})
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});


describe('Run command: ',()=>{
    it('Should Run a command', (done) => {
        chai.request(url).post('/run/scripts/launch')
            .send({command: "ls -l"})
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});


describe('Run command: ',()=>{
    it('Should Run a command', (done) => {
        chai.request(url).post('/run/scripts/launch')
            .send({command: "ls -l"})
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});


describe('Run command: ',()=>{
    it('Should Run a command', (done) => {
        chai.request(url).post('/run/scripts/launch')
            .send({command: "ls -l"})
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});


describe('Run command: ',()=>{
    it('Should Run a command', (done) => {
        chai.request(url).post('/run/scripts/launch')
            .send({command: "ls -l"})
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});


describe('Run command: ',()=>{
    it('Should Run a command', (done) => {
        chai.request(url).post('/run/scripts/launch')
            .send({command: "ls -l"})
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});


describe('Run command: ',()=>{
    it('Should Run a command', (done) => {
        chai.request(url).post('/run/scripts/launch')
            .send({command: "ls -l"})
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
});



*/
