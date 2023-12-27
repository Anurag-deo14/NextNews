// Article.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from '../styles/Article.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, ScrollToTop } from '../components';
import LikeButton from './likebutton';
import { auth } from '../firebase'; // Import the Firebase auth instance

const Toast = dynamic(() => import('../components/Toast/Toast'));

function Article({ news }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const iconCalendar = <FontAwesomeIcon icon={faCalendarAlt} color='#3c3c3c' />;

  return (
    <div className='container'>
      <Head>
        <title>Article</title>
      </Head>

      <main>
        <article className={styles.wrapper}>
          <article className={styles.content_wrapper}>
          <LikeButton articleId={news.id} userId={user?.uid} articleInfo={news} />
            <p className={styles.date}>
              {iconCalendar} {news.webPublicationDate}
            </p>
            <h2>{news.webTitle}</h2>
            <h4>{news.fields.headline}</h4>
            <hr className={styles.divider} />
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: news.fields.body }}
            />
          </article>

          <article className={styles.media_wrapper}>
            {news.fields.thumbnail ? (
              <Image
                src={news.fields.thumbnail}
                alt='Article media'
                width={500}
                height={300}
              />
            ) : (
              <div className={styles.overlay}>
                <div className={styles.logo}></div>
              </div>
            )}

            <p className={styles.figcaption}>{news.fields.headline}</p>
          </article>
        </article>
      </main>

      <ScrollToTop />
    </div>
  );
}

Article.getInitialProps = async ({ query }) => {
  const { publicRuntimeConfig } = getConfig();
  const { id } = query;
  const baseUrl = `${publicRuntimeConfig.GUARDIAN_API_URL}${id}?show-elements=image&show-fields=body,headline,thumbnail&api-key=${publicRuntimeConfig.GUARDIAN_API_KEY}`;
  const res = await fetch(baseUrl);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { news: data.response.content };
};

export default Article;
