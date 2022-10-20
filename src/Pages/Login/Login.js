import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import {
  LoginSignupBox,
  LogSignPageDiv,
  LogoTitleDiv,
  HideCol,
  ErrorSpan,
  InputStyled,
  BackgroundColourLayer,
  StyledButton,
  Button,
} from "./StyledLogin";
import l2 from '../Images/l2.png'
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Input, Form, Label } from "@bootstrap-styled/v4";
import {getBaseUrl} from "../../utils";


const Imagel1 = styled.img`
  width: 21%;
  vertical-align: top;
  -webkit-filter: invert(100%);
  filter: invert(100%);
  opacity:0.7;
  filter: drop-shadow(2px 4px 6px black);
  margin-bottom:20px;
`


function Login() {
  const { register, handleSubmit, control, watch, errors } = useForm();
  useEffect(() => {
    document.body.style.backgroundColor = "#333333";
    return () => (document.body.style.backgroundColor = "#FFF");
  }, []);
  const [loginError, setError] = useState();
  const onSubmit = (data) => {
    fetch(getBaseUrl() + "api-token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        // console.log(res);
        if (res.ok) {
          res.json().then((res) => {
            // console.log(res);
            if (res.token) {
              localStorage.setItem("token", res.token);
              window.location.replace("/user");
            }
          });
        } else {
          setError("Invalid Username or Password !!");
        }
      })
      .catch((err) => {
        console.log("Network error");
      });
  };
  return (
    <LogSignPageDiv>
      <BackgroundColourLayer>
      <Row>
        <Col>
            <h1 style={{color: "white", marginTop: "80px"}}>Login In Your Account !</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <ErrorSpan>{errors.username && "Username field is required!"}</ErrorSpan>
              <br />
              <Controller
                as={<InputStyled/>}
                name="username"
                type="text"
                placeholder="Enter your Username"
                control={control}
                rules={{ required: true }}
              />
              <br />
              <ErrorSpan>{errors.password && "Password is required!"}</ErrorSpan>
              <br/>
              <Controller
                as={<InputStyled/>}
                name="password"
                type="password"
                placeholder="Enter the password"
                control={control}
                rules={{ required: true }}
              />
              <br />
              <StyledButton type="submit" value="submit">
                Login
              </StyledButton>
              <br /> <br />
              <ErrorSpan> {loginError}</ErrorSpan>
            </Form>
        </Col>
        <Col>
        <h1 style={{color: "white", marginTop: "80px"}}>
          Decision Support System
        </h1>
        {/* <br/> */}
        <Imagel1 src={l2}></Imagel1>
        <br/>
        <h4 style={{color: "white", opacity: "0.7", margin: "17px 0px"}}>
          Don't have an account already? Register with us to simplify the process!
        </h4>
        <Button href="/signup">
          Sign up
        </Button>
        </Col>
      </Row>
      </BackgroundColourLayer>
    </LogSignPageDiv>
  );
}

export default Login;
