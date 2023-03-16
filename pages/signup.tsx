import { Button, Input } from '@tanchohang/langtang-rcl';

interface SignupIProps {}
const Signup = ({}: SignupIProps) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[30%] flex flex-col gap-5 p-10 shadow-lg">
        <Input placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button>Signup</Button>
      </div>
    </div>
  );
};
export default Signup;
