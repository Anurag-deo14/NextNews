import { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { auth } from '../firebase';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    setError(null);

    if (passwordOne === passwordTwo) {
      createUserWithEmailAndPassword(auth, email, passwordOne)
        .then((authUser) => {
          console.log('User created successfully:', authUser);
          router.push('/logged_in');
        })
        .catch((error) => {
          console.error('Error creating user:', error.message);
          setError(error.message);
        });
    } else {
      setError('Passwords do not match');
    }

    event.preventDefault();
  };

  return (
    <Container style={{ textAlign: 'center', margin: '50px auto' }}>
      <Row>
        <Col>
          <Form style={formStyle} onSubmit={onSubmit}>
            <h2 style={{ color: '#333' }}>Sign Up</h2>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup row>
              <Label for="signUpEmail" sm={4} style={labelStyle}>
                Email
              </Label>
              <Col sm={8}>
                <Input
                  style={inputStyle}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="signUpEmail"
                  placeholder="Email"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="signUpPassword" sm={4} style={labelStyle}>
                Password
              </Label>
              <Col sm={8}>
                <Input
                  style={inputStyle}
                  type="password"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="signUpPassword"
                  placeholder="Password"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="signUpPassword2" sm={4} style={labelStyle}>
                Confirm Password
              </Label>
              <Col sm={8}>
                <Input
                  style={inputStyle}
                  type="password"
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={(event) => setPasswordTwo(event.target.value)}
                  id="signUpPassword2"
                  placeholder="Password"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Button type="submit" style={submitButtonStyle}>
                  Sign Up
                </Button>
              </Col>
            </FormGroup>
            <p style={{ color: '#555', marginTop: '10px' }}>
              Already have an account?{' '}
              <Link href="/login">
                <a style={{ color: '#007bff' }}>Login here</a>
              </Link>
            </p>
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

export default SignUp;
