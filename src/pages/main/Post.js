import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

const Post = (props) => {
  return (
    <div>
      <div className="title">
        <h1>{props.title}</h1>
      </div>
    </div>
  );
};

export default Post;
