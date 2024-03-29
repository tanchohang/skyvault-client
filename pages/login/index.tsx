import { Button, Input, Label } from '@tanchohang/langtang-rcl';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import logo from '@/public/cloudversify.svg';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface LoginIProps {}
interface LoginFormIProps {
  email: string;
  password: string;
}

const Login = ({}: LoginIProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormIProps>();

  const [error, setError] = useState('');
  const router = useRouter();
  const { status } = useSession();

  const onSubmit: SubmitHandler<LoginFormIProps> = async (data) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: '/dashboard',
    });
    if (result?.status === 401 && !result.ok) {
      setError('Invalid Credentials');
    } else {
      router.push(result?.url || '/dashboard');
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
          <div className=" flex flex-col gap-5 md:w-[50%] sm:w-full m-5 shadow shadow-slate-300 p-10 rounded-sm">
            <div className="self-center text-center">
              <Image src={logo} alt="skyvault logo" width={100} className="m-auto mb-3" />
              <h4 className="text-2xl font-extrabold text-center">Login to your SkyVault account</h4>
            </div>

            <div className="text-red-500">
              {errors.email && <p>{errors.email?.message}</p>}
              {errors.password && <p>{errors.password?.message}</p>}
              {<p>{error}</p>}
            </div>

            {/* Email Control */}
            <Label>
              Email:
              <Input
                type="email"
                placeholder="Email"
                {...register('email', {
                  required: 'Please enter your Email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
            </Label>

            {/* Password Control */}
            <Label>
              <span>Password:</span>
              <Input
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: 'Please enter your Password',
                })}
              />
            </Label>
            <div>
              <input type="checkbox" name="remember" />
              <label htmlFor="remember"> Remember me</label>
            </div>
            <Button variant="default" size="md" className="w-20">
              Login
            </Button>
            <p>
              <Link href={'#'} className="underline hover:text-blue-400">
                Forgot Password?
              </Link>
            </p>
            <p>
              <Link href={'/signup'} className="hover:text-blue-400">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </form>
    )
  );
};
export default Login;
