import { NextPage } from 'next';

import AdminPanelLayout from '../../common/components/Layouts/AdminPanelLayout';
import OrdersPage from '../../common/components/AdminDashboard/Orders';

const IndexPage: NextPage = () => {
    return (
        <AdminPanelLayout>
            <OrdersPage/>
        </AdminPanelLayout>
    );
};

export default IndexPage;