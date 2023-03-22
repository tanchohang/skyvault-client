import { Button, ErrorDisplay, Input } from '@tanchohang/langtang-rcl';
import { signupWithEmail } from 'lib/services/signup.service';
import Image from 'next/image';
import logo from '@/public/cloudversify.svg';

import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface SignupIProps {}

interface SignupFormIProps {
  name: string;
  email: string;
  password: string;
}

const Signup = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormIProps>();
  const router = useRouter();

  const { status } = useSession();
  const [serverError, setServerError] = useState('');

  const { isLoading, error: apiError, data } = useSWR('/signup', () => {});

  const onSubmit: SubmitHandler<SignupFormIProps> = async (data) => {
    try {
      const res = await signupWithEmail({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(res);
      if (res.status === 200) {
        console.log(res);
      }
    } catch (error: any) {
      setServerError('try reseting password');
    }
  };

  if (status === 'authenticated') {
    router.push('/dashboard');
  }
  if (status === 'loading') {
    return <p>Loading....</p>;
  }
  return (
    status === 'unauthenticated' && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-screen flex items-center justify-center">
          <div className="w-[50%] flex flex-col gap-5 p-10 shadow-lg">
            <div className="self-center text-center">
              <Image
                src={logo}
                alt="skyvault logo"
                width={100}
                className="m-auto mb-3"
              />
              <h4 className="text-2xl font-extrabold text-center">
                Signup to access SkyVault
              </h4>
            </div>
            {apiError && (
              <ErrorDisplay text="Server Error::Failed to signup" show={true} />
            )}

            {serverError && <ErrorDisplay text={serverError} show={true} />}
            {/* Name Control */}
            <Input
              placeholder="Name"
              {...register('name', {
                required: 'Enter your Name',
                minLength: {
                  value: 6,
                  message: 'Name is too short',
                },
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: 'Name must only contain letters',
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name?.message}</p>
            )}

            {/* Email Control */}
            <Input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Enter your Email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email?.message}</p>
            )}

            {/* Password Control */}
            <Input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Enter your Password',
                minLength: { value: 8, message: 'Password is too short' },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password?.message}</p>
            )}

            <Button variant="default" size="md">
              Signup
              {isLoading && <span className="text-blue-400">Loading....</span>}
            </Button>
            <>
              <p>Already have an account?</p>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            </>
          </div>
        </div>
      </form>
    )
  );
};
export default Signup;
