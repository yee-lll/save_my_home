import React, { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

export default function AdminGate({ children }){
  const nav = useNavigate();
  const isAuthed = sessionStorage.getItem("adminAuthed")==="1";
  const { pathname } = useLocation();

  useEffect(()=>{
    if(!isAuthed) nav("/admin/login",{ replace:true });
  },[isAuthed, nav, pathname]);

  return isAuthed ? children || <Outlet/> : null;
}
