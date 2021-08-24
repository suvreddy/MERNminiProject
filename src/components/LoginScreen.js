import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { postAxios } from "../GlobalComponents/RequestAPI";
import x from '../your-logo-here.png'

const LoginScreen = (props) => {

    const [emailAddress, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function onSubmitForm(e) {
        e.preventDefault();
        console.log(emailAddress, password)
        let headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let data = {
            email: emailAddress,
            password
        }
        let loginResponse = await postAxios('loginRouter/login', data, headers)

        if (loginResponse.status) {
            alert(loginResponse.message)
            localStorage.setItem('user', JSON.stringify(loginResponse.data))
            localStorage.setItem('token', JSON.stringify(loginResponse.token))
            props.history.push('/profile')
        }
        else {
            alert(loginResponse.message)

        }

    }

    return (
        <React.Fragment>
            <div style={{ backgroundColor: "black", height: "100vh" }}>
                <Container>
                    <Row>
                        <Col md={{ span: 4, offset: 7 }}>
                            <h1 className='text-center text-light mt-5'>
                                Login
                            </h1>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col md={{ span: 7 }} className='mt-5 text-center'>
                            <img src={x} alt='logo' width='300px' height='150px' />
                        </Col>
                        <Col md={{ span: 4 }} style={{ backgroundColor: 'white', borderRadius: 5 }} className='mt-3'>
                            <Form onSubmit={(e) => onSubmitForm(e)} className='mb-3 mt-5'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control size="lg" type="email" placeholder="Enter email" value={emailAddress} onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Text className="text-muted text-center">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">

                                    <Form.Control size="lg" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <div className='text-center mb-5'>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>

                            </Form>
                        </Col>
                    </Row>

                </Container>

            </div>

        </React.Fragment>
    )
}

export default LoginScreen