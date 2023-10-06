import React from 'react';
import { Button } from 'semantic-ui-react';

function JobTypeSelector({ jobType, setJobType }) {
    return (
        <table className="form">
            <tr>
                <th>Select Job Type:</th>
                <th><Button
                    primary={jobType == 'freelance'}
                    color={jobType == 'freelance' ? 'color' : null}
                    onClick={() => setJobType('freelance')}
                > Freelance </Button></th>
                <th><Button
                    primary={jobType == 'employment'}
                    color={jobType == 'employment' ? 'color' : null}
                    onClick={() => setJobType('employment')}
                > Employment </Button></th>
            </tr>
        </table>
    );
}

export default JobTypeSelector;
