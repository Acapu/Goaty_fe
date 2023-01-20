import React, { Fragment, Component } from "react";

import Slider from "react-slick";

import bg3 from "../../../assets/utils/images/originals/citynights.jpg";

import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";

import api from "../api";
import { resolveCrop } from "react-image-crop";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind()
  }

  handleChange = (event) => {
    let name = event.target.name
    this.setState({
      [name] : event.target.value
    })
  }

  registerUser = () => {
    let params = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    }
    api.registerUser(params).then(() => {this.props.history.push("/login")}).catch((err) => {
      console.log(err)
    })
  }

  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      initialSlide: 0,
      autoplay: true,
      adaptiveHeight: true,
    };
    return (
      <Fragment>
        <div className="h-100">
          <Row className="h-100 g-0">
            <Col lg="7" md="12" className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center">
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                <div className="app-logo" />
                <h4>
                  <div>Welcome,</div>
                  <span>
                    It only takes a{" "}
                    <span className="text-success">few seconds</span> to create
                    your account
                  </span>
                </h4>
                <div>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail">
                            <span className="text-danger">*</span> Email
                          </Label>
                          <Input type="email" name="email" value={this.state.email} id="exampleEmail" placeholder="Email here..." onChange={this.handleChange}/>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleName">Username</Label>
                          <Input type="text" name="username" valud={this.state.username} id="exampleName" placeholder="Name here..." onChange={this.handleChange}/>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePassword">
                            <span className="text-danger">*</span> Password
                          </Label>
                          <Input type="password" name="password" value={this.state.password} id="examplePassword" placeholder="Password here..." onChange={this.handleChange}/>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePasswordRep">
                            <span className="text-danger">*</span> Repeat
                            Password
                          </Label>
                          <Input type="password" name="passwordrep" id="examplePasswordRep" placeholder="Repeat Password here..."/>
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <FormGroup className="mt-3" check>
                      <Input type="checkbox" name="check" id="exampleCheck" />
                      <Label for="exampleCheck" check>
                        Accept our{" "}
                        <a href="https://colorlib.com/" onClick={(e) => e.preventDefault()}>
                          Terms and Conditions
                        </a>
                        .
                      </Label>
                    </FormGroup> */}
                    <div className="mt-4 d-flex align-items-center">
                      <h5 className="mb-0">
                        Already have an account?{" "}
                        <a href="#/login" className="text-primary">
                          Sign in
                        </a>
                      </h5>
                      <div className="ms-auto">
                        <Button color="primary" className="btn-wide btn-pill btn-shadow btn-hover-shine" size="lg" onClick={() => this.registerUser()}>
                          Create Account
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Col>
            <Col lg="5" className="d-lg-flex d-xs-none">
              <div className="slider-light">
                <Slider {...settings}>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                    <div className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg3 + ")",
                      }}/>
                    <div className="slider-content">
                      <h3>Scalable, Modular, Consistent</h3>
                      <p>
                        Easily exclude the components you don't require.
                        Lightweight, consistent Bootstrap based styles across
                        all elements and components
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
