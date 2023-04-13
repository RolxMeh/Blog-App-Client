import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const initialValue = {
    title: "",
    postText: "",
  };

  const schema = Yup.object().shape({
    title: Yup.string().required("You must input a post title"),
    postText: Yup.string().required(),
  });

  const navigate = useNavigate();

  const handleSubmit = (data) => {
    Axios.post("https://blog-server-d5d2.onrender.com/posts", data, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then(() => navigate("/"));
  };
  return (
    <div className="bg-[#202020] w-full h-screen flex justify-center items-center">
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form className="w-80 flex flex-col border-2 p-10">
          <label className="text-white">Title</label>
          <ErrorMessage
            name="title"
            component="div"
            className="text-sm text-red-500"
          />
          <Field
            name="title"
            placeholder="Title"
            className="mb-5 pl-2 rounded-lg outline-none"
          />

          <label className="text-white">Post</label>
          <ErrorMessage
            name="postTextt"
            component="div"
            className="text-sm text-red-500"
          />
          <Field
            name="postText"
            placeholder="Type a message"
            className="mb-5 pl-2 rounded-lg outline-none"
          />

          <button type="submit" className=" bg-egg w-full mt-2">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
