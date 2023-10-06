import React from 'react';
import { Icon } from 'semantic-ui-react';
import './Homepage.css'

function HomePage() {
    return (
        <div className="HomePageAbout">
            <div className="homepage_part1">
                <br></br>
                <Icon name='bell' size='big' color='yellow' />
                <h2>
                    Find the right fit for your jobs.
                </h2>
                <p>
                    With 250 million** people visiting Indeed every month, we give your growing business access to qualified talent to make the right hire. Try Indeed today and find the right fit for your open positions.
                </p>
                <br></br>
            </div>
            <div className="homepage_part2">
                <br></br>
                <Icon name='idea' size='big' color='red' />
                <h2>
                    Reach mobile job seekers with your Indeed job posting.
                </h2>
                <p>
                    Over 70% of job searches on Indeed are from a mobile device. When you post a job on Indeed, your job listing is automatically mobile optimized. This means you can accept applications from any desktop or mobile device.
                </p>
                <br></br>
            </div>
            <div className="homepage_part3">
                <br></br>
                <Icon name='user secret' size='big' color='blue' />
                <h2>
                    Manage your candidates like a pro.
                </h2>
                <p>
                    Receive applications via email. Also, manage jobs and candidates from your Indeed dashboard. Review applications, schedule interviews and view recommended candidates all in one place.
                </p>
                <br></br>
            </div>
        </div>
    );
}

export default HomePage;
