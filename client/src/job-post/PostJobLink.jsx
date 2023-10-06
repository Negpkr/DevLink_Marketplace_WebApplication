import React from 'react'
import { Link } from 'react-router-dom'

function PostJobLink(props) {
    return (
        <div className="post_job_link">
            <Link to='/post_job' className='link' id="link_to_postJob"> {props.text} </Link>
        </div>
    );
}
export default PostJobLink