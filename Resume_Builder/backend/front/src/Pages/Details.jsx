import { useState } from 'react'
import {
  Progress,
  Box,
} from '@chakra-ui/react'

import { Navbar } from '../Components/Navbar'
import { Form1 } from '../Components/Form1'
import { Form2 } from '../Components/Form2'
import { Form3 } from '../Components/Form3'
import { Form4 } from "../Components/Form4";


function Details({userState, setUserState}) {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    telNum: "",
    education: [],
    achievements: [],
    project: [],
    skills: []
  });

  return (
    <>
        <Navbar />
        <Box
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={800}
            p={6}
            m="10px auto"
            as="form">
            <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
            {step === 1 ? <Form1 userData={userData} setUserData={setUserData} step={step} setStep={setStep} progress={progress} setProgress={setProgress} /> : 
            step === 2 ? <Form2 userData={userData} setUserData={setUserData} step={step} setStep={setStep} progress={progress} setProgress={setProgress} /> : 
            step === 3 ? <Form3 userData={userData} setUserData={setUserData} step={step} setStep={setStep} progress={progress} setProgress={setProgress} /> : 
            <Form4 userState={userState} setUserState={setUserState} userData={userData} setUserData={setUserData} step={step} setStep={setStep} progress={progress} setProgress={setProgress} />}
        </Box>
    </>
  )
}

export {Details};