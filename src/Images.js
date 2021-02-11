import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'


export default props =>
        <div className='fadein'>
            <div
                onClick={props.removeImage()}
                className='delete'
                >
                    <FontAwesomeIcon icon={faTimesCircle} size='2x'/>
                </div>
                {props.image}
        </div>
    