import { NextPage } from 'next';

import MainLayout from '../common/components/Layouts/MainLayout';
import LandingPage from '../common/components/LandingPage';

const IndexPage: NextPage = () => {
    return (
        <MainLayout>
            <LandingPage/>
        </MainLayout>
    );
};

export default IndexPage;