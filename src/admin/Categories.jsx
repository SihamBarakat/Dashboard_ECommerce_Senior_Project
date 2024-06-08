import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { customersData,  customersGrid,categoriesGrid} from '../data/dummy';
import { Header } from '../components';
import { Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
//import {SubmitButton} from "../components/Style";

import { Link } from "react-router-dom"
const Categories = () => {
  
  const toolbarOptions = ['Search'];
  const { currentColor } = useStateContext();
  const editing = { allowDeleting: true, allowEditing: true };
  
  
  return (
    <div>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
       <Header  title="Categories" />
      
      <GridComponent
        dataSource={customersData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
    
 
    </div>
  );
};
export default Categories;

