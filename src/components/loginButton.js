import React from "react";
import { Container, Col, Row, Button } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    
    return (
        <Container>
            <Row>
                <Col>
                    <h1>You're not logged-in</h1>
                    <Button onClick={() => loginWithRedirect()}>Log In</Button>
                </Col>
            </Row>
        </Container>
        )
    };
    
    export default LoginButton;