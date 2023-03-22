import AppFolder from 'components/folder';
import DashboardLayout from './layout';

interface Props {}
const Dashboard = ({}: Props) => {
  return (
    <div>
      <AppFolder />
    </div>
  );
};
export default Dashboard;
Dashboard.auth = true;
