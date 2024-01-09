/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import logo from "../../resumrlogo.jpg";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import  "../../socialicons.css";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import "../../socialicons.css";
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            loading: true,
        });

        this.form.validateAll();

        const { dispatch, history } = this.props;

        if (this.checkBtn.context._errors.length === 0) {
            dispatch(login(this.state.username, this.state.password))
                .then(() => {
                    history.push("/");
                    //   window.location.reload();
                })
                .catch(() => {
                    this.setState({
                        loading: false
                    });
                });
        } else {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        const { isLoggedIn, message } = this.props;

        if (isLoggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <div className="col-md-12 login">
                <div className="card card-container" style={{minWidth:"400px",backgroundColor:"white"}}>
                    <img style={{borderRadius:"5px", border:"1px solid grey" }}
                        src={logo} 
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form
                        onSubmit={this.handleLogin}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group" style={{ marginTop: 10,marginLeft:"105px",width:"20px" }}>
                            <button style={{width:"92px"}}
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                                onClick={this.handleLogin}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>
                        <div style={{marginTop:"10px",marginLeft:"92px"}}>
                        <a href="#">
                            Forgot Password
                        </a>
                        </div>
                        {/* <div style={{marginTop:"2px",marginLeft:"92px"}}>
                        <a href="/register">
                            Need an account?
                        </a>
                        </div> */}
                        <div style={{marginTop:"10px",marginLeft:"92px"}}>
                        <button style={{width:"120px",paddingTop:"3px"}}
                                className="btn btn-primary btn-block"
                            >
                            <span>Login With</span>
                            </button>
                        </div>
                        <div style={{marginLeft:"58px",marginTop:"4px"}}>
                            <span>
                                <a href="https://www.facebook.com/" className="fa fa-facebook"></a>
                                <a href="https://twitter.com/" className="fa fa-twitter"></a>
                                <a href="https://www.google.com/" className="fa fa-google"></a>
                                <a href="https://www.linkedin.com/" className="fa fa-linkedin"></a>
                            </span>
                        </div>
                        
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={(c) => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Login);