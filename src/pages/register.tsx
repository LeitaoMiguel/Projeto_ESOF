import { NextPage } from 'next';

import AuthenticationLayout from '../common/components/Layouts/AuthenticationLayout';
import RegisterPage from '../common/components/Authentication/RegisterPage';

const IndexPage: NextPage = () => {
  return (
      <AuthenticationLayout>
        <RegisterPage/>
      </AuthenticationLayout>
  );
};

export default IndexPage;