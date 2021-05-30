import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import { useEffect, useState } from 'react'; 
import UserList from "./components/UserList.js";
export const UserContext = React.createContext();
function App() {

  const [page,setPage] = useState(1);
  const [userData,setUserData] = useState([]);
  const [newUser,setNewUser] = useState([]);
  const [sortV,setSortV] =useState("desc");
  const api = `https://intense-tor-76305.herokuapp.com/merchants?_page=${page}&_limit=${4}`;
  function dynamicsort(property,order) {
    console.log("callSort");
    var sort_order = 1;
    if(order === "desc"){
        sort_order = -1;
    }
    return function (a, b){
        if(a[property] < b[property]){
                return -1 * sort_order;
        }else if(a[property] > b[property]){
                return 1 * sort_order;
        }else{
                return 0 * sort_order;
        }
    }
}
  const loaddata=()=>{
    fetch(api).then((resp)=>{
      resp.json().then((result)=>{
                    result.map((event)=>{
                    const bidsArray=[];
                    event.bids.map((e)=>{
                        bidsArray.push(e.amount);
                    })
                    bidsArray.sort();
                    const minBid=bidsArray[0];
                    const length=bidsArray.length;
                    const maxBid=bidsArray[length-1];
                    event.MinBid=minBid;
                    event.MaxBid=maxBid;
                })
        console.log(result);
         result.sort(dynamicsort("MaxBid",sortV))
         setNewUser(result);
      })
     })
  }
  const changeUser=()=>{
    console.log("call",userData);
  }
  useEffect(()=>{
        loaddata();
        
  },[page,sortV]);
  return (
    <div className="App">
        <UserContext.Provider value={{newUser,setPage}}>
            <>
            <div className="buttonMaxMin">
              <button className="max" onClick={()=>setSortV("desc")} >Sort By MaxBids</button>
              <button className="min" onClick={()=>setSortV("asc")} >Sort By minBids</button>
            </div>
            <div>
                <UserList  setPage={setPage}/>
            </div>
            </>

        </UserContext.Provider> 
    </div>
  );
}

export default App;
