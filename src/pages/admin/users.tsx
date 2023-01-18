import { NextPage } from 'next';

import AdminPanelLayout from '../../common/components/Layouts/AdminPanelLayout';
import UsersPage from '../../common/components/AdminDashboard/Users';

const IndexPage: NextPage = () => {
  return (
      <AdminPanelLayout>
          <UsersPage/>
      </AdminPanelLayout>
  );
};

export default IndexPage;