import Layout from '@/components/layout/LayoutAdmin';
import ModulesManagement from '@/components/ModulesManagement';
import AdminNavbar from '@/components/navbar/AdminNavbar';
import React from 'react';
import Programs from './Programs';
const ModulesPage: React.FC = () => {

    return (
    <Layout>
        <Programs/>
    </Layout>
    )
};

export default ModulesPage;