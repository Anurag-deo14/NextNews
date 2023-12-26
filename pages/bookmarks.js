// bookmarks.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from '../styles/Bookmarks.module.scss';
import Link from 'next/dist/client/link';

function Bookmarks() {
  const [likedArticles, setLikedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedArticles = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;
          const likedArticlesRef = collection(db, 'users', userId, 'likedArticles');
          const snapshot = await getDocs(likedArticlesRef);

          const articlesData = [];
          snapshot.forEach((doc) => {
            articlesData.push({ id: doc.id, ...doc.data() });
          });

          setLikedArticles(articlesData);
        }
      } catch (error) {
        console.error('Error fetching liked articles:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedArticles();
  }, []);

  return (
    <div className='container'>
      <Head>
        <title>KaiOS | Bookmarks</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.heading}>
          <h1>All Bookmarks</h1>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : likedArticles.length > 0 ? (
          <ul className={styles.articleList}>
          {likedArticles.map((article) => (
  <li key={article.id} className={styles.articleItem}>
    <Link
      href={{
        pathname: '/article',
        query: { id: article.id },
      }}
    >
      <a>{article.webTitle}</a>
    </Link>
  </li>
))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <div className={styles.icon}></div>
            <h2>OOPS!</h2>
            <h4>We could not find any liked articles.</h4>
          </div>
        )}
      </main>
    </div>
  );
}

export default Bookmarks;
