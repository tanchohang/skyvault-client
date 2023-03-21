import { Button, SimpleAvatar } from '@tanchohang/langtang-rcl';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/cloudversify.svg';

interface Props {}
const Navbar = (props: Props) => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="h-[80px] flex flex-row justify-between items-center p-5 shadow-lg">
      <Link href="/" className="flex gap-2">
        <Image src={logo} alt="Skyvault logo" height={30} />
        <h3 className="text-xl font-bold">SkyVault</h3>
      </Link>
      <div>
        {session?.user == null && (
          <>
            <Link href="/login">
              <Button type="button" variant="dark" size="md">
                SignIn
              </Button>
            </Link>
            <Link href="/signup">
              <Button type="button" variant="dark" size="md">
                Sign Up
              </Button>
            </Link>
          </>
        )}

        {session?.user && (
          <div className="flex gap-5">
            <Button
              variant="destructive"
              size="md"
              onClick={() => {
                signOut();
              }}
            >
              Lougout
            </Button>
            <SimpleAvatar
              userImgUrl="http://unsplash.it/200?gravity=north"
              width={50}
              height={50}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
