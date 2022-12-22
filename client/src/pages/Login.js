import React ,{useEffect, useState} from "react";
import Input from "antd/lib/input/Input";
import { Anchor } from "antd";
import { Form,message } from "antd";
import "../resources/authentication.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const { Link } = Anchor;
function Login() {
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();
  const onFinish = async (values) => {
    try {
        setLoading(true)
        const response=await axios.post('/api/users/login',values);
        localStorage.setItem('expense-tracker-user',JSON.stringify({...response.data,password:''}));
        setLoading(false)
        message.success("Login Succesfull")
        navigate('/')
      } catch (error) {
        setLoading(false)
        message.error("Login Failed")
      }
  };

  useEffect(()=>{
    if(localStorage.getItem('expense-tracker-user'))
    {
      navigate("/");
    }
  },[]);
  return (
    <div className="register">
      {loading && <Spinner/>}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Expense Tracker/Login</h1>
            <hr />
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Anchor>
                <Link
                  href="/register"
                  title="New User, Click Here to Register"
                />
              </Anchor>
              <button className="primary" type="submit">
                LOGIN
              </button>
            </div>
          </Form>
        </div>
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
      </div>
    </div>
  );
}
export default Login;
