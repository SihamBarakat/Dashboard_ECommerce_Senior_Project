// all customers
// app.get('/api/customers',function(req,res){
//     return res.json({result:data,count:data.length});

import axios from "axios";

// });
// // add customer
// app.post('/api/insert',function(req,res){
//     return res.json({result:data,count:data.length});

// });
// //remove
// app.delete('/api/customers/:id',function(req,res){
//     return res.json({result:data,count:data.length});

// });
// //update
// app.put('/api/customers/:id',function(req,res){
//     return res.json({result:data,count:data.length});

// });
// app.listen(8000);
/////////////////////////////////////////////////////////
const baseURL ="https://6e8b-37-48-151-120.ngrok-free.app";
//get 
export function getCustomers(){
    return fetch(baseURL+"/customers").then(res=>res.json());
}
//add
export function addCustomers(customer){
    return fetch(baseURL+"/Users/admin/Customers",{
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
    const selectedChatId = localStorage.getItem("selected-chat-id");
    const headers={

    };
 const response= await axios.post(`https://6e8b-37-48-151-120.ngrok-free.app/Users/admin/suppliers`,data)

    // return fetch(baseURL+"/Users/admin/suppliers").then(res=>res)
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
export function getCategories(){
    return fetch(baseURL+"/Users/admin/suppliers").then(res=>res)
};













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