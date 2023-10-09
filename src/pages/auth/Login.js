import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const Auth = useAuth();
  const navigate = useNavigate();
  const { isLoading, mutate, error } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (res) => {
      Auth.storeToken(res?.role);
      Auth.setUserInfo({ ...res?.user });
      navigate("/");
    },
  });

  const [passState, setPassState] = useState(false);

  const onFormSubmit = (formData) => {
    mutate(formData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Head title="Login" />
      <div className="nk-app-root">
        <div className="nk-wrap nk-wrap-nosidebar">
          <div className="nk-content">
            <Block className="nk-block-middle nk-auth-body wide-xs">
              <div className="brand-logo pb-4 text-center">
                <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                  <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
                  <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
                </Link>
              </div>

              <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                <BlockHead>
                  <BlockContent>
                    <BlockTitle tag="h4">Sign-In</BlockTitle>
                    <BlockDes>
                      <p>Access panel using your email and password.</p>
                    </BlockDes>
                  </BlockContent>
                </BlockHead>
                {error && (
                  <div className="mb-3">
                    <Alert color="danger" className="alert-icon">
                      <Icon name="alert-circle" /> {error.message}
                    </Alert>
                  </div>
                )}
                <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="default-01">
                        Username
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="default-01"
                        {...register("username", { required: "This field is required" })}
                        placeholder="Enter your username"
                        className="form-control-lg form-control"
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="password">
                        password
                      </label>
                      {/* <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                  Forgot Code?
                </Link> */}
                    </div>
                    <div className="form-control-wrap">
                      <span
                        onClick={(ev) => {
                          ev.preventDefault();
                          setPassState(!passState);
                        }}
                        style={{ cursor: "pointer" }}
                        className={`form-icon lg form-icon-right password-switch `}
                      >
                        {passState ? (
                          <Icon name="eye" className="password-icon icon-show"></Icon>
                        ) : (
                          <Icon name="eye-off" className="password-icon icon-hide"></Icon>
                        )}
                      </span>
                      <input
                        type={passState ? "text" : "password"}
                        id="password"
                        {...register("password", { required: "This field is required" })}
                        placeholder="Enter your password"
                        className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                      />
                      {errors.password && <span className="invalid">{errors.password.message}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <Button size="lg" className="btn-block" type="submit" color="primary">
                      {isLoading ? <Spinner size="sm" color="light" /> : "Sign in"}
                    </Button>
                  </div>
                </Form>
                <div className="form-note-s2 text-center pt-4">
                  New on our platform? <Link to={`${process.env.PUBLIC_URL}/auth-register`}>Create an account</Link>
                </div>
                <div className="text-center pt-4 pb-3">
                  <h6 className="overline-title overline-title-sap">
                    <span>OR</span>
                  </h6>
                </div>
                <ul className="nav justify-center gx-4">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#socials"
                      onClick={(ev) => {
                        ev.preventDefault();
                      }}
                    >
                      Facebook
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#socials"
                      onClick={(ev) => {
                        ev.preventDefault();
                      }}
                    >
                      Google
                    </a>
                  </li>
                </ul>
              </PreviewCard>
            </Block>
          </div>
        </div>
      </div>
      <AuthFooter />
    </>
  );
};
export default Login;

async function loginRequest(value) {
  try {
    let response = await axios.post(`${process.env.REACT_APP_API_URL}login/`, value);
    return response?.data;
  } catch (error) {
    throw Error(error?.response?.data?.message || error || "Error On Sign In");
    // return error;
  }
}
