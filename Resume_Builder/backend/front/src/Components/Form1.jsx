import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
    Heading,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    InputGroup,
  } from '@chakra-ui/react'

const Form1 = ({userData, setUserData, step, setStep, progress, setProgress}) => {
    const toast = useToast();
    const [details, setDetails] = useState({
        name: null,
        email: null,
        telNum: null
    })
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }
    const handleForm1 = () => {
        if (userData.name && userData.email && userData.telNum.length === 10) {
          setStep(step + 1);
          setProgress(progress + 25);
          setUserData({
            ...userData,
            name: details.name,
            email: details.email,
            telNum: details.telNum
        });
        }
        if (!userData.name){
            toast({
                title: 'Name Required',
                description: 'Please enter the Name...',
                status: 'warning',
                duration: 2000,
                isClosable: true
              })
        }
        if (!userData.email) {
            toast({
                title: 'Email Required',
                description: 'Please enter the Email...',
                status: 'warning',
                duration: 2000,
                isClosable: true
              })
        }
        if (userData.telNum.length !== 10) {
            toast({
                title: 'Phone Number Required',
                description: 'Please enter a Valid Number...',
                status: 'warning',
                duration: 2000,
                isClosable: true
              })
        }
        
      }
    return (
        <>
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            Basic Details
        </Heading>
        <Flex>
            <FormControl>
            <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                Name
            </FormLabel>
            <Input id="last-name" name="name" value={userData.name} placeholder="Name" onChange={handleChange} />
            </FormControl>
        </Flex>
        <FormControl mt="2%">
            <FormLabel htmlFor="email" fontWeight={'normal'}>
            Email address
            </FormLabel>
            <Input id="email" name="email" value={userData.email} placeholder="Enter email" type="email" onChange={handleChange} />
        </FormControl>

        <FormControl>
            <FormLabel htmlFor="phone-number" fontWeight={'normal'} mt="2%">
            Phone Number
            </FormLabel>
            <InputGroup size="md">
            <Input
                pr="4.5rem"
                placeholder="Enter Phone Number"
                maxLength='10'
                name="telNum"
                value={userData.telNum}
                onChange={handleChange}
            />
            </InputGroup>
        </FormControl>
        <Flex mt={5}>
                <Button
                    onClick={() => {
                    setStep(step - 1)
                    setProgress(progress - 25)
                    }}
                    isDisabled={step === 1}
                    colorScheme="teal"
                    variant="solid"
                    w="7rem"
                    mr="5%">
                    Back
                </Button>
                <Button
                    w="7rem"
                    isDisabled={step === 4}
                    onClick={handleForm1}
                    colorScheme="teal"
                    variant="outline">
                    Next
                </Button>
                </Flex>
        </>
    )
}
export {Form1}