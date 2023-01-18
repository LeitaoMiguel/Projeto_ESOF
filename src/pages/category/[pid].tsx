import { NextPage } from 'next';
import { useRouter } from 'next/router'

import MainLayout from '../../common/components/Layouts/MainLayout';
import CategoryView from '../../common/components/Category';

const IndexPage: NextPage = () => {
    const router = useRouter();
    const { pid } = router.query;
    
    return (
        <MainLayout>
          <CategoryView pid={pid}/>
        </MainLayout>
    );
};

export default IndexPage;