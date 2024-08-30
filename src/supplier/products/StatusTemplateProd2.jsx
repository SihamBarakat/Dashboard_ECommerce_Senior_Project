import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css'; // Import CSS for styles

const StatusTemplateProd2 = (props) => {
 

  
  return (
    <div className="status-cell" >
    <span className={props.product_detail.is_active === true ? 'status-circle active' : 'status-circle inactive'}></span>
    {/* <span className="status-text">
      {props.is_active === true ? '' : ''}
    </span> */}
  </div>
  );
};

export default StatusTemplateProd2;
