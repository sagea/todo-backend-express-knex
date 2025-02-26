import request from 'supertest';
import app from '../../server.js';


// a helper function to make a POST request.
export function post(url, body, jwt) {
  const httpRequest = request(app).post(url);
  httpRequest.send(body);
  httpRequest.set('Accept', 'application/json')
  httpRequest.set('Origin', 'http://localhost:5000')
  if (jwt) {
    httpRequest.set('Authorization', `Bearer ${jwt}`);
  }
  return httpRequest;
}

// a helper function to make a GET request.
export function get(url) {
  const httpRequest = request(app).get(url);
  httpRequest.set('Accept', 'application/json')
  httpRequest.set('Origin', 'http://localhost:5000')
  return httpRequest;
}

// a helper function to make a PATCH request.
export function patch(url, body) {
  const httpRequest = request(app).patch(url);
  httpRequest.send(body);
  httpRequest.set('Accept', 'application/json')
  httpRequest.set('Origin', 'http://localhost:5000')
  return httpRequest;
}

// a helper function to make a DELETE request.
export function del(url) {
  const httpRequest = request(app).delete(url);
  httpRequest.set('Accept', 'application/json')
  httpRequest.set('Origin', 'http://localhost:5000')
  return httpRequest;
}
