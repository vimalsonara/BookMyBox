import { useState } from 'react';
import { account } from '../../appwrite/appwriteConfig';
import { ID } from 'appwrite';
import { Link, useNavigate } from 'react-router-dom';

function SignupForm() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });

  //   handle form input in state
  function handleInput(event) {
    setSignupData((prevSignupData) => {
      const { name, value } = event.target;
      return {
        ...prevSignupData,
        [name]: value,
      };
    });
  }

  //   handle form submit
  async function handleSubmit(event) {
    event.preventDefault();

    console.log(signupData);

    // store signupData to database
    const promise = account.create(
      ID.unique(),
      signupData.email,
      signupData.password,
      signupData.name
    );

    promise.then(
      function () {
        navigate('/');
      },
      function (err) {
        console.log(err);
      }
    );

    // reset form input
    setSignupData({
      name: '',
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
        <h1 className="m-0 font-bold">Create account</h1>
        <label htmlFor="name"></label>
        <input
          className="m-2 h-8  rounded-md border border-solid border-black p-4"
          type="text"
          name="name"
          id="name"
          onChange={handleInput}
          placeholder="Name"
          value={signupData.name}
        />
        <label htmlFor="email"></label>
        <input
          className="m-2 h-8 rounded-md border border-solid border-black p-4"
          type="email"
          id="email"
          placeholder="Email"
          onChange={handleInput}
          name="email"
          value={signupData.email}
        />
        <label htmlFor="password"></label>
        <input
          className="m-2 h-8 rounded-md border border-solid border-black p-4"
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleInput}
          name="password"
          value={signupData.password}
        />
        <p className="p-1">
          Already user?{' '}
          {
            <Link to={'/'}>
              <span className="font-bold">Login</span>
            </Link>
          }
        </p>
        <button className="h-8 w-40 rounded-md  bg-green-500 text-white">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
