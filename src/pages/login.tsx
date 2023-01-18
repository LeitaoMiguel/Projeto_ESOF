import { NextPage } from 'next';

import AuthenticationLayout from '../common/components/Layouts/AuthenticationLayout';
import LoginPage from '../common/components/Authentication/LoginPage';

const IndexPage: NextPage = () => {
  return (
      <AuthenticationLayout>
        <LoginPage/>
      </AuthenticationLayout>
  );
};

export default IndexPage;