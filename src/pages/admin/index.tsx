import { NextPage } from 'next';

import AdminPanelLayout from '../../common/components/Layouts/AdminPanelLayout';
import LandingPage from '../../common/components/LandingPage';

import { useSession, getSession } from "next-auth/react"

const IndexPage: NextPage = () => {
    return (
        <AdminPanelLayout>
          <LandingPage/>
        </AdminPanelLayout>
    );
};

export async function getServerSideProps(ctx) {
  var session = await getSession(ctx);

  return {
    props: {
      session: session
    }
  }
}

export default IndexPage;