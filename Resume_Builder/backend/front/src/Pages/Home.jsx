import { 
    Container 
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Navbar } from "../Components/Navbar";
import { Dashboard } from "../Components/Dashboard";
import { useNavigate } from "react-router-dom";

const Home = ({userState, setUserState}) => {
    const navigate = useNavigate();
    console.log(userState);
    useEffect(() => {
        if (!userState.loginState) navigate('/auth');
    });
    return (
        <>
            <Navbar userState={userState} setUserState={setUserState} />
            <Container h={'90vh'} maxW={'9xl'} bgColor={'#c4fff9'} centerContent>
                <Dashboard userState={userState} setUserState={setUserState} />                
            </Container>
        </>
    );
}

export {Home};