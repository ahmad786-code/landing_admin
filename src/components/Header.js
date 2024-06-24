import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
 

const Header = ({onLogout}) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/emails">Emails</Link>
                </li>
                <li>
                    <Link to="/top">Top Stories</Link>
                </li>
                <li>
                    <Link to="/featured">Featured Stories</Link>
                </li>
                <li>
                   <button onClick={onLogout}>Logout</button>
                </li>
                 

            </ul>
        </nav>
    )
}

export default Header