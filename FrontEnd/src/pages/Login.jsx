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
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function LoginComponent() {

  const [error, setError] = useState(false);
  const navigate = useNavigate()
  const handleSignUp = () => {
    navigate("/sign-up")
  }

  const handleLoginSubmit = async (e) => {
    try{
      e.preventDefault()
      const email = e.target.email.value
      const password = e.target.password.value
      const response = await axios.post("http://localhost:8000/", {
        email: email,
        password: password
      })
      if (response.status === 200) {
        // Handle successful login, e.g., redirect to home
        localStorage.setItem("token", response.data.token)
        console.log("Login successful, token:", response.data.token)
        navigate("/home")
      }
    } catch(err){
      console.error("Login failed:", err)
      setError(true)
      navigate('/');
    }
    // e.preventDefault()
    // const email = e.target.email.value
    // const password = e.target.password.value
    // const response = await axios.post("http://localhost:8000/",{
    //   email : email, 
    //   password : password
    // })
    // if (response.status === 200) {
    //   // Handle successful login, e.g., redirect to home
    //   localStorage.setItem("token", response.data.token)
    //   console.log("Login successful, token:", response.data.token)
    //   navigate("/home")
    // } else {
    //   // Handle login error, e.g., show an error message
    //   console.error("Login failed:", response.data)
    //   navigate('/');
    // }

  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={handleSignUp}>Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLoginSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              {error && <p className="text-red-500">Invalid Credentials. Please try again</p>}
              <Button type="submit" className="w-full">
              Login
              </Button>
            </div>
          </form>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2"> */}
          
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        {/* </CardFooter> */}
      </Card>
    </div>
  )
}
