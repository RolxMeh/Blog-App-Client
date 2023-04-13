import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    Axios.get(`https://blog-server-d5d2.onrender.com/auth/userId/${id}`).then(
      (response) => setUsername(response.data.username)
    );

    Axios.get(
      `https://blog-server-d5d2.onrender.com/posts/byUserId/${id}`
    ).then((response) => setUserPosts(response.data));
  }, []);
  return (
    <div className="bg-[#202020] w-full h-screen flex items-center flex-col">
      <div className="mt-16 mb-5 text-3xl text-white">{username}</div>
      <div className=" flex flex-col items-center justify-center">
        {userPosts?.map((data, key) => {
          return (
            <div
              key={key}
              className="m-2 p-2 h-auto w-80 text-white border rounded-md cursor-pointer"
              onClick={() => {
                navigate(`/post/${data._id}`);
              }}
            >
              <h2>{data.title}</h2>
              <h2>{data.postText}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
