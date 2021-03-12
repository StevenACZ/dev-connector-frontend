// React
import React from 'react';

// Moment
import Moment from 'react-moment';

const ProfileEducation = ({ education }) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {
        education.length > 0
          ? 
            (
              <>
                {
                  education.map( ({
                    _id,
                    school,
                    degree,
                    fieldofstudy,
                    description,
                    from,
                    to
                  }) => (
                    <div key={ _id }>
                      <h3 className="text-dark">{ school }</h3>
                      <p>
                        <Moment format='YYYY/MM/DD'>{ from }</Moment>
                        - { !to ? ' Now' : <Moment format='YYYY/MM/DD'>{ to }</Moment> }
                      </p>
                      <p>
                        <strong>Degree: </strong>
                        { degree }
                      </p>
                      <p>
                        <strong>Field Of Study: </strong>
                        { fieldofstudy }
                      </p>
                      <p>
                        <strong>Description: </strong>
                        { description }
                      </p>
                    </div>
                  ))
                }
              </>
            )
          :
            (
              <h4>No education credentials</h4>
            )
      }
    </div>
  )
}

export default ProfileEducation
