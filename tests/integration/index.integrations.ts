import { expect } from 'chai';
import request from 'supertest';
import app from '../../app/server';

describe('Index API', () => {
  it('should test the base URL with a success response', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .end((req, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.code).to.be.equal(200);
        expect(res.body.message).to.be.equal('Welcome to Audition app');
        done();
      });
  });
});
