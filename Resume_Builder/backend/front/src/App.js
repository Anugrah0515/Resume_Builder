import React, { useState } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
// Imported Pages
import {Home} from './Pages/Home';
import {Auth} from './Pages/Auth';
import {Details} from "./Pages/Details";

function App() {
  const [userState, setUserState] = useState({
    email: null,
    loginState: false
  });
  return (
    <BrowserRouter>
      <Routes path="/">
        <Route index element={<Home userState={userState} setUserState={setUserState} />} />
        <Route path='/auth' element={<Auth userState={userState} setUserState={setUserState} />} />
        <Route path='/get-resume-details' element={<Details userState={userState} setUserState={setUserState} />} />
      </Routes>
    </BrowserRouter>
  );  
}

export default App;
