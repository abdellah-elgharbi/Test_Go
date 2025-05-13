import Groups from './GroupPage';
import Layout from '@/components/layout/LayoutTeacher';
import AdminNavbar from '@/components/navbar/AdminNavbar';
import TeacherNavbar from '@/components/navbar/TeacherNavbar';
import React from 'react';

const GroupsPage: React.FC = () => {

    return (
        <Layout>
            <div  className='flex'>
              <Groups/>
            </div>
        </Layout>
    )
};

export default GroupsPage;