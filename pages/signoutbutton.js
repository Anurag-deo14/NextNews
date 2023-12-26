// SignOutButton.js
import { auth } from './firebase'; // Adjust the path accordingly

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await auth.signOut(); // Use the correct method for sign-out
      console.log('Sign-out successful');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
