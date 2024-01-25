import React, {useState} from "react";
import {
    Button,
    Heading,
    FormControl,
    FormLabel,
    Textarea,
    Input,
    Flex,
    useToast
} from "@chakra-ui/react";  

const Form3 = ({userData, setUserData, step, setStep, progress, setProgress}) => {
    console.log(userData);
    const toast = useToast();
    const [project, setProject] = useState(userData.project.length === 0 ? [{
        title: null,
        description: null
      }] : userData.project);
    const handleAdd = () => {
        setProject((pre) => {
            return (
                [...pre, {
                    title: null,
                    description: null
                  }]
            )
        });
    }
    const handleRemove = () => {
        setProject((pre) => {
            if (project.length === 1) return;
            const arr = [...pre];
            arr.pop();
            return arr;
        })
    }
    const handleProject = (index, e) => {
        const updatedProject = project.map((item, ind) => (ind === index ? {
            ...item, 
            [e.target.name]: e.target.value
        } : item));
        setProject(updatedProject);
        setUserData({
            ...userData,
            project: project
        });
        console.log(userData);
    }
    const handleForm3 = () => {
        if (userData.project.length >= 1) {
          setProgress(progress + 25);
          setStep(step + 1);
          setUserData({
            ...userData,
            project: project
          })
        }
        if (userData.project.length === 0) {
          toast({
            title: 'Project Details Required',
            description: 'Add atleast one project...',
            status: 'warning',
            duration: 2000,
            isClosable: true
          })
        }
      }
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Project Information
            </Heading>
            {
                project.map((item, index) => {
                    return (
                        <FormControl mt="2%">
                            <FormLabel htmlFor="degree" fontWeight={'normal'}>
                                Project Title
                            </FormLabel>
                            <Input id="degree" type="text" name="title" value={item.title} onChange={(e) => handleProject(index, e)} placeholder="Eg: Resume Builder"/>
                            <FormLabel htmlFor="degree" fontWeight={'normal'}>
                                Description
                            </FormLabel>
                            <Textarea id="degree" type="text" name="description" value={item.description} onChange={(e) => handleProject(index, e)} maxLength={150} placeholder="Enter a brief description"/>
                        </FormControl>
                    )
                })
            }
            <Button
                onClick={handleAdd}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
                mt="2%">
                Add details
            </Button>
            <Button
                onClick={handleRemove}
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
                    onClick={handleForm3}
                    colorScheme="teal"
                    variant="outline">
                    Next
                </Button>
                </Flex>
        </>
    )
}

export {Form3}