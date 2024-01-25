import React, { useState } from "react";
import { useToast } from '@chakra-ui/react'
import {
    FormLabel,
    Button,
    Input,
    Flex
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

const Form4 = ({userState, setUserState, userData, setUserData, step, setStep, progress, setProgress}) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState([""]);
    const [field, setField] = useState([""]);
    const [framework, setFramework] = useState([""]);
    const handleAdd = (e) => {
        const {value} = e.target;
        if (value === 'language') {
            setLanguage((pre) => {
                return(
                    [...pre, ""]
                )
            })
        } else if (value === 'field') {
            setField((pre) => {
                return(
                    [...pre, ""]
                )
            })
        } else {
            setFramework((pre) => {
                return(
                    [...pre, ""]
                )
            })
        }
    }
    const handleRemove = (e) => {
        const {value} = e.target;
        if (value === 'language') {
            if (language.length === 1) return;
            setLanguage((pre) => {
                const arr = [...pre]
                arr.pop();
                return arr;
            })
        } else if (value === 'field') {
            if (field.length === 1) return;
            setField((pre) => {
                const arr = [...pre]
                arr.pop();
                return arr;
            })
        } else {
            if (framework.length === 1) return;
            setFramework((pre) => {
                const arr = [...pre]
                arr.pop();
                return arr;
            })
        }
    }
    const handleLanguage = (index, value) => {
        const updatedLanguage = language.map((item, ind) => (ind === index) ? value : item);
        setLanguage(updatedLanguage);
        setUserData({
            ...userData, 
            skills: {
                language: language,
                field: field,
                framework: framework
            }
        })
    }
    const handleField = (index, value) => {
        const updatedField = field.map((item, ind) => (ind === index) ? value : item);
        setField(updatedField);
        setUserData({
            ...userData, 
            skills: {
                language: language,
                field: field,
                framework: framework
            }
        })
    }
    const handleFrameWork = (index, value) => {
        const updatedFramework = framework.map((item, ind) => (ind === index) ? value : item);
        setFramework(updatedFramework);
        setUserData({
            ...userData, 
            skills: {
                language: language,
                field: field,
                framework: framework
            }
        })
    }
    const handleForm4 = async () => {
        if (userData.skills.length >= 1) {
          setProgress(progress + 25);
          setStep(step + 1);
          setUserData({
            ...userData,
            skills: {
                language: language,
                field: field,
                framework: framework
            }
          })
        }
        if (userData.skills.length === 0) {
          toast({
            title: 'Skill Details Required',
            description: 'Add atleast any language, framework or field...',
            status: 'warning',
            duration: 2000,
            isClosable: true
          })
        }
        // backend call for the doc creation
        setLoading(true);
        const user = new URLSearchParams();
        for (const [key, value] of Object.entries(userData)) {
            user.append(key, value);
        }

        await fetch('http://localhost:5000/downloaddoc', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: user,
        }).then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();
          })
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
    
            // Create a temporary link element
            const a = document.createElement('a');
            a.href = url;
            a.download = 'output.pdf';
            document.body.appendChild(a);
    
            // Trigger a click event to initiate the download
            a.click();
    
            // Remove the temporary link element
            document.body.removeChild(a);
    
            // Revoke the URL to free up resources
            window.URL.revokeObjectURL(url);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error:', error);
            setLoading(false);
          });

        toast({
          title: 'Document Created.',
          description: "Download will start shortly",
          status: 'success',
          duration: 3000,
          isClosable: true,
      })
      setUserState({
        ...userState,
        loginState: true
      });
      navigate('/');
      
      }
    return (
        <>
            <FormLabel fontWeight={'normal'}>
                Languages
            </FormLabel>
            {
                language.map((item, index) => (
                    <Input type="text" name="language" value={item} onChange={(e) => handleLanguage(index, e.target.value)} m={1} placeholder="Eg: JavaScript"/>
                ))
            }
            <Button
                onClick={handleAdd}
                value='language'
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
                mt="2%">
                Add details
            </Button>
            <Button
                onClick={handleRemove}
                value='language'
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
                mt="2%">
                Remove
            </Button>
            <FormLabel fontWeight={'normal'}>
                Fields
            </FormLabel>
            {
                field.map((item, index) => (
                    <Input type="text" name="field" value={item} onChange={(e) => handleField(index, e.target.value)} m={1} placeholder="Eg: Web Devolopment"/>
                ))
            }
            <Button
                onClick={handleAdd}
                value='field'
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
                mt="2%">
                Add details
            </Button>
            <Button
                onClick={handleRemove}
                value='field'
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
                mt="2%">
                Remove
            </Button>
            <FormLabel fontWeight={'normal'}>
                Frameworks
            </FormLabel>
            {
                framework.map((item, index) => (
                    <Input type="text" name="framework" value={item} onChange={(e) => handleFrameWork(index, e.target.value)} m={1} placeholder="Eg: ExpressJs"/>
                ))
            }
            <Button
                onClick={handleAdd}
                value='framework'
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
                mt="2%">
                Add details
            </Button>
            <Button
                onClick={handleRemove}
                value='framework'
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
                mt="2%">
                Remove
            </Button>
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
                    colorScheme="teal"
                    variant="outline">
                    Next
                </Button>
                <Button
                    w="7rem"
                    colorScheme="red"
                    variant="solid"
                    onClick={handleForm4}>
                    Submit
                </Button>
                
            </Flex>
        </>
    )
}

export {Form4}