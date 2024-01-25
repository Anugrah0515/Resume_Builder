import React, { useState } from "react";
import { Login } from "../Components/Login";
import { Signup } from "../Components/Signup";

const Auth = ({userState, setUserState}) => {
    const [toggle, setToggle] = useState(true);
    if (toggle) return(<Login setToggle={setToggle} userState={userState} setUserState={setUserState} />);
    else return(<Signup setToggle={setToggle} userState={userState} setUserState={setUserState} />);
}

export {Auth};