import './Admin.css';
import { useState } from 'react';

import Sidebar from '../Admin/Sidebar/Sidebar';
import Header from '../Admin/Header/Header';
import Dashboard from '../Admin/Dashboard/Dashboard';
import CustomersPage from './ManageCustomer/CustomersPage';

function Admin() {
    const [activePage, setActivePage] = useState('Dashboard');

    const renderPage = () => {
        switch (activePage) {
            case 'Customers':
                return <CustomersPage />;
            case 'Dashboard':
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="admin-layout-container">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <div className="admin-main-content-wrapper">
                <Header />
                {renderPage()}
            </div>
        </div>
    );
}

export default Admin;
