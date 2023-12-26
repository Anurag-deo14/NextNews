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
    <button
      style={{
        backgroundColor: '#3498db',
        color: 'white',
        padding: '8px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
