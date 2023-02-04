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
    Axios.get(`http://localhost:4000/post/byId/${id}`).then((res) => {
      setPostData(res.data[0]);
    });

    Axios.get(`http://localhost:4000/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, []);

  const submitComment = () => {
    Axios.post(
      `http://localhost:4000/comments/${id}`,
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
      `http://localhost:4000/likes/${id}`,
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
    Axios.delete(`http://localhost:4000/posts/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((res) => navigate("/"));
  };

  const deleteComment = (id) => {
    Axios.delete(`http://localhost:4000/comments/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
        thePostId: postId,
      },
    }).then((res) => {
      "deleted";
    });
  };

  return (
    <div className="bg-[#202020] w-full h-screen flex items-center">
      <div className="mx-5 w-2/4">
        <h1 className="text-white text-3xl">{postData.title}</h1>
        <h3 className="bg-white my-5 p-3 w-80 h-60 rounded-xl">
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
      <div className="flex flex-col">
        <div>
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
            className="bg-egg px-1 mx-2 border rounded-lg"
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
