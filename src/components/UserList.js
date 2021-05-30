import React, { useState } from "react";
import "./UserList.css"
import Pagination from "@material-ui/lab/Pagination" ;
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserContext} from "../App.js"
const UserList = ()=>{
    const [min,setMin]=useState(false);
    // const displayMaxibid=(bids)=>{
    //      const bidsArray=[];
    //      bids.map((e)=>{
    //          bidsArray.push(e.amount);
    //      })
    //     //  console.log(bidsArray)
    //     bidsArray.sort();
    //     const length=bidsArray.length;
    //     return <h1>bidsArray[length-1]</h1>;
    // }
    
    return (
        <div className="App">
            <UserContext.Consumer>
             {(contextData)=> { 
                 console.log(contextData.newUser)
                return(
                    <>
                    <div className="userList">
                        {contextData.newUser.map((e)=>{
                         return (
                            <>
  
                            <div className="d-flex userDetail" key={e.id}>
                                <div style={{width:"20%"}}>
                                    <img  className="user_img" src={e.avatarUrl}></img>
                                </div>
                                <div  style={{width:"60%"}}>
                                    
                                        <h5 >Name: {e.firstname } {e.lastname}</h5>
                                        <h5 >Email: {e.email}</h5>
                                        <h5 >Mobile No:{e.phone}</h5>
                                    
                                   
                                </div>
                                <div style={{width:"20%"}}>
                                
                                    {min===false? <h6>{e.MaxBid}</h6>:<h5>{e.MinBid}</h5>}
                                    <button onClick={()=>setMin(true)}> Maximum Bid</button> 
                                </div>
                            </div>
                            </>
                        )
                        })}
                    </div>
                    <div className="pagination">
                        <div>
                    <Pagination 
                        count={3}
                        variant="outlined"
                        color="secondary"
                        defaultPage={1}
                        showFirstButton={true}
                        showLastButton={true}
                        onChange={(event,value)=>contextData.setPage(value)}
                    />
                    </div>
                    </div>
                </>
                );
               }
             }
           </UserContext.Consumer>  
        </div>
      );
}

export default UserList;






