/* eslint-disable jsx-a11y/anchor-is-valid */
import { GiQuillInk } from 'react-icons/gi';
import { useState } from 'react'; 
import { useRegisterUserMutation } from '../store/apis/authApi';
import { useNavigate } from 'react-router-dom'; 


function Register() {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser, {isLoading, isError}] = useRegisterUserMutation()

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const response = await registerUser({ email, username, password });
    localStorage.setItem('username', username);
    navigate('/home')
    console.log('success', response);
  } catch (error) {
    console.log('error', error);
  }
}

    

  return (
    <section className="bg-red-400	">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-5xl font-semibold  dark:text-white"
        >
          <GiQuillInk />
          INKWELL
        </a>
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-red-300					 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 bg-red-400	 placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={handleEmailChange}
                />
                <label
                  htmlFor="username"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  placeholder="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 bg-red-400	placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={handleUsernameChange}
                />
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 bg-red-400	placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={handlePasswordChange}
                />
              </div>
              
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-20 py-2.5 text-center  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  "
              >
              
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
              {isError && (
                <p className="text-red-500 text-sm font-light">
                  Registration failed. Please try again.
                </p>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-white">
                 have an account?{' '}
                <a
                  href="/login"
                  className="font-medium text-white hover:underline dark:text-primary-500"
                >
                  Sign In
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
