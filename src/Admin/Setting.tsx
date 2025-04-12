import React from 'react';
import Admin from '../components/Create/Admin';

const Settings: React.FC = () => {
    const handleToggleSidebar = () => {
   
        console.log('Sidebar toggled');
    };
    return (
        <div className="flex">
            <Admin toggleSidebar={handleToggleSidebar} />
            <main className="flex-grow p-3">
                <h1 className="text-3xl font-bold">Settings</h1>
            </main>
        </div>
    );
}

export default Settings;
