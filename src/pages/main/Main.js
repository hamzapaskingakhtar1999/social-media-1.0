import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
import Post from "./Post";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { AiOutlineLike } from "react-icons/ai";

import "./Main.scss";

const Main = () => {
  const navigate = useNavigate();

  const [likes, setLikes] = useState(0);

  const [change, setChange] = useState(false);

  const [user] = useAuthState(auth);
  const [postsList, setPostsList] = useState(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    try {
      const result = await getDocs(postsRef);
      if (!result.empty) {
        const postsArray = result.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setPostsList(postsArray);
      } else {
        setPostsList([]); // Set an empty array if no posts found
      }
      console.log(postsList);
    } catch (error) {
      console.log("Error getting posts:", error);
      setPostsList([]); // Set an empty array in case of error
    }
  };

  const updateLikes = async (id, currentLikes) => {
    console.log("id:", id);

    const likesRef = doc(db, "posts", id);
    const newLikes = { currentLikes: likes + 1 };
    console.log("currentLikes:", currentLikes);
    await updateDoc(likesRef, newLikes);
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    console.log("Deleted");
    setChange(true);
    alert("Post Deleted");
  };

  useEffect(() => {
    getPosts();
  }, [change]);

  useEffect(() => {
    // Use this effect to observe changes in postsList and log it to the console
    console.log(postsList);
    setChange(false);
  }, [postsList]); // This effect will run whenever postsList changes

  return !user ? (
    "No Post Available"
  ) : (
    <div className="posts">
      {postsList?.map((item) => (
        <div className="post-item">
          <div className="top">
            <img
              src={item?.userImg}
              style={{ height: "40px", width: "40px" }}
            />
            <p style={{ color: "black", textAlign: "right" }}>
              <strong>Posted by:</strong> {item.createdBy}
            </p>
          </div>
          <hr />
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <hr />

          <div className="bottom">
            <span>
              <button
                onClick={() => {
                  updateLikes(item.id, item.likes);
                }}
              >
                <AiOutlineLike className="icon" />
              </button>
              <br />
              {item.likes}
            </span>
            {user.email === item.createdBy && (
              <button
                className="delete-post-button"
                onClick={() => deletePost(item.id)}
              >
                Delete Post
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
