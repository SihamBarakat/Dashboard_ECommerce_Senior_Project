import React from 'react';

const Header = ({ category, title }) => (
  <div className=" mb-6 ">
  
  <div className="text-3xl font-extrabold tracking-tight text-slate-900 bg-white">
      <h4 color='black'>{title} </h4> <p className="text-lg mr=10 text-gray-400">{category}</p>  
                
    </div>

   
   
    
   
  </div>
);

export default Header;
