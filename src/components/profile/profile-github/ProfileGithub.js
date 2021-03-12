// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Redux - Reducers
import { getGithubRepos, selectRepos } from '../../../features/profileSlice';

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch();
  const repos = useSelector( selectRepos );

  useEffect(() => {
    dispatch( getGithubRepos( username ) );
  }, [ dispatch, username ])

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        Github Repos
      </h2>
      {
        repos.length === 0
          ?
            <h4>No repos</h4>
          :
            repos.map( ({
              id,
              html_url,
              name,
              description,
              stargazers_count,
              watchers_count,
              forks_count
            }) => (
              <div
                key={ id }
                className="repo bg-white p-1 my-1"
              >
                <div>
                  <h4>
                    <a
                      href={ html_url }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      { name }
                    </a>
                  </h4>
                  <p>
                    { description }
                  </p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">
                      Stars: { stargazers_count }
                    </li>
                    <li className="badge badge-dark">
                      Watchers: { watchers_count }
                    </li>
                    <li className="badge badge-light">
                      Forks: { forks_count }
                    </li>
                  </ul>
                </div>
              </div>
            ))
      }
    </div>
  )
}

export default ProfileGithub
