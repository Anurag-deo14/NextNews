// likebutton.js
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import { collection, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

const extractArticleId = (path) => {
  const segments = path.split('/');
  return segments[segments.length - 1];
};

const LikeButton = ({ articleId, userId, articleInfo }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        if (!userId || !articleId) {
          // If userId or articleId is not defined, do not proceed
          return;
        }
  
        const likedArticleDoc = doc(collection(db, 'users', userId, 'likedArticles'), articleId);
        const docSnapshot = await getDoc(likedArticleDoc);
        setLiked(docSnapshot.exists());
      } catch (error) {
        console.error('Error checking if article is liked:', error.message);
      }
    };
  
    checkIfLiked();
  }, [articleId, userId]);

  const handleLike = async () => {
    try {
      const likedArticlesRef = collection(db, 'users', userId, 'likedArticles');
      const likedArticleDoc = doc(likedArticlesRef, extractArticleId(articleId));

      if (liked) {
        // Article is already liked, so unlike it
        await deleteDoc(likedArticleDoc);
        setLiked(false);
      } else {
        // Article is not liked, so like it
        await setDoc(likedArticleDoc, articleInfo);
        setLiked(true);
      }
    } catch (error) {
      console.error('Error liking article:', error.message);
    }
  };

  return (
    <button onClick={handleLike} className={liked ? 'liked' : ''}>
      ❤️
    </button>
  );
};

export default LikeButton;
