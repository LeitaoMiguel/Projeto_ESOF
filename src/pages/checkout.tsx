import { NextPage } from 'next';

import MainLayout from '../common/components/Layouts/MainLayout';
import CheckoutPage from '../common/components/Checkout';

const IndexPage: NextPage = () => {
  return (
      <MainLayout>
        <CheckoutPage/>
      </MainLayout>
  );
};

export default IndexPage;