import { NextPage } from 'next';

import AdminPanelLayout from '../../common/components/Layouts/AdminPanelLayout';
import ProductsPage from '../../common/components/AdminDashboard/Products';

const IndexPage: NextPage = () => {
    return (
        <AdminPanelLayout>
            <ProductsPage/>
        </AdminPanelLayout>
    );
};

export default IndexPage;