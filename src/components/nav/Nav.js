import React from 'react';
import {NavLink} from 'react-router-dom';
import "./nav.scss";

function NaviM(props) {

    
    return (
        <div>
            <div className='navMy '>
                <div className='nav1'>
                    <NavLink to="/categoryDay" className='btn-new' style={({isActive}) => ({backgroundColor: isActive ? "rgba(196, 118, 118, 0.795)" : 'rgb(231, 226, 226)'})}>
                        {/* <button className='btn-new'>new sesion</button> */}Sesion
                        </NavLink>
                    
                </div>
                <div className='nav2'>
                    <NavLink to="/all_days" className='btn-all' style={({isActive}) => ({backgroundColor: isActive ? "rgba(196, 118, 118, 0.795)" : 'rgb(231, 226, 226)'})}>
                        All Sesion
                        </NavLink>
                    
                </div>
            </div>
        </div>
    );
}

export default NaviM;