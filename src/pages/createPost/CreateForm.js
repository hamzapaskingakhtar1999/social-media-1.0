import React from "react";
import "./CreateForm.scss";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    title: yup.string().required("Please add a title!"),
    description: yup.string().required("Please add a description!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data) => {
    await addDoc(postsRef, {
      title: data.title,
      description: data.description,
      name: user?.displayName,
      userId: user?.uid,
      createdBy: user?.email,
      likes: 0,
      userImg: user?.photoURL,
    });
    console.log(data);
    navigate("/");
  };

  return (
    <div className="create-form">
      <form onSubmit={handleSubmit(onCreatePost)}>
        <input type="text" placeholder="Title..." {...register("title")} />
        <p style={{ color: "red" }}>{errors.title?.message}</p>
        <textarea
          rows="10"
          cols="50"
          placeholder="Description..."
          {...register("description")}
        />
        <p style={{ color: "red" }}>{errors.description?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
};

export default CreateForm;
