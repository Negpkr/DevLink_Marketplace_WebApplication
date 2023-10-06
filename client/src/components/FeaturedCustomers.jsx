import React, { useState } from 'react'
import Card from './Card'
import CustomerList from './CustomerList'
import SeeButton from './SeeButton'

const FeaturedCustomers = () => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedCustomer = showAll ? CustomerList : CustomerList.slice(0, 3); // Show first 3 items initially

  return (
    <div className="featured-customers">
      <h2>Featured Customers</h2>
      <div className='row'>
        {displayedCustomer.map((customer) => (
          <Card
            key={customer.key}
            avatar={customer.avatar}
            name={customer.name}
            position={customer.description}
            rating={customer.rating}
          />
        ))}
      </div>
      <SeeButton toggleShowAll={toggleShowAll} label={showAll ? 'See Less' : 'See all customers'} />
    </div>
  );
};

export default FeaturedCustomers;
