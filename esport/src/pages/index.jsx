import React, { useEffect, useState } from "react";
import Marketplace_card from "../component/market-card";
import Card from "../component/card";
import GameSlider from "../component/slider";
import Footer from "../component/footer";
import Navbar from "../component/navbar";

import axios from "axios"

function Marketplace({setOpen,open,BaseUrl}) {
  const [tourmamentList,setTourrnamentList]=useState([])


  useEffect(()=>{
    let data = axios.get(`${BaseUrl}tournaments`).then((res)=>{
      setTourrnamentList( res.data.data)
    })
  },[])
  return (
    <>
      <Navbar setOpen={setOpen} open={open} BaseUrl={BaseUrl}/>

      <GameSlider />
      <Marketplace_card />
      <Card tourmamentList={tourmamentList}/>
      <Footer />
    </>
  );
}

export default Marketplace;
