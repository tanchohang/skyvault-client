import { ReactNode } from 'react';
import Actionbar from '../../components/actionbar';
import Navbar from '../../components/navbar';
import Sidemenu from '../../components/sidemenu';

interface Props {
  children: ReactNode;
}
const DashboardLayout = ({ children }: Props) => {
  return (
    <main className="grid grid-cols-[200px,1fr]">
      <Sidemenu />

      <div className="grid grid-rows-[max-content,max-content,1fr]">
        <Navbar />
        <Actionbar />
        <div>{children}</div>
      </div>
    </main>
  );
};
export default DashboardLayout;
