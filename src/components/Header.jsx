import React from 'react';

const Header = ({ category, title }) => (
  <div className=" mb-10 ">
  
  <div className="text-3xl font-extrabold tracking-tight text-slate-900">
      <h4>{title} </h4> <p className="text-lg mr=10 text-gray-400">{category}</p>  
                
    </div>

   
   
    
   
  </div>
);

export default Header;
