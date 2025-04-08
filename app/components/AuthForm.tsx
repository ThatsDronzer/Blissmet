"use client"

import { auth, googleProvider } from "@/lib/firebase"
import { signInWithPopup } from "firebase/auth"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: "login" | "signup"
}

export function AuthForm({ className, mode, ...props }: AuthFormProps) {
  const { setIsLoggedIn } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [role, setRole] = useState<"customer" | "vendor">("customer")
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const passwordStrength = (password: string) => {
    const strengthChecks = {
      length: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    const strength = Object.values(strengthChecks).filter(Boolean).length

    return {
      score: strength,
      color: strength < 2 ? "bg-red-500" : strength < 4 ? "bg-yellow-500" : "bg-green-500",
    }
  }

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)

      if (result && result.user) {
        const { displayName, email, uid } = result.user

        const newUserData = {
          name: displayName,
          email: email,
          uid: uid,
          provider: "google",
          role: "customer",
        }

        try {
          const response = await axios.post("/api/users/isuserexist", { email })
          console.log("User existence check response:", response.data)
          if (response.data.exists) {
            // Call the login API to get the JWT token
            const loginResponse = await axios.post("/api/auth", { email, uid })
            const token = loginResponse.data.token
            localStorage.setItem("token", token)
            document.cookie = `token=${token}; path=/;`

            alert("Login successful")
            setIsLoggedIn(true)
            router.push("/dashboard/customer")
          } else {
            try {
              const newUser = await axios.post("/api/users", newUserData)
              if (newUser.status === 200) {
                // Call the login API to get the JWT token
                const loginResponse = await axios.post("/api/auth", { email, uid })
                const token = loginResponse.data.token
                localStorage.setItem("token", token)
                document.cookie = `token=${token}; path=/;`

                alert("User created successfully")
                setIsLoggedIn(true)
                router.push("/dashboard/customer")
              } else {
                alert("Failed to create user")
              }
            } catch (error) {
              console.error("Error creating user in backend:", error)
              alert("There was an issue creating your account.")
            }
          }
        } catch (error) {
          console.error("Error checking user existence:", error)
          alert("There was an issue checking user existence.")
        }
      } else {
        console.error("User sign-in failed or no user data available.")
        alert("Sign-in failed.")
      }
    } catch (error) {
      console.error("Error during Google login:", error)
      alert("There was an issue with Google login.")
    }
  }

  const signInWithFacebook = async () => {
    // try{
    //   const result = await signInWithPopup(auth, facebookProvider);
    //   console.log("Facebook login result : ", result);
    // }catch(error){
    //   console.error("error: ", error);
    // }
    alert("Not implemented")
  }

  const { score, color } = passwordStrength(password)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          {mode === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-full"
              />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder={mode === "signup" ? "Create a strong password" : "Enter your password"}
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {mode === "signup" && (
              <div className="h-2 mt-2 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  className={`h-full ${color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / 5) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </div>
          {mode === "signup" && (
            <div className="grid gap-2">
              <Label>User Role</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={role === "customer" ? "default" : "outline"}
                  onClick={() => setRole("customer")}
                  className="flex-1 rounded-full"
                >
                  Customer
                </Button>
                <Button
                  type="button"
                  variant={role === "vendor" ? "default" : "outline"}
                  onClick={() => setRole("vendor")}
                  className="flex-1 rounded-full"
                >
                  Vendor
                </Button>
              </div>
            </div>
          )}
          {mode === "login" && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}
          <Button disabled={isLoading} className="rounded-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "login" ? "Sign In" : "Sign Up"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Button onClick={signInWithGoogle} variant="outline" type="button" disabled={isLoading} className="rounded-full">
          Google
        </Button>
        <Button variant="outline" type="button" disabled={isLoading} className="rounded-full">
          Apple
        </Button>
        <Button onClick={signInWithFacebook} variant="outline" type="button" disabled={isLoading} className="rounded-full">
          Facebook
        </Button>
      </div>
    </div>
  )
}

