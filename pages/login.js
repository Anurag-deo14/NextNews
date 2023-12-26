// Login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    setError(null);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('User logged in successfully');
        router.push('/logged_in');
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);
        setError(error.message);
      });

    event.preventDefault();
  };

  return (
    <Container style={{ textAlign: 'center', margin: '50px auto' }}>
      <Row>
        <Col>
          <Form style={formStyle} onSubmit={onSubmit}>
            <h2 style={{ color: '#333' }}>Login</h2>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup row>
              <Label for="loginEmail" sm={4} style={labelStyle}>
                Email
              </Label>
              <Col sm={8}>
                <Input
                  style={inputStyle}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="loginEmail"
                  placeholder="Email"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="loginPassword" sm={4} style={labelStyle}>
                Password
              </Label>
              <Col sm={8}>
                <Input
                  style={inputStyle}
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="loginPassword"
                  placeholder="Password"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Button type="submit" style={submitButtonStyle}>
                  Login
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const formStyle = {
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    background: '#fff',
  };
  
  const labelStyle = {
    color: '#555',
    fontWeight: 'bold',
  };
  
  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    boxSizing: 'border-box',
  };
  
  const submitButtonStyle = {
    width: '100%',
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

export default Login;
