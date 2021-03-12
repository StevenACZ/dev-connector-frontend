// React
import React from 'react';

// Moment
import Moment from 'react-moment';

const ProfileExperience = ({ experience }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      {
        experience.length > 0
          ? 
            (
              <>
                {
                  experience.map( ({
                    _id,
                    company,
                    description,
                    from,
                    to,
                    title,
                  }) => (
                    <div key={ _id }>
                      <h3 className="text-dark">{ company }</h3>
                      <p>
                        <Moment format='YYYY/MM/DD'>{ from }</Moment>
                        - { !to ? ' Now' : <Moment format='YYYY/MM/DD'>{ to }</Moment> }
                      </p>
                      <p><strong>Position: </strong>{ title }</p>
                      <p>
                        <strong>Description: </strong>{ description }
                      </p>
                    </div>
                  ))
                }
              </>
            )
          :
            (
              <h4>No experience credentials</h4>
            )
      }
    </div>
  )
}

export default ProfileExperience
