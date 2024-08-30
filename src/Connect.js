import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const baseURL ="https://donkey-casual-python.ngrok-free.app";
const API_URL =
"";

//get 
//const [categoriess, setCategoriess] = useState([]);
export async function  getCustomers (){

   
}

export function getCategories(){
    return fetch(baseURL+"/catalog/category", {
        method: "get",
        headers: {
          //'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true",
        },
      });
};
//add
export function addCustomers(customer){
    return fetch(baseURL+"/catalog/category",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            value:customer
        })
    }).then(data=>{
        return data;
    });
}
//update
export function updateCustomers(customer){
    return fetch(baseURL+"/customers"+customer.id,{
        method:"put",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
            value:customer
        })
    }).then(data=>{
        return data;
    });
}
//delete
export function deleteCustomers(primaryKey){
    return fetch(baseURL+"/customers"+primaryKey,{
        method:"delete",
    }).then(data=>{
        return data;
    });
}
export async function getSuppliers(){
  
    // try {
    //     const response = await axios.post('http://localhost:3000/post', { key: 'value' });
    //     setData(response.data);
    //   } catch (err) {
    //     setError(err.message);
    //   }
    const selectedChatId = localStorage.getItem("selected-chat-id");
    const headers={
        "Content-Type":"application/json",


    };
 const response= await axios.post(`https://f887-37-48-144-11.ngrok-free.app//Users/admin/suppliers`,{headers})

    // return fetch(baseURL+"/Users/admin/suppliers").then(res=>res)
    console.log(response);
};

export function addSuppliers(customer){
    return fetch(baseURL+"/catalog/category/",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            value:customer
        })
    }).then(data=>{
        return data;
    });
}


export function addCategories(category){
    return fetch('https://a006-37-48-149-174.ngrok-free.app/catalog/category/',{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            value:category
        })
    }).then(data=>{
        return data;
    });
}












//return fetch('https://6e8b-37-48-151-120.ngrok-free.app/Users/admin/suppliers')
//     .then(response => response.text())
//     .then(data => {
//         console.log("Raw data:", data);  // Log the raw data
//         try {
//             let jsonData = JSON.parse(data);
//             console.log(jsonData);  // Log parsed JSON if successful
//         } catch (error) {
//             console.error("Parsing error:", error.message);
//         }
//     })
//     .catch(error => console.error("Fetch error:", error));
// }