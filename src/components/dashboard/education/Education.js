// React
import React from 'react';

// Redux
// import { useDispatch } from 'react-redux';

// Redux - Reducers

// Moment
import Moment from 'react-moment';

const Education = ({ education }) => {
  // const dispatch = useDispatch();
  // const history =  useHistory();

  const educations = education.map( edu => (
    <tr key={ edu._id }>
      <td>{ edu.school }</td>
      <td className="hide-sm">{ edu.degree }</td>
      <td>
        <Moment format='YYYY/MM/DD'>{ edu.from }</Moment> - {
          edu.to === null ? (
            'Now'
          ) : (
            <Moment format='YYYY/MM/DD'>{ edu.to }</Moment>
          )
        }
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
            educations
          }
        </tbody>
      </table>
    </>
  )
}

export default Education
