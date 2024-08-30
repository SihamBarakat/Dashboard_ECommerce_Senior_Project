import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css'; // Import CSS for styles

const StatusTemplateLeaf = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.is_leaf === false) {
      navigate('/approveSupplier'); // Navigate to the inactive page
    }
  };

  return (
    <div className="status-cell" onClick={handleClick}>
      <span className={props.is_leaf === true ? 'status-circle active' : 'status-circle inactive'}></span>
      <span className="status-text">
        {/* {props.is_scheduled === true ? 'Scheduled' : 'UnScheduled'} */}
      </span>
    </div>
  );
};

export default StatusTemplateLeaf;
