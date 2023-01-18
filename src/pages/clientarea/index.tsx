import { NextPage } from 'next';

import { useSession, getSession } from "next-auth/react"

import ClientAreaLayout from '../../common/components/Layouts/ClientAreaLayout';
import AccountPage from '../../common/components/ClientArea/Account';

const IndexPage: NextPage = () => {
    const { data: session, status } = useSession();

    if (status === "loading")
        return <p>Loading...</p>
    if (status === "unauthenticated")
        return <p>Access Denied</p>

    return (
        <ClientAreaLayout title="Minha conta" description="Definições gerais da sua conta.">
            <AccountPage />
        </ClientAreaLayout>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    return {
        props: { session }
    }
}

export default IndexPage;