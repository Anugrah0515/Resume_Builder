import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  Link
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setToggle, userState, setUserState}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: null,
        password: null
    });
    const handleAccount = () => {
        setToggle((prevValue) => {
            return !prevValue;
        });
    }
    const handleUserDetails = (e) => {
        setUser((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value === "" ? null : e.target.value
            }
        })
    }
    const handleSubmit = async () => {
        if(!user.email || !user.password) console.log('error');
        // check for the user in backend
        let existingUser = false;
        const formData = new URLSearchParams();
        formData.append('email', user.email);
        await fetch('http://localhost:5000/checkuser',  {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
          }).then(res => {
            return res.json();
          }).then(data => {
            existingUser = data.message !== "New User"
          })
          
        // if user exist return an alert saying user already exist
        if(!existingUser) {
            return alert("User do not Exist..... Try to Signup");
        }
        // else create a new user
        const userData = new URLSearchParams();
        userData.append('email', user.email);
        userData.append('password', user.password);
        await fetch('http://localhost:5000/login', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: userData.toString(),
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.message === 'Login Successfull') {
                setUserState(() => {
                    return ({
                        loginState: true,
                        email: user.email   
                    })
                })
                navigate('/');
            }
        })
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Log in to your account</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    <HStack>
                        <Text>to enjoy all of our cool </Text>
                        <Text color={'blue.400'}>features</Text>
                        <Text>✌️</Text> 
                    </HStack>
                </Text>
                </Stack>
                <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                    <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" name='email' value={user.email} onChange={handleUserDetails} />
                    </FormControl>
                    <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" name='password' value={user.password} onChange={handleUserDetails} />
                    </FormControl>
                    <Stack spacing={10}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'center'}>
                        <Link color={'blue.400'} onClick={handleAccount}>Don't have an account?</Link>
                    </Stack>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                        bg: 'blue.500',
                        }}
                        onClick={handleSubmit}>
                        Log in
                    </Button>
                    </Stack>
                </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export {Login};