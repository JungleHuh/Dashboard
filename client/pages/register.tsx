import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import InputGroup from '../src/components/inputGroup';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>({});

  let router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post('/auth/register', {
        email,
        password,
        username
      });
      console.log('res', res);

      router.push("/login");
    } catch (error:any) {
      if (error.response) {
        // 서버 응답이 있는 경우
        setError(error.response.data || {});
      } else {
        // 서버 응답이 없는 경우
        console.log('error', error);
        setError({ generic: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <div className='bg-white'>
      <div className='flex flex-col items-center justify-center h-screen p-6'>
        <div className='w-10/12 mx-auto md:w-96'>
          <h1 className='mb-2 text-lg font-medium text-black'>회원가입</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder='Email'
              value={email}
              setValue={setEmail}
              error={error.email}
            />

            <InputGroup
              placeholder='Name'
              value={username}
              setValue={setUsername}
              error={error.username}
            />
            <InputGroup
              placeholder='Password'
              value={password}
              setValue={setPassword}
              error={error.password}
            />

            <button className='w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded'> 회원 가입</button>
          </form>
          <small className='text-black' >
            이미 가입하셨나요?
            <Link href="/login" legacyBehavior>
              <a className='ml-1 text-blue-500 uppercase'>로그인</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
