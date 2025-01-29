import React from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Bacs from './pages/bacs/Bacs'; 
import AddBac from './pages/bacs/AddBac'; 
import EditBac from './pages/bacs/EditBac';

import Types from './pages/types/Types'; 
import AddType from './pages/types/AddType'; 
import EditType from './pages/types/EditType'; 
import Home from "./pages/Home"; 
 
function App() { 
 
  return ( 
    <BrowserRouter> 
    <Routes> 
    <Route path="/" element={<Home />} />
    
    <Route path="/bacs" element={<Bacs />} /> 
    <Route path="/bacs/add" element={<AddBac />} /> 
    <Route path="/bacs/edit/:bac" element={<EditBac />} /> 

 <Route path="/types" element={<Types />} /> 
    <Route path="/types/add" element={<AddType />} /> 
    <Route path="/types/edit/:type" element={<EditType />} /> 

    <Route path="*" element={<Home />} /> 
    </Routes> 
</BrowserRouter> 
  ); 
} 
 
export default App;
