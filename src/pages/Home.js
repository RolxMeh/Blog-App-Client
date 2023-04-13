import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    Axios.get("https://blog-server-d5d2.onrender.com/posts")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-[#202020] w-full h-full flex items-center flex-col">
      {data?.map((info) => {
        return (
          <div
            key={info._id}
            className="mb-6 pt-5 cursor-pointer hover:shadow-custom"
          >
            <h1 className="text-white text-2xl mb-2">{info.title}</h1>
            <div
              className="bg-white w-80 h-52 p-2 rounded-t-lg"
              onClick={() => {
                navigate(`/post/${info._id}`);
              }}
            >
              {info.postText}
            </div>
            <Link to={`/profile/${info.userId}`}>
              <h3 className="text-egg">{info.username}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
