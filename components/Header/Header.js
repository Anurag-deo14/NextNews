// Header.jsx

import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';
import { SearchBar } from '../index';
import { useAuth } from '../../AuthUserContext'; // Update the path
import SignOutButton from '../../pages/signoutbutton';

function Header(props) {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href='/'>
            <a onClick={props.onClick}>
              <Image
                src='/assets/NNlogo.png'
                alt='NNLogo'
                width={142}
                height={20}
              />
            </a>
          </Link>
        </div>
        <div className={styles.search}>
          <SearchBar {...props} />
        </div>
        <div className={styles.user}>
          {user ? (
            <>
              <p className={styles.welcome}>Welcome, {user.email}</p>
              <SignOutButton />
            </>
          ) : (
            <Link href="/signup">
              <button className={styles.signupButton}>Signup</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
