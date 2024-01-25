import React, { useState } from "react";
import { useToast } from '@chakra-ui/react'
import {
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex
  } from '@chakra-ui/react'

const Form2 = ({userData, setUserData, step, setStep, progress, setProgress}) => {
    const toast = useToast();
    const [eduInfo, setEduInfo] = useState(userData.education.length === 0 ? [{
        qualification: null,
        field: null,
        university: null,
        gpa: 0
    }] : userData.education);
    
    const [achievement, setAchievement] = useState(userData.achievements.length === 0 ? [""] : userData.achievements);

    const handleAddEducation = () => { 
        setEduInfo([...eduInfo, {
            qualification: null,
            field: null,
            university: null,
            gpa: 0
        }]);
    }
    const handleRemoveEducation = () => {
        if(eduInfo.length === 1) return;
        setEduInfo((pre) => {
            const arr = [...pre]
            arr.pop();
            return arr;
        })
    }
    const handleEduInfo = (index, e) => {
        const updatedInfo = eduInfo.map((item, ind) => (ind === index ? {...item, [e.target.name]: e.target.value} : item));
        setEduInfo(updatedInfo);
        setUserData({
            ...userData,
            education: eduInfo
        })
    }
    const handleAddAchievement = () => {
        setAchievement([...achievement, ""]);

    }
    const handleRemoveAchievement = () => {
        if(achievement.length === 1) return;
        setAchievement((pre) => {
            const arr = [...pre];
            arr.pop();
            return arr;
        })
    }
    const handleAchievement = (index, value) => {
        const updatedAchievements = achievement.map((item, ind) => (ind === index ? value : item));
        setAchievement(updatedAchievements);
        setUserData({
            ...userData, 
            achievements: achievement
        })
    }
    const handleForm2 = () => {
        if (userData.achievements.length >= 1 && userData.education.length >= 1) {
          setProgress(progress + 25);
          setStep(step + 1);
          setUserData({
            ...userData,
            education: eduInfo,
            achievements: achievement
          })
        }
        if (userData.education.length === 0) {
          toast({
            title: 'Education Details Required',
            description: 'Add atleast one educational detail...',
            status: 'warning',
            duration: 2000,
            isClosable: true
          })
        }
        if (userData.achievements.length === 0) {
          toast({
            title: 'Achievements Required',
            description: 'Add atleast one Achievement...',
            status: 'warning',
            duration: 2000,
            isClosable: true
          })
        }
      }
    
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Educational Details and Achievements
            </Heading>
            {
                eduInfo.map((item, index) => {
                    return (
                        <>
                            <Flex mt="2%">
                                <FormControl mr="5%" >
                                <FormLabel htmlFor="university-name" fontWeight={'normal'}>
                                    University Name
                                </FormLabel>
                                <Input id="university-name" name="university" value={item.university} placeholder="University Name" onChange={(e) => handleEduInfo(index, e)} />
                                </FormControl>

                                <FormControl>
                                <FormLabel htmlFor="cgpa" fontWeight={'normal'}>
                                    CGPA
                                </FormLabel>
                                <Input id="cgpa" name="gpa" value={item.gpa} placeholder="CGPA" onChange={(e) => handleEduInfo(index, e)} />
                                </FormControl>
                            </Flex>
                            <Flex mt="2%">
                                <FormControl mr="5%" >
                                <FormLabel htmlFor="university-name" fontWeight={'normal'}>
                                    Degree Name
                                </FormLabel>
                                <Input id="university-name" name="qualification" value={item.qualification} placeholder="Eg: Bachelor of Technology" onChange={(e) => handleEduInfo(index, e)} />
                                </FormControl>

                                <FormControl>
                                <FormLabel htmlFor="cgpa" fontWeight={'normal'}>
                                    Specialization
                                </FormLabel>
                                <Input id="cgpa" name="field" value={item.field} placeholder="Eg: Electrical Engineering" onChange={(e) => handleEduInfo(index, e)} />
                                </FormControl>
                            </Flex>
                        </>
                    )
                })
            }
            <Button
                onClick={handleAddEducation}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
                mt="2%">
                Add details
            </Button>
            <Button
                onClick={handleRemoveEducation}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
                mt="2%">
                Remove
            </Button>
            <FormControl mt="2%">
                <FormLabel htmlFor="degree" fontWeight={'normal'}>
                    Achievements
                </FormLabel>
                {
                    achievement.map((item, index) => {
                        return <Input id="achievement" name={index} m='1' value={item} type="text"  placeholder="Eg: Rank 1st in Hackethon" onChange={(e) => handleAchievement(index, e.target.value)}/>
                    })
                }
                <Button
                    onClick={handleAddAchievement}
                    colorScheme="teal"
                    variant="solid"
                    w="7rem"
                    mr="5%"
                    mt="2%">
                    Add details
                </Button> 
                <Button
                    onClick={handleRemoveAchievement}
                    colorScheme="teal"
                    variant="solid"
                    w="7rem"
                    mr="5%"
                    mt="2%">
                    Remove
                </Button>
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
                    onClick={handleForm2}
                    colorScheme="teal"
                    variant="outline">
                    Next
                </Button>
                </Flex>
        </>
    )
}
export {Form2}