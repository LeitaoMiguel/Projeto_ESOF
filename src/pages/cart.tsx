import { NextPage } from 'next';

import MainLayout from '../common/components/Layouts/MainLayout';
import CartPage from '../common/components/Cart';

const IndexPage: NextPage = () => {
  return (
      <MainLayout>
        <CartPage/>
      </MainLayout>
  );
};

export default IndexPage;