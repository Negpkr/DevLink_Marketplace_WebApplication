import React, { useState } from 'react'
import Card from './Card'
import staffList from './staffList'
import SeeButton from './SeeButton'

const CardList = () => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedStaff = showAll ? staffList : staffList.slice(0, 3); // Show first 3 items initially

  return (
    <div className="featured-freelancers">
      <h2>Featured Freelancers</h2>
      <div className='row'>
        {displayedStaff.map((staff) => (
          <Card
            key={staff.key}
            avatar={staff.avatar}
            name={staff.name}
            position={staff.position}
            rating={staff.rating}
          />
        ))}
      </div>
      <SeeButton toggleShowAll={toggleShowAll} label={showAll ? 'See Less' : 'See More'} />
    </div>
  );
};

export default CardList;
