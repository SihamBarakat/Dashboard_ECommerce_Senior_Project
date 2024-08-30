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
import { NavbarAdmin, SidebarAdmin, ApproveSupplier } from "../../admin";
import { Link, useNavigate } from "react-router-dom";
import StatusTemplate from "../suppliers/StatusTemplate";
import { AddSuppliers, EditSuppliers, DeleteSuppliers } from "../../admin";
import FilterSup from "../suppliers/FilterSup";
const ResultFilterSup = () => {
  const { activeMenu, isClicked, currentMode } = useStateContext();

  const filterOption = { ignoreAccent: true, type: "menu" };
  const API_URL = "https://donkey-casual-python.ngrok-free.app/supplier/all";
  const [supplier, setSupplier] = useState([]);
  const [is_approved, setIsapproved] = useState([]);
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
          is_approved,
        }),
      });
      if (!response.ok) {
        throw new Error("Authentication Error");
      }
      const data = await response.json();

      setSupplier(data);
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
                <Header title={"Filter Supplier"} />
                <FormContainer>
                  <Input
                    type="text"
                    placeholder="Is Approve"
                    value={is_approved}
                    onChange={(e) => setIsapproved(e.target.value)}
                    required
                  />
                  <div className="text-center">
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
                  </div>

                  <GridComponent
                    dataSource={supplier}
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
                        field="id"
                        headerText="Id"
                        width="100"
                        textAlign="Center"
                        type="number"
                      />
                      <ColumnDirective
                        field="user.email"
                        headerText="email"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="user.first_name"
                        headerText="First Name"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="user.last_name"
                        headerText="Last Name"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        field="user.username"
                        headerText="User Name"
                        width="100"
                        textAlign="Center"
                      />

                      <ColumnDirective
                        field="phone_number"
                        headerText="Phone Number"
                        width="100"
                        textAlign="Center"
                      />
                      <ColumnDirective
                        headerText="Latitude"
                        field="latitude"
                        width="100"
                        textAlign="Center"
                        type="number"
                      />
                      <ColumnDirective
                        headerText="Longitude"
                        field="longitude"
                        width="100"
                        textAlign="Center"
                        type="number"
                      />
                      <ColumnDirective
                        headerText="Commercial Recored"
                        field="commercial_recored"
                        width="100"
                        textAlign="Center"
                      />

                      <ColumnDirective
                        field="is_approved"
                        headerText="Is Approved"
                        width="150"
                        template={StatusTemplate}
                        textAlign="Center"
                        type="boolean"
                      />
                    </ColumnsDirective>
                    <Inject services={[Search, Page, Edit]} />
                  </GridComponent>
                </FormContainer>
              </BoxContainer>
            </div>
          </div>

          {isClicked.userProfile && <ApproveSupplier />}
        </div>
      </div>
    </>
  );
};

export default ResultFilterSup;

//
