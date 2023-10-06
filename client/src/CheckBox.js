import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const CheckboxExampleToggle = (props) =>
    <div>
        <Checkbox toggle onClick={props.change}/>
    </div>

export default CheckboxExampleToggle