import React from 'react'
import { Icon } from 'semantic-ui-react'

const Card = (props) => {
    return <div className='column'>
        <img src={props.avatar} alt="staff" />
        <h3>{props.name}</h3>
        <p>{props.position}</p>
        <p> <Icon name='star' color='yellow'></Icon> {props.rating}</p>
    </div>
}

export default Card