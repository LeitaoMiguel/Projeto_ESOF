import { NextPage } from 'next';

import { useSession, getSession } from "next-auth/react"

import ClientAreaLayout from '../../common/components/Layouts/ClientAreaLayout';
import PasswordPage from '../../common/components/ClientArea/Password';

const IndexPage: NextPage = () => {
    const { data: session, status } = useSession();

    if (status === "loading")
        return <p>Loading...</p>
    if (status === "unauthenticated")
        return <p>Access Denied</p>

    return (
        <ClientAreaLayout title="Palavras-passe" description="Definições de palavra-passe">
            <PasswordPage/>
        </ClientAreaLayout>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession(context)
  
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