import { useState } from 'react';
import { account } from '../../appwrite/appwriteConfig';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login } = useAuthStore();

  //   handle form input in state
  function handleInput(event) {
    const { name, value } = event.target;
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [name]: value,
      };
    });
  }

  //   handle form submit
  async function handleSubmit(event) {
    event.preventDefault();

    console.log(loginData);

    try {
      await account.createEmailSession(loginData.email, loginData.password);
      const user = await account.get(); // Get user details after successful login
      login(user); // Store user details in the store
      navigate('');
    } catch (error) {
      alert(error.message);
    }

    setLoginData({
      email: '',
      password: '',
    });
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      <form
        action=""
        className="flex flex-col items-center justify-center rounded-md bg-white p-10"
        onSubmit={handleSubmit}
      >
        <h1 className="m-0 font-bold">Login</h1>
        <label htmlFor="email"></label>
        <input
          className="m-2 h-8  rounded-md border border-solid border-black p-4"
          type="email"
          id="email"
          placeholder="Email"
          onChange={handleInput}
          name="email"
          value={loginData.email}
        />
        <label htmlFor="password"></label>
        <input
          className="m-2 h-8  rounded-md border border-solid border-black p-4"
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleInput}
          name="password"
          value={loginData.password}
        />
        <span></span>
        <p className="p-1">
          Don&apos;t have an account?
          {
            <Link to={'/signup'}>
              {' '}
              <span className="font-bold">Sign up</span>
            </Link>
          }
        </p>
        <button className="h-8 w-40 rounded-lg  bg-green-500 text-white">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
