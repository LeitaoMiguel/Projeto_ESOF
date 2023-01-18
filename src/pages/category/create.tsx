import { NextPage } from 'next';

import AdminPanelLayout from '../../common/components/Layouts/AdminPanelLayout';
import CategoryCreate from '../../common/components/Category/Create';

const IndexPage: NextPage = () => {
  return (
      <AdminPanelLayout>
        <CategoryCreate/>
      </AdminPanelLayout>
  );
};

export default IndexPage;