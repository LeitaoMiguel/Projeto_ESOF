import { NextPage } from 'next';

import AdminPanelLayout from '../../common/components/Layouts/AdminPanelLayout';
import EmployeesPage from '../../common/components/AdminDashboard/Employees';

const IndexPage: NextPage = () => {
  return (
      <AdminPanelLayout>
          <EmployeesPage/>
      </AdminPanelLayout>
  );
};

export default IndexPage;