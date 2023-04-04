import { DashboardProvider } from 'context/dashboardContext';
import { ReactNode, useReducer } from 'react';
import Navbar from '../../components/navbar';
import Sidemenu from '../../components/sidemenu';

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <DashboardProvider>
      <main className="grid grid-cols-[200px,1fr]">
        <Sidemenu />

        <div className="grid grid-rows-[max-content,max-content,1fr]">
          <Navbar />

          <div>{children}</div>
        </div>
      </main>
    </DashboardProvider>
  );
};
export default DashboardLayout;
