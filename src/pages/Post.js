import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [likeCount, setLikeCount] = useState("");
  const [postId, setPostId] = useState("");
  const { authState } = useContext(AuthContext);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get(`https://blog-server-d5d2.onrender.com/post/byId/${id}`).then(
      (res) => {
        setPostData(res.data[0]);
      }
    );

    Axios.get(`https://blog-server-d5d2.onrender.com/comments/${id}`).then(
      (res) => {
        setComments(res.data);
      }
    );
  }, []);

  const submitComment = () => {
    Axios.post(
      `https://blog-server-d5d2.onrender.com/comments/${id}`,
      {
        commentBody: commentInput,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      if (response.data.err) {
        console.log(response.data.err);
      } else {
        setPostId(response.data.postId);
        setCommentInput("");
      }
    });
  };
  const handleLike = () => {
    Axios.post(
      `https://blog-server-d5d2.onrender.com/likes/${id}`,
      {},
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      console.log(response.data);
    });
  };

  const deletePost = () => {
    Axios.delete(`hhttps://blog-server-d5d2.onrender.com/posts/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((res) => navigate("/"));
  };

  const deleteComment = (id) => {
    Axios.delete(`https://blog-server-d5d2.onrender.com/comments/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
        thePostId: postId,
      },
    }).then((res) => {
      "deleted";
    });
  };

  return (
    <div className="bg-[#202020] w-full h-screen pt-4 flex flex-col items-center md:flex-row">
      <div className="mx-auto w-full md:w-2/4 md:mx-5">
        <h1 className="text-white text-3xl">{postData.title}</h1>
        <h3 className="bg-white my-5 p-3 w-[88%] h-60 rounded-xl md:w-80">
          {postData.postText}
        </h3>

        <div className="flex flex-row justify-between">
          <h2 className="text-egg">{postData.username}</h2>
          {authState.username === postData.username && (
            <h2
              className="text-white cursor-pointer"
              onClick={() => deletePost(postData._id)}
            >
              Delete Post
            </h2>
          )}
        </div>
      </div>
      <div className="mt-3 flex flex-col md:mt-0">
        <div className="flex flex-col items-center lg:flex-row">
          <input
            onChange={(e) => setCommentInput(e.target.value)}
            value={commentInput}
            type="text"
            placeholder="Comment..."
            className="mb-3 pl-2 w-60 h-16 outline-none rounded-2xl resize-none"
          />
          <button
            type="submit"
            onClick={submitComment}
            className="bg-egg w-36 h-7 px-1 mx-2 m2 border rounded-lg lg:mt-0"
          >
            Add Comment
          </button>
        </div>
        <div>
          {comments?.map((comment, key) => {
            return (
              <div
                key={key}
                className="m-2 p-2 h-auto text-white border rounded-md"
              >
                <h2>{comment.userComment}</h2>
                <h2>{comment.commentBody}</h2>

                {authState.username === comment.userComment && (
                  <button className="text-red-500" onClick={deleteComment}>
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
