import React, { useState } from 'react';

const Job = (props) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className='column'>
            <br></br>
            <img src={props.imageurl} alt="JobPhoto"/>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p>{props.skill}</p>
            {expanded && <div>
                <p>Payment: ${props.paymentMin} - ${props.paymentMax}</p>
                <p>Length: {props.length}</p>
                <p>Working Hour: {props.workinghour}</p>
                <p>Experience: {props.experience} years</p>
                <p>Experience Min: {props.experiencemin} years</p>
                <a href={props.imageurl}>See Image</a>
            </div>}
            <button className="job_buttons" onClick={props.onclick}>Hide</button>
            <button className="job_buttons" onClick={toggleExpand}>Details</button>
        </div>
    );
};

export default Job;
