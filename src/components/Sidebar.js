import React from 'react';

function Sidebar() {
    return (
        <aside className="menu">
            <p className="menu-label">Index</p>
            <ul className="menu-list">
                <li><a href="#canvas">Canvas</a></li>
                <li><a href="#settings">Settings</a></li>
            </ul>
        </aside>
    );
}

export default Sidebar;