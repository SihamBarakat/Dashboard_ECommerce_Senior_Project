import React,{useEffect,useState} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page,Search, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { customersData, customersGrid,datatest,employeesData } from '../data/dummy';
import { Header } from '../components';
import { Link } from "react-router-dom"
import { chatData } from '../data/dummy';
import { BsChatLeft } from 'react-icons/bs';
import { useStateContext } from '../contexts/ContextProvider';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {Navbar,Sidebar} from '../components'
//import {SubmitButton} from "./Style";
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);


const Customers = () => {
  const { currentColor, activeMenu, setActiveMenu,currentMode, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Search'];
  const editing = {  allowEditing: true };

  // const [Customer, setCustomer] = useState([]);
  //  const [loading,setloading]=useState(true);
  // useEffect(()=>{
  //   axios.get(``).then(res=>{
  //     console.log(res)
  //     setCustomer(res.data.customers)

  //   });

  //   // return ()=>{

  //   // }
  // },[])

  // const [isActive, setIsActive] = useState(false);

  // const handleToggle = () => {
  //     setIsActive(!isActive);
  // };


   
  // var customersDetails="";
  // customersDetails=Customer.map((item,index)=>{
  //   return (
  //       <tr key={index}>
  //         <td>{item.id}</td>
  //         <td>{item.user}</td>
  //         <td>{item.phone_number}</td>
         

  //            {/* وبكمل الحقول يلي بدي ياهم من الداتا  */}
        
  //       </tr>
            
  //   )

  // });
  return (
    <>
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
    
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
        
      </div>
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
      <div
        className={
          activeMenu
            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
        }
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
          <Navbar />
        </div>
        </div>
        </div>
        </div>
    <div className="m-2 md:m-10 ml-72 p-2 md:p-10 bg-white rounded-3xl">
     <div className="card-header" >
     <Header  title="Customers" />
        
       </div>
     
       <GridComponent
        dataSource={employeesData}
        width="1200"
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
    </>
  );
};

export default Customers;
