import { Button } from "@/cssComponents/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/cssComponents/ui/card"
import { Input } from "@/cssComponents/ui/input"
import { Label } from "@/cssComponents/ui/label"
import { useNavigate } from "react-router-dom"
import React, { useRef } from 'react'
import axios from "axios"

function SignUp() {
        const usernameRef = useRef('')
        const emailRef = useRef('')
        const passwordRef = useRef('')
        const navigate = useNavigate()

        
        const handleSubmit = async (e) => {
            e.preventDefault()
            const userDetails = {
                user : usernameRef.current.value,
                email : emailRef.current.value,
                password : passwordRef.current.value
            }
            try{
                await axios.post("http://localhost:8000/sign-up", userDetails)
                navigate('/')                
            }catch(err){
                console.log(err)
            }
        }

  return (
    <div className='flex justify-center items-center h-screen'>
        <Card className="w-full max-w-sm">
            <CardHeader >
                <CardTitle className="text-center">Sign Up!</CardTitle>
                <CardDescription className="text-center">
                Sign in through email
                </CardDescription>
                {/* <CardAction>
                <Button variant="link">Sign Up</Button>
                </CardAction> */}
            </CardHeader>
            <CardContent className="w-full ">
                <form className="flex flex-cols gap-4 items-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6 w-full">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="username"
                                className="w-full"
                                placeholder="username"
                                ref={usernameRef}
                                required
                            />
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                className="w-full"
                                placeholder="m@example.com"
                                ref={emailRef}
                                required
                            />
                        </div>
                            <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>   
                            </div>
                            <Input id="password" className="w-full" type="password" placeholder ="********" ref={passwordRef} required />
                        </div>
                        <Button type="submit" className="w-full">
                        Sign Up
                        </Button>
                    </div>                        
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default SignUp
