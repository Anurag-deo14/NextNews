import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';
import { SearchBar } from '../index';
import { useAuth } from '../../pages/AuthUserContext'; // Update the path
import auth from '../../pages/firebase'
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
                src='/assets/KaiOS-Logo.svg'
                alt='KaiOS Logo'
                width={142}
                height={56}
              />
            </a>
          </Link>
        </div>
        <div className={styles.search}>
          <SearchBar {...props} />
        </div>
        {user ? (
          <div className={styles.user}>
            <p>Welcome, {user.email}</p>
            <SignOutButton/>
          </div>
        ) : (
          <Link href="/signup">
            <button>Signup</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
