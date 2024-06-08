import React, { useState, useEffect } from 'react';

function CategoryList (props)  {
  // const cat1= [{name:""}]
  //     const cat2="null";      

  // return (props.category? cat1:cat2);
  if (category="fashon"){
    return(
      <div>
        <Input type="text" placeholder="Type"required />
                <select  onChange={handleSelect}>{
                      option.map(option=>(
                        <option value ={option.value}>{option.label}</option>
                      ))
                    }
                      </select>
                     
                <Input type="number" placeholder="Size" />
                <Input type="file"multiple accept="image/*"  onChange={handleFileChange} />
                  <div className="image-previews">
                    {selectedFiles.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        style={{ width: '100px', margin: '10px' }}
                      />
                    ))}
                  </div>
        </div>

    );
  }
};

export default CategoryList;
