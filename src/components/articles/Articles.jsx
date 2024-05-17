import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../utils/firebaseConfig.js";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
    });
  }, []);

  const firstArticle = articles[0];

  return (
    <>
      {firstArticle ? (
        <>
          <div className="article-container-header" key={firstArticle.id}>
            <div className="article-container-header-content">
              {firstArticle.title}
            </div>
          </div>
          <div className="article-container">
            <div className="article-container-content-title">
              {firstArticle.title}
            </div>
            <div className="article-container-content-description">
              {firstArticle.description}
            </div>
            <div className="article-container-content-image">
              <img
                src={firstArticle.imageUrl}
                alt={firstArticle.title}
                className="img"
              />
            </div>
          </div>
        </>
      ) : (
        <p>No articles found!</p>
      )}
    </>
  );
}
