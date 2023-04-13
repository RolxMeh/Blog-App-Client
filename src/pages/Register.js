import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const initialValue = {
    username: "",
    password: "",
  };

  const schema = Yup.object().shape({
    username: Yup.string().min(5).max(20).required(),
    password: Yup.string().min(6).max(20).required(),
  });

  const handleSubmit = (data) => {
    Axios.post("https://blog-server-d5d2.onrender.com/auth", data).then(
      (res) => {
        res.data.err ? console.log(res.data.err) : navigate("/");
      }
    );
  };
  return (
    <div className="bg-[#202020] w-full h-screen flex justify-center items-center">
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form className="w-80 flex flex-col border-2 p-10">
          <label className="text-white">Username</label>
          <ErrorMessage
            name="username"
            component="div"
            className="text-sm text-red-500"
          />
          <Field
            name="username"
            placeholder="Usernname"
            className="mb-5 pl-2 rounded-lg outline-none"
          />
          <label className="text-white">Password</label>
          <ErrorMessage
            name="password"
            component="div"
            className="text-sm text-red-500"
          />
          <Field
            name="password"
            placeholder="Password"
            type="password"
            className="mb-5 pl-2 rounded-lg outline-none"
          />
          <button type="submit" className=" bg-egg w-full mt-2">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
