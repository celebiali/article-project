import React, { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebaseConfig.js";
import Title from "../AddArticle/Title";
import Description from "../AddArticle/Description";
import Image from "../AddArticle/Image";
import Button from "../button/Button";

export default function AddArticle() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
          })
            .then(() => {
              setProgress(0);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    );
  };

  return (
    <>
      <div className="article-container-header">
        <div className="article-container-header-content">
          {formData.title ? formData.title : "New Title"}
        </div>
      </div>
      <div className="article-container">
        <Title value={formData.title} onChange={(e) => handleChange(e)} />
        <Description
          value={formData.description}
          onChange={(e) => handleChange(e)}
        />
        <Image onChange={(e) => handleImageChange(e)} />
        <Button
          onClick={handlePublish}
          formData={formData}
          progress={progress}
        />
      </div>
    </>
  );
}