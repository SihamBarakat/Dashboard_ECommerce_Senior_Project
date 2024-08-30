import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css'; // Import CSS for styles

const StatusTemplateScheduled = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.is_scheduled === false) {
      navigate('/approveSupplier'); // Navigate to the inactive page
    }
  };

  return (
    <div className="status-cell" onClick={handleClick}>
      <span className={props.is_scheduled === true ? 'status-circle active' : 'status-circle inactive'}></span>
      <span className="status-text">
        {/* {props.is_scheduled === true ? 'Scheduled' : 'UnScheduled'} */}
      </span>
    </div>
  );
};

export default StatusTemplateScheduled;
