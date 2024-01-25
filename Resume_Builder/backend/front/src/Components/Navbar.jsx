import { 
    Box,
    Text, 
    Spacer, 
    HStack,
    Button,
    useToast
} from "@chakra-ui/react";
import React from "react";



const Navbar = ({userState, setUserState}) => {
    const toast = useToast();
    const handleLogout = () => {
        toast({
            title: 'Successfully Logged out',
            description: "You have been logged out",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        setUserState({
            email: null,
            loginState: false
        });
    }
    return (
        <>
            <Box w='100%' h='10vh' bgColor='#48cae4' > 
                <HStack py={'2.25vh'} px={'5vh'} >
                    <Text>ResumeBuilder</Text>
                    <Spacer />
                    <Button onClick={handleLogout} />
                </HStack>
            </Box>           
        </>
    );
}

export {Navbar};