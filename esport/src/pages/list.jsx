import React, { useState } from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function List({setOpen,open,BaseUrl}) {
  const location = useLocation();
  const params = useParams();

  const [getDetails, setGetDetails] = useState();
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState();
  useEffect(() => {
    let data = axios
      .get(`${BaseUrl}tournaments/${params?.id}`)
      .then((res) => {
        setGetDetails(res.data.data);
      });
    let comment = axios
      .get(`${BaseUrl}comments/tournament/${params?.id}`)
      .then((res) => {
        setCommentList(res.data.data);
      });
  }, []);
const submitComment = ( ) =>{
  if(localStorage.getItem("token")){
    fetch(`${BaseUrl}comments`, {
      method: "post",
       headers: { "Content-Type": "application/json" ,
       "Authorization":`Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        "tournament_id": parseInt(params?.id),
        "message": comment
    })
      })
  .then(function(response) {
      if(response.ok){
          return response.json();
      }{
          throw new Error("Post Failed")
      }
  }).then(function(res){
    setComment("")
    let comment = axios
    .get(`${BaseUrl}comments/tournament/${params?.id}`)
    .then((res) => {
      setCommentList(res.data.data);
    });
  
    // let data ={
    //   message:comment
    // }
    // setCommentList(commentList=>[...commentList,data])
    
  })
  .catch(function(error) {
      console.log("Request failed", error);
  });
  }
  else{
    setOpen(true)
  }
  
}
  return (
    <React.Fragment>
      <Navbar setOpen={setOpen} open={open} />
      <div className="grid grid-cols-3 mt-20 w-[85%] mx-auto gap-8 pb-20">
        <div className="col-span-2 mx-auto ">
          <div className="  bg-gradient-to-r from-blue to-dark p-4 rounded-t-lg">
            <p className="text-white text-[30px] font-bold font-mono text-center">
              Tournament Details
            </p>
          </div>
          <div className="border-2 border-blue p-5 rounded-b-lg">
            <h5 className="text-[30px] text-blue font-semibold font-mono pt-10">
              {getDetails?.name}
            </h5>
            <p className="text-white text-[18px] font-medium mt-5">
              {getDetails?.start_date}
            </p>
            <p className="text-white text-[18px] font-medium mt-2">
              {getDetails?.location}
            </p>

            <p className="text-white text-[18px] font-medium mt-10">
              Description
            </p>

            <p className="text-white font-normal font-mono text-[13px] mt-3">
              {getDetails?.description}
            </p>
          </div>
        </div>
        <div className="col-span-1 border-2 border-blue p-4 rounded-lg">
          {commentList.length>0?(
             <div style={{height:"70vh",overflow:"scroll",background:"#002446"}} className="my-scroll">
             {commentList?.map((obj, index) => (
               <p
                 key={index}
                 className="font-mono text-[12px] text-white font-bold mt-10"
               >
                 {obj?.user?.firstname} &nbsp;:
                 <span className="font-normal"> &nbsp;{obj?.message}</span>{" "}
               </p>
             ))}
           </div>
          ):<p className="text-white">No Comment found</p>}
         

          <div className="flex mt-20">
            <input
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              type="text"
              placeholder="comment"
              className="bg-gradient-to-r from-blue to-dark p-3 w-[90%] rounded-2xl text-white font-mono"
            />
            <svg
            onClick={submitComment}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 self-center text-white font-bold cursor-pointer "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default List;
