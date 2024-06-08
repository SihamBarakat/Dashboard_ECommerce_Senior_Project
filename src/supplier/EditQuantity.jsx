import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { BoldLink, BoxContainer, FormContainer,  Input, MutedLink, SubmitButton,} from "./Style";
import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { productsData,  productsGrid,QuantitysGrid} from '../data/dummy';

const EditQuantity = () => {
  const { currentColor } = useStateContext();
  const toolbarOptions = ['Search'];
  
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Edit Quantity</p>
      </div>
      
     
      <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {QuantitysGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
       
      
      <div>
        {QuantitysGrid.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            {/* <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {/* {item.headerText} */}
            {/* </button> */} 
            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.headerText}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.headerText} </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
    
      <BoldLink href="/addproduct" >
      <Button
          color="white"
          bgColor={currentColor}
          text="go BAck"
          borderRadius="10px"
          width="full"
        />
              </BoldLink>      
       
      </div>
    </div>

  );
};

export default EditQuantity;
