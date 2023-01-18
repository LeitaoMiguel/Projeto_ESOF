import { NextPage } from 'next';

import AdminPanelLayout from '../../common/components/Layouts/AdminPanelLayout';
import CategoriesPage from '../../common/components/AdminDashboard/Categories';

const IndexPage: NextPage = () => {
  return (
      <AdminPanelLayout>
          <CategoriesPage/>
      </AdminPanelLayout>
  );
};

export default IndexPage;