import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        Powered by{' '}
        <a
          href='https://github.com/Anurag-deo14/NextNews'
          target='_blank'
          rel='noopener noreferrer'
        >
          AnuragOnGit
        </a>
      </span>
    </footer>
  );
}

export default Footer;
