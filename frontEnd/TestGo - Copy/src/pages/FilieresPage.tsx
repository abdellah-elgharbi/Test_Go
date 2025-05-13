import FiliereTableComponent from '@/components/FiliereTableComponent';
import AdminNavbar from '@/components/navbar/AdminNavbar';
import React from 'react';

const FiliersPage: React.FC = () => {

    return (
    <div  className='flex'>
        <AdminNavbar/>
        <FiliereTableComponent/>
    </div>
        
    )
};

export default FiliersPage;