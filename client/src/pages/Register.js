import React, { useEffect, useState } from "react";
import Input from "antd/lib/input/Input";
import { Anchor, message } from 'antd';
import { Form } from "antd";
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
const { Link } = Anchor;
function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(true);
    const onFinish=async (values)=>{
      try {
        setLoading(true);
        await axios.post('/api/users/register',values)
        setLoading(false);
        message.success("Registration Succesfull")
      } catch (error) {
        setLoading(false);
        message.error("Something Went Wrong")
      }
    }
  
  useEffect(() => {
    if (localStorage.getItem("expense-tracker-user")) {
      navigate("/");
    }
  }, []);
    
  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://assets9.lottiefiles.com/packages/lf20_8btahzqu.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Expense Tracker/Register</h1>
            <hr />
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Anchor>
                <Link
                  href="/login"
                  title="Already Registered, Click Here to Login"
                />
              </Anchor>
              <button className="primary" type="submit">
                REGISTER
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Register;
