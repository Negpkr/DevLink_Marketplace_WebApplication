import React, { useContext, useState } from 'react';
import { JobContext } from '../context/post.context';
import Job from './Job';
import SeeButton from '../components/SeeButton';

function JobList(props) {
  const { job } = useContext(JobContext);

  const [searchJob, setSearchJob] = useState('');
  const [hiddenJobs, setHiddenJobs] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    console.log(hiddenJobs);
  };

  const handleHideJob = (jobKey) => {
    // Add the jobKey to the hiddenJobs array
    setHiddenJobs([...hiddenJobs, jobKey]);
    console.log(jobKey);
  };

  // Define the filteredJobs after hiddenJobs
  const filteredJobs = Object.values(job).filter((jobItem) => {
    return jobItem.title.toLowerCase().includes(searchJob.toLowerCase())
      &&
      !hiddenJobs.includes(jobItem.title)
  });

  const displayedJobs = showAll ? filteredJobs : filteredJobs.slice(0, 3); // Show first 3 items

  return (
    <div className="featured-freelancers">
      <h2>Job List</h2>

      {/* Add a search input for filtering */}
      <input
        type="text"
        placeholder="Search by job title"
        value={searchJob}
        onChange={(e) => setSearchJob(e.target.value)}
      />

      <div className="row">
        {displayedJobs.map((jobItem) => (
          <Job
            imageurl={jobItem.imageFile}
            url={jobItem.imageFile}
            title={jobItem.title}
            description={jobItem.description}
            skill={jobItem.skill}
            paymin={jobItem.paymin}
            paymax={jobItem.paymax}
            length={jobItem.length}
            workinghour={jobItem.workinghour}
            experience={jobItem.experience}
            experiencemin={jobItem.experiencemin}

            onclick={() => handleHideJob(jobItem.title)}
          >
          </Job>
        ))}
      </div>
      <SeeButton toggleShowAll={toggleShowAll} label={showAll ? 'See Less' : 'See More'} />
    </div>
  );
}

export default JobList;
