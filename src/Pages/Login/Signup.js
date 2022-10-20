import React, { useEffect, useState } from "react";
import {getBaseUrl} from "../../utils";

import Label from "@bootstrap-styled/v4/lib/Label";
import 'react-phone-number-input/style.css'
import moment from "moment";
import {
  LoginSignupBox,
  LogSignPageDiv,
  LogoTitleDiv,
  ErrorSpan,
  SpacedLabel,
  HideCol,
  BackgroundColourLayer,
  StyledButton,
  Button,
} from "./StyledLogin";
import PhoneInput from 'react-phone-number-input'
import l3 from '../Images/l3.png'
import styled from 'styled-components'
import {
  Row,
  Col,
  Input,
  Form,
} from "@bootstrap-styled/v4";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Terms from './Terms';
import { CircleLoader } from "react-spinners";

const Imagel1 = styled.img`
  width: 18%;
  vertical-align: top;
  -webkit-filter: invert(100%);
  filter: invert(100%);
  opacity:0.7;
  filter: drop-shadow(2px 4px 6px black);
  margin-bottom:20px;
`


function Signup() {
  const { register, handleSubmit, reset, watch, errors, control } = useForm();
  const [disList, setDisList] = useState();

  useEffect(() => {
    fetch(getBaseUrl() + "getDistrictNames/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDisList({ data });
      });
    document.body.style.backgroundColor = "#333333";
    return () => (document.body.style.backgroundColor = "#FFF");
  }, []);

  const onSubmit = (data) => {
    data['dob'] = data['dob'].split('-').reverse().join('-');
    data['mobileNumber']= data['mobileNumber'].substring(1);
    
    console.log(data);
    if(data['mobileNumber'].length!=12){
      alert("please Enter a valid Mobile Number");
      return 0;
    }

    fetch(getBaseUrl() + "register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.text().then((res) => {
          if (res.ok) {
            localStorage.removeItem("token");
            window.location.replace("/login");
          } else {
            alert(res);
          }
        });
      })
      .catch((err) => {
        console.log("Nework Error");
      });
    var dataAuthentication = {};
    dataAuthentication['username'] = data['username']
    dataAuthentication['password'] = data['password']
    fetch(getBaseUrl() + "api-token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataAuthentication),
    }).then((res) => {
      res.json().then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          window.location.replace("/user");
        }
      });
    })
  };

  if (disList === undefined) {
    return <p>Waiting</p>;
  }

  const dist_options = disList.data.map((val) => {
    var opt = { value: val[0], label: val[1] };
    return opt;
  });

  return (
    <LogSignPageDiv style={{height: "100%"}}>
      <BackgroundColourLayer style={{height: "100%"}}>
      <Row>
        <Col>
          <h1 style={{color: "white", marginTop: "150px"}}>Decision Support System</h1>
          <Imagel1 src={l3}></Imagel1>
          <h4 style={{color: "white", marginTop: "20px"}}>Already have an account with us? Click on this button to sign in to your account!</h4>
          <Button href="/login">LogIn</Button>
        </Col>
        <Col>
        <h1 style={{color: "white"}}>Create Your Account!</h1>
          <LoginSignupBox style={{textAlign: "center"}}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col>
                  <SpacedLabel>First Name</SpacedLabel> &nbsp;
                  {errors.first_name && <ErrorSpan>Required</ErrorSpan>} <br />
                  <Controller
                    as={<Input />}
                    name="first_name"
                    type="text"
                    control={control}
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <SpacedLabel>Last Name</SpacedLabel> &nbsp; <br />
                  <Controller
                    as={<Input />}
                    name="last_name"
                    type="text"
                    control={control}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={3}>
                  <SpacedLabel>Sex</SpacedLabel> &nbsp;
                  {errors.sex && <ErrorSpan>Required</ErrorSpan>} <br />
                  <Controller
                    as={
                      <Select
                        options={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                          { value: "other", label: "Other" },
                        ]}
                      />
                    }
                    name="sex"
                    type="select"
                    control={control}
                    rules={{ required: true }}
                  />
                </Col>
                <Col lg={3}>
                  <SpacedLabel>DOB</SpacedLabel> &nbsp;
                  {errors.dob && <ErrorSpan>Required</ErrorSpan>} <br />
                  <Controller
                    as={<Input />}
                    name="dob"
                    type="date"
                    max={moment().format("YYYY-MM-DD")}
                    control={control}
                    rules={{ required: true }}
                  />
                </Col>
                <Col lg={6}>
                  <SpacedLabel>Email ID</SpacedLabel> &nbsp;
                  {errors.email && <ErrorSpan>Required</ErrorSpan>} <br />
                  <Controller
                    as={<Input />}
                    name="email"
                    type="email"
                    control={control}
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <SpacedLabel>Rank</SpacedLabel> &nbsp; <br />
                  <Controller
                    as={<Input />}
                    name="rank"
                    type="text"
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
                <Col>
                  <SpacedLabel>Batch</SpacedLabel> &nbsp; <br />
                  <Controller
                    as={<Input />}
                    name="batch"
                    type="number"
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
                <Col lg={6}>
                  <SpacedLabel>District</SpacedLabel> &nbsp;
                  {errors.district && <ErrorSpan>Required</ErrorSpan>} <br />
                  <Controller
                    as={
                      <Select
                        options={dist_options}
                        isMulti={true}
                      />
                    }
                    name="district"
                    type="select"
                    control={control}
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
              <SpacedLabel>Username</SpacedLabel> &nbsp;
              {errors.username && <ErrorSpan>Enter your username</ErrorSpan>} <br />
              <Controller
                as={<Input />}
                name="username"
                type="text"
                control={control}
                rules={{ required: true }}
              />
              </Col>
              <Col>
              <SpacedLabel>Password</SpacedLabel> &nbsp;{" "}
              {errors.password && <ErrorSpan>Enter your password</ErrorSpan>} <br />
              <Controller
                as={<Input />}
                name="password"
                type="password"
                control={control}
                rules={{ required: true }}
              />
              </Col>
              </Row>
              <div style={
                {
                  justifyContent:'space-between',
                  display:'flex',
                  paddingLeft:'20px',
                  alignItems:'center',
                  marginTop:'20px'
                  }}>
              <Label >Mobile Number</Label>
              <Controller style={{width:'60%'}}
                as={<PhoneInput   defaultCountry="IN"/>}
                name="mobileNumber"
                type="tel"
                control={control}
                rules={{ required: true }}
              />
              </div>
              <br />
              <Controller
                as={<input style={{ width: "5%" }} />}
                name="terms"
                type="checkbox"
                defaultValue={false}
                control={control}
                rules={{ required: true }}
              />
              <span style={{color: "white"}}>
                I agree to the &nbsp;
                <Terms>
                  <a href="" onClick={e => e.preventDefault()} style={{color: "white"}}>
                    Terms of Use & Privacy Statement.
                  </a>
                </Terms>
                <br />
                {errors.terms && <ErrorSpan>Tick the checkbox</ErrorSpan>}
              </span>
              <br />
              <br />
              <StyledButton type="submit">
                Register
              </StyledButton>
            </Form>
          </LoginSignupBox>
        </Col>
      </Row>
      </BackgroundColourLayer>
    </LogSignPageDiv>
  );
}

export default Signup;