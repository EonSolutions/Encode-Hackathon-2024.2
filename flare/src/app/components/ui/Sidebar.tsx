import React from "react";
import { HomeIcon, ShoppingBag, Users, BarChart2, Settings } from "lucide-react";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Dashboard</h2>
            <div className="sidebar-menu">
                <a href="#" className="sidebar-item">
                    <HomeIcon className="icon" /> Home
                </a>
                <a href="#" className="sidebar-item">
                    <ShoppingBag className="icon" /> Orders
                </a>
                <a href="#" className="sidebar-item">
                    <Users className="icon" /> Customers
                </a>
                <a href="#" className="sidebar-item">
                    <BarChart2 className="icon" /> Analytics
                </a>
                <a href="#" className="sidebar-item">
                    <Settings className="icon" /> Settings
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
