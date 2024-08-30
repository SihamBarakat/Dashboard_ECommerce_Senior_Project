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
import { NavbarAdmin, SidebarAdmin, ApproveSupplier } from "..";
import { Link, useNavigate } from "react-router-dom";
import StatusTemplate from "../suppliers/StatusTemplate";
import { AddSuppliers, EditSuppliers, DeleteSuppliers } from "..";
import FilterSup from "../suppliers/FilterSup";
const ResultFilterPro = () => {
  const { activeMenu, isClicked, currentMode } = useStateContext();

  const filterOption = { ignoreAccent: true, type: "menu" };
  const API_URL = "https://donkey-casual-python.ngrok-free.app/promotion/filter";
  const [promotion, setPromotion] = useState([]);
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
     
      setPromotion(data);
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
              <Header title={"Filter Promotion"} />
              <BoxContainer method="post" onSubmit={handleSubmit}>
                <FormContainer>
                  <Input
                    type="text"
                    placeholder="Is Approve"
                    value={is_active}
                    onChange={(e) => setIsactive(e.target.value)}
                    required
                  />
                  <SubmitButton className="mt-1 " type="submit">
                    Filter
                  </SubmitButton>
                  <SubmitButton
                    className="mt-1 "
                    type="submit"
                    onClick={goback}
                  >
                    GoBack
                  </SubmitButton>
                </FormContainer>
              </BoxContainer>
              <GridComponent
                dataSource={promotion}
                width="1450"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}

                //dataSourceChanged={dataSourceChanged}
                //filterSettings={filterOption}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    headerText="Id"
                    field="id"
                    width="100"
                    textAlign="Center"
                    //isPrimaryKey={true}
                    type="number"
                  />
                  <ColumnDirective
                    headerText="image_url"
                    field="image_url"
                    width="100"
                    textAlign="Center"
                    type="number"
                  />
                  <ColumnDirective
                    headerText="name"
                    field="name"
                    width="100"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="description"
                    field="description"
                    width="100"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="discount_percentege"
                    field="discount_percentege"
                    width="100"
                    textAlign="Center"
                  />

                  <ColumnDirective
                    headerText="time_start"
                    field="time_start"
                    width="100"
                    textAlign="Center"
                  />

                  <ColumnDirective
                    headerText="time_end"
                    field="time_end"
                    width="100"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    headerText="is_active"
                    field="is_active"
                    template={StatusTemplate}
                    width="100"
                    textAlign="Center"
                  />

                  <ColumnDirective
                    headerText="is_scheduled"
                    field="is_scheduled"
                    width="100"
                  
                    textAlign="Center"
                  />
                </ColumnsDirective>
                <Inject services={[Search, Page]} />
              </GridComponent>
            </div>
          </div>

          {isClicked.userProfile && <ApproveSupplier />}
        </div>
      </div>
    </>
  );
};

export default ResultFilterPro;

//
