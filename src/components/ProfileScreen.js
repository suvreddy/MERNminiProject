import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

const ProfileScreen = () => {

    const [profileData, setProfileData] = useState({})

    useEffect(async () => {

        let data = localStorage.getItem('user')
        setProfileData(JSON.parse(data))
    }, [])
    return (
        <React.Fragment>
            <div style={{ backgroundColor: "black", height: "100vh" }}>
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }} className='text-center text-light'>
                            <h1 className='text-center text-light'>
                                Your Profile
                            </h1>
                        </Col>
                    </Row>
                </Container>

                <Container>

                    <Row>
                        <Col md={{ span: 6, offset: 3 }} style={{ backgroundColor: 'white', borderRadius: 5 }} className='mt-3'>
                            <Table striped bordered hover className='mt-3'>
                                <tbody>
                                <tr>
                                    <th><h3>Name:</h3></th>
                                    <td><p style={{ fontSize: 20 }}>{profileData.name}</p></td>
                                </tr>
                                <tr>
                                    <th><h3>Email:</h3></th>
                                    <td><p style={{ fontSize: 20 }}>{profileData.email}</p></td>
                                </tr>
                                <tr>
                                    <th><h3>Gender:</h3></th>
                                    <td><p style={{ fontSize: 20 }}>{profileData.gender}</p></td>
                                </tr>
                                <tr>
                                    <th><h3>Date of Birth:</h3></th>
                                    <td><p style={{ fontSize: 20 }}>{profileData.dob}</p></td>
                                </tr>
                                <tr>
                                    <th><h3>Skills:</h3></th>
                                    <td><p style={{ fontSize: 20 }}>{profileData.skills}</p></td>
                                </tr>
                                </tbody>
                                
                            </Table>
                        </Col>
                    </Row>

                </Container>

            </div>

        </React.Fragment>
    )
}

export default ProfileScreen