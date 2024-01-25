import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Signup = ({setToggle, userState, setUserState}) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        username: null,
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
        if(!user.username || !user.email || !user.password) console.log('error');
        // check for the user in backend
        let existingUser = false;
        const formData = new URLSearchParams();
        formData.append('email', 'asdn@nfls.com');
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
        if(existingUser) {
            return alert("User Already Exist..... Try to Login");
        }
        // else create a new user
        const userData = new URLSearchParams();
        userData.append('username', user.username);
        userData.append('email', user.email);
        userData.append('password', user.password);
        await fetch('http://localhost:5000/signup', {
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
            if (data.message === 'New User Created') {
                setUserState(() => {
                    return {
                        loginState: true,
                        email: data.email
                    }
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
            <Heading fontSize={'4xl'} textAlign={'center'}>
                Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
                to enjoy all of our cool features ✌️
            </Text>
            </Stack>
            <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            w={'lg'}
            p={8}>
            <Stack spacing={4}>
                <Box>
                    <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input name='username' value={user.username} type="text" onChange={handleUserDetails} />
                    </FormControl>
                </Box>
                <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name='email' value={user.email} onChange={handleUserDetails} />
                </FormControl>
                <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} name='password' value={user.password} onChange={handleUserDetails} />
                    <InputRightElement h={'full'}>
                    <Button
                        variant={'ghost'}
                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                    </InputRightElement>
                </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                    bg: 'blue.500',
                    }}
                    onClick={handleSubmit}>
                    Sign up
                </Button>
                </Stack>
                <Stack pt={6}>
                <Text align={'center'}>
                    Already a user? <Link color={'blue.400'} onClick={handleAccount}>Login</Link>
                </Text>
                </Stack>
            </Stack>
            </Box>
        </Stack>
        </Flex>
    );
}

export {Signup};