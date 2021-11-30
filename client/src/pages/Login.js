import React, {Component, useState} from "react";
import "./style.css";
import CustomInput from "./components/CustomInput";
import Button from "./components/Button";
import axios from "axios";
// import baseURL from "../../Common/baseUrl";
// import {toast} from "react-toastify";
import { Outlet, Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

export function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password, setPassword]  = useState(null);
    const  handleChangeMail = e => {
        setEmail(e.currentTarget.value)
    };
    const  handleChangePassword = e => {
        setPassword(e.currentTarget.value)
    };
    const handleClick = async () => {
        try {


            const response = await fetch("http://localhost:3001/api/userLogin", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.

                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                }) // body data type must match "Content-Type" header
            });
            console.log(response.status);
            if (response.status === 200) {
                const {user, token} = response.data;
                console.log(user,token);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                console.log("test");
                <Link to="/home"/>
                navigate("/home");
                // setUser(JSON.stringify(buyer))
                // console.log("User context : ", user)
            }
        }catch(e){
            console.log(e.message)

        }

    };


    return (
        <div className="App">
            <form className="form">
                <CustomInput
                    labelText="Email"
                    id="email"
                    formControlProps={{
                        fullWidth: true
                    }}
                    handleChange={handleChangeMail}
                    type="text"
                />
                <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                        fullWidth: true
                    }}
                    handleChange={handleChangePassword}
                    type="password"
                />

                <Button type="button" color="primary" className="form__custom-button" onClick={handleClick}>
                    Log in
                </Button>
            </form>
        </div>
    );


}