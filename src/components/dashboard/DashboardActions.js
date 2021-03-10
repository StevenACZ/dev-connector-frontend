// React
import React from 'react';

// React Router
import { Link } from 'react-router-dom';

// Ant Icons
import {
  UserOutlined,
  FileAddOutlined,
  BookOutlined
} from '@ant-design/icons';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <UserOutlined />
        <span>Edit Profile</span>
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <FileAddOutlined />
        <span>Add Experience</span>
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <BookOutlined />
        <span>Add Education</span>
      </Link>
    </div>
  )
}

export default DashboardActions
