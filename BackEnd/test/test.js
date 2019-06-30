var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'https://unival.es:3000/api';

var server = require( '../server' );

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe('Test: ',()=>{

    var tokenLogin = null;
    before(function(done) {
        chai.request(url).post('/login')
            .send({username:"admin", password: "fa585d89c851dd338a70dcf535aa2a92fee7836dd6aff1226583e88e0996293f16bc009c652826e0fc5c706695a03cddce372f139eff4d13959da6f1f5d3eabe"})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                tokenLogin = res.body.token;
                console.log(tokenLogin);
                done();
            });
    });
    it('Should login in', (done) => {
        chai.request(url).post('/login')
            .send({username:"admin", password: "fa585d89c851dd338a70dcf535aa2a92fee7836dd6aff1226583e88e0996293f16bc009c652826e0fc5c706695a03cddce372f139eff4d13959da6f1f5d3eabe"})
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                //tokenLogin = res.body.message.token;
                done();
            });
    });

    it('Should return the config data', (done) => {
        chai.request(url)
            .get('/config')
            .set('Authorization', tokenLogin)
            .end(function(err, res) {
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
    it('Should return ok (ping)', (done) => {
        chai.request(url).get('/ping')
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
    it('Should return the users', (done) => {
        chai.request(url).get('/user')
            .set('Authorization', tokenLogin)
            .end( function(err,res){
                expect(res.body).to.deep.include({status:'ok'});
                done();
            });
    });
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


