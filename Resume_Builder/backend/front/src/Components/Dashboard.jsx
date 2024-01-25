import { 
    Box,
    Heading,
    Flex,
    Button,
    Text
} from '@chakra-ui/react';
import { FaPlus } from "react-icons/fa";
import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Dashboard = ({ userState, setUserState}) => {
    const navigate = useNavigate();
    const handleAddResume = () => {
        navigate(userState.loginState ? '/get-resume-details' : '/auth')
    }
    return (
        <>
            <Box w={'75%'} position={'relative'} h={'75vh'} bgColor={'#ffffff'} mt={'5vh'} borderRadius='lg'>
                <Flex w='100%'>
                    <Heading m={'auto'}>Resume List</Heading>
                    <Button top='0' right='0' variant={'filled'} onClick={handleAddResume} position={'absolute'}>
                        <FaPlus />
                        <Text>Add Resume</Text>
                    </Button>
                </Flex>
            </Box>
        </>
    );
}

export {Dashboard};