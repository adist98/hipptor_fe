import React, {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from "react-router-dom"
export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const displayNameRef = useRef()
    const {signup, currentUser} = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    async function handleSubmit(e) {
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match")
        }
        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, displayNameRef.current.value);
            // we need an api call here to store the username, password and the email. We can do this definitely.
            // once there is a promise from the above signup function, we will use the same user id to store the email and password and other relevant data
            // we need to store the username, password and email with the same id that is there for the new user.
            // I'll just do this this in signup function ... in authcontext file
            history.push("/")
        }catch{
            setError('Failed to create an account')
        }
        setLoading(false);
    }


    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant = "danger">{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type = "email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="displayName">
                        <Form.Label>username</Form.Label>
                        <Form.Control type = "displayName" ref={displayNameRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type = "password" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type = "password" ref={passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit" style = {{marginTop: '15px'}}>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">Already have an account? <Link to="/login">Log In</Link></div>
        </>
    )
}
