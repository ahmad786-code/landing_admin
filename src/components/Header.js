import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'


const Header = ({ onLogout, admin, user }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/emails">Emails</Link>
                </li>
                <li>
                    <Link to="/stories">Add Stories</Link>
                </li>
                 
                {user && user.uid === admin && (
                    <li>
                        <Link to="/add-users">Add Users</Link>
                    </li>
                )}

                <li>
                    <button onClick={onLogout}>Logout</button>
                </li>


            </ul>
        </nav>
    )
}

export default Header