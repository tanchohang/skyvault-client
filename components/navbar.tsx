import { SimpleAvatar } from '@tanchohang/langtang-rcl';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/cloudversify.svg';

interface Props {}
const Navbar = (props: Props) => {
  return (
    <div className="h-[80px] flex flex-row justify-between items-center p-5 shadow-lg">
      <Link href="/" className="flex gap-2">
        <Image src={logo} alt="Skyvault logo" height={30} />
        <h3 className="text-xl font-bold">SkyVault</h3>
      </Link>
      <SimpleAvatar
        userImgUrl="http://unsplash.it/200?gravity=north"
        width={50}
        height={50}
      />
    </div>
  );
};
export default Navbar;
