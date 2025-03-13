import React from 'react'

const ViewRequests = () => {
    
    const { camp } = useSearch();
    const user = JSON.parse(localStorage.getItem("user")) || {};


  return (
    <div>ViewRequests</div>
  )
}

export default ViewRequests