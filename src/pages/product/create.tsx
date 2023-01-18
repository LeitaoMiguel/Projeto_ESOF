import { NextPage } from 'next';

import AuthenticationLayout from '../../common/components/Layouts/AuthenticationLayout';
import ProductCreate from '../../common/components/Product/Create';

const IndexPage: NextPage = () => {
  return (
      <AuthenticationLayout>
        <ProductCreate/>
      </AuthenticationLayout>
  );
};

export default IndexPage;