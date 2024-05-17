import React, { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../utils/firebaseConfig.js";
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
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = (e) => {
    e.preventDefault();

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
              setFormData({
                title: "",
                description: "",
                image: "",
                createdAt: Timestamp.now().toDate(),
              });
              setImageUrl(null);
              document.getElementById("article-form").reset();
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
        <form id="article-form" onSubmit={handlePublish}>
          <Title value={formData.title} onChange={(e) => handleChange(e)} />
          <Description
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />
          <Image
            onChange={(e) => handleImageChange(e)}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
          <Button
            onClick={handlePublish}
            formData={formData}
            progress={progress}
          />
        </form>
      </div>
    </>
  );
}
