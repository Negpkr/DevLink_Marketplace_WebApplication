import React from 'react'

function HeaderImage(props) {
    return (
        <div className="header_image">
            <img src={props.scr} alt={props.alt} />
        </div>
    );
}
export default HeaderImage