import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Edit,
  dataSourceChanged,
} from "@syncfusion/ej2-react-grids";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "../../components/StyleFilter";
import { Header, NavbarSubAdm } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
//  import { NavbarAdmin, SidebarAdmin, ApproveSupplier } from "..";
import { Link, useNavigate } from "react-router-dom";

import { AddSuppliers, EditSuppliers, DeleteSuppliers } from "..";

import StatusTemplateLeaf from '../../admin/status/StatusTemplateLeaf'
import StatusTemplateActive from '../../admin/status/StatusTemplateActive'
const ResultFilterDisc = () => {
  const { activeMenu, isClicked, currentMode } = useStateContext();

  const filterOption = { ignoreAccent: true, type: "menu" };
 
const API_URL =
"https://donkey-casual-python.ngrok-free.app/catalog/category_filter/";
  const [category, setCategory] = useState([]);
  const [is_active, setIsactive] = useState([]);
  //const { is_approve2 } = useParams();
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          //'Authorization':
          //'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NzgxOTE3LCJpYXQiOjE3MTkxNDE5MTcsImp0aSI6Ijc5YTg4NzM1ZTY0YTRjZjBhM2RjNGVmMjQzMTRkMzJkIiwidXNlcl9pZCI6MTB9.4A6b0JF9MM6rVeOFzm9ITxY-F--nRRVYxWdS6TCq8NI',
        },

        body: JSON.stringify({
          is_active,
        }),
      });
      if (!response.ok) {
        throw new Error("Authentication Error");
      }
      const data = await response.json();
     
      setCategory(data);
      console.log(data);
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };
  const navigate = useNavigate();
  const goback = (action) => {
    navigate(-1); // Navigate to the add page

    // Handle other actions if necessary
  };
  return (
    <>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="mt-6">
          <div className="flex flex-wrap lg:flex-nowrap justify-center bg-white">
            <div className="m-2  p-2 md:p-10  ml-40 mt-0 rounded-xl">
             
              <BoxContainer method="post" onSubmit={handleSubmit}>
              <Header title={"Filter Category"} />
                <FormContainer>
                  <Input
                    type="text"
                    placeholder="Is active"
                    value={is_active}
                    onChange={(e) => setIsactive(e.target.value)}
                    required
                  />
                  <div className="text-center">
                  <SubmitButton className="mt-1 mr-4" type="submit">
                    Filter
                  </SubmitButton>
                  <SubmitButton
                    className="mt-2"
                    type="submit"
                    onClick={goback}
                  >
                    GoBack
                  </SubmitButton>
                  </div>
            
              <GridComponent
                dataSource={category}
                //  dataSource={data}
                width="100%"
                allowPaging
                allowFiltering={true}
                pageSettings={{ pageCount: 5 }}
                dataSourceChanged={dataSourceChanged}
                filterSettings={filterOption}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    headerText="Id"
                    field="id"
                    width="150"
                    textAlign="Center"
                    //isPrimaryKey={true}
                    type="number"
                  />
                  <ColumnDirective
                    headerText="Name"
                    field="name"
                    width="150"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="Slug"
                    field="slug"
                    width="150"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="Parent"
                    field="parent "
                    width="150"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="Is Leaf"
                    field="is_leaf"
                    width="150"
                    textAlign="Center"
                    template={StatusTemplateLeaf}
                  />
                  <ColumnDirective
                    headerText="Is Active"
                    field="is_active"
                    width="150"
                    textAlign="Center"
                    template={StatusTemplateActive}
                  />
                  <ColumnDirective
                    headerText="Image Url"
                    field="image_url"
                    width="150"
                    textAlign="Center"
                  />
                </ColumnsDirective>
                <Inject services={[Search, Page, Edit]} />
              </GridComponent>
              </FormContainer>
              </BoxContainer>
            </div>
          </div>

          {/* {isClicked.userProfile && <ApproveSupplier />} */}
        </div>
      </div>
    </>
  );
};

export default ResultFilterDisc;


