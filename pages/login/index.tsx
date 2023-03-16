// import { Label, Input, Button } from '@tanchohang/langtang-rcl/dist/esm';
import { Button, Input, Label, RadioCheck } from '@tanchohang/langtang-rcl';
import Link from 'next/link';

interface LoginIProps {}
const Login = ({}: LoginIProps) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className=" flex flex-col gap-5 w-[30%] shadow shadow-slate-300 p-10 rounded-sm">
        <Label>
          Email:
          <Input type={'email'} />
        </Label>
        <Label>
          <span>Password:</span>
          <Input type={'password'} />
        </Label>

        <div>
          <input type="checkbox" name="remember" />
          <label htmlFor="remember"> Remember me</label>
        </div>

        <Button className="w-20">Login</Button>
        <p>
          <Link href={'#'} className="underline hover:text-blue-400">
            Forgot Password?
          </Link>
        </p>
        <p>
          or{' '}
          <Link href={'/signup'} className="hover:text-blue-400">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
