import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DatePicker from 'react-date-picker';
import { postAxios } from "../GlobalComponents/RequestAPI";
import x from '../your-logo-here.png'


const RegistrationScreen = (props) => {
    const [name, setName] = useState('')
    const [emailAddress, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDOB] = useState(new Date())
    const [gender, setGender] = useState('')

    let genders = ['male', 'female'];
    let skillSet = [
        {
            name: 'Angular',
            status: false
        },
        {
            name: 'React',
            status: false
        },
        {
            name: 'Node',
            status: false
        },
        {
            name: 'Java',
            status: false
        },
        {
            name: 'Bootstrap',
            status: false
        }
    ];

    function onSelectSkill(skill) {
        for (let i = 0; i < skillSet.length; i++) {
            if (skillSet[i].name === skill.name) {
                skillSet[i].status = !skillSet[i].status
            }
        }
    }

    async function onRegistrationSubmit(e) {
        e.preventDefault();
        console.log(skillSet);
        let tempSkill = []
        tempSkill = skillSet.filter(skillObj => skillObj.status).map(skillObj => skillObj.name)
        console.log(tempSkill);

        console.log(dob.getDate() + '-' + (dob.getMonth() + 1) + '-' + dob.getFullYear())
        let data = {
            name,
            email: emailAddress,
            password,
            dob: (dob.getDate() < 10 ? '0' + dob.getDate() : dob.getDate()) + '-' + (dob.getMonth() + 1 < 10 ? '0' + (dob.getMonth() + 1) : dob.getMonth() + 1) + '-' + dob.getFullYear(),
            gender,
            skills: tempSkill
        }
        let headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // registering Data
        let registerResponse = await postAxios('registerRouter/register', data, headers);

        if (registerResponse.status) {
            props.history.push('/login')
        } else {
            alert(registerResponse.message)
        }
    }

    return (
        <React.Fragment>
            <div style={{ backgroundColor: "black", height: "100%" }}>
                <Container>
                    <Row>
                        <Col md={{ span: 5, offset: 6 }}>
                            <h1 className='text-center text-light'>
                                Register Here
                            </h1>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col md={{ span: 6 }} className='mt-5 text-center'>
                            <img src={x} alt='logo' />
                        </Col>
                        <Col md={{ span: 5 }} style={{ backgroundColor: 'white', borderRadius: 5 }} className='mt-3'>
                            <Form onSubmit={(e) => onRegistrationSubmit(e)} className='mb-3 mt-3'>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label >Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label >Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={emailAddress} onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <Row>
                                    <label className='font-weight-bold'>Date of Birth</label>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <DatePicker onChange={setDOB} value={dob} />
                                    </Col>

                                </Row>

                                <Form.Group className="mb-3" controlId="formBasicGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Row>
                                        {genders.map((gender, i) =>
                                            <Col md={4} key={i}>
                                                <Form.Check
                                                    custom
                                                    name='group1'
                                                    type='radio'
                                                    label={gender}
                                                    id={'radio' + i}
                                                    onChange={() => setGender(gender)}
                                                />
                                            </Col>
                                        )}
                                    </Row>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicSkills">
                                    <Form.Label>Skills</Form.Label>
                                    <Row>
                                        {skillSet.map((skill, ind) =>
                                            <Col md={4} key={ind}>
                                                <Form.Check
                                                    custom
                                                    name={skill.name}
                                                    type='checkbox'
                                                    label={skill.name}
                                                    id={ind}
                                                    onChange={() => onSelectSkill(skill)}
                                                />
                                            </Col>
                                        )}
                                    </Row>
                                </Form.Group>

                                <div className='text-center'>
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

export default RegistrationScreen