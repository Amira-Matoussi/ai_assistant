// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import Link from "next/link"
// import { useLanguage } from "@/hooks/use-language"
// import { NextRequest, NextResponse } from "next/server"

// export default function LoginPage() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const { t } = useLanguage()
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   })

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       const response = await fetch("http://localhost:8000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       })

//       const data = await response.json()

//       if (response.ok) {
//         // Store user data in localStorage
//         localStorage.setItem("authToken", data.token)
//         localStorage.setItem("userId", data.user_id)
//         localStorage.setItem("userEmail", data.email)
//         localStorage.setItem("userRole", data.role)
//         localStorage.setItem("userFullName", data.full_name || "")

//         toast({
//           title: t("login.successTitle"),
//           description: t("login.successDescription").replace("{name}", data.full_name || data.email)
//         })

//         // Redirect to assistant selection
//         router.push("/assistant")
//       } else {
//         throw new Error(data.detail || "Invalid credentials")
//       }
//     } catch (error: any) {
//       toast({
//         title: t("login.failedTitle"),
//         description: error.message || t("login.failedDescription"),
//         variant: "destructive"
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">{t("login.title")}</CardTitle>
//           <p className="text-center text-gray-600 mt-2">{t("login.subtitle")}</p>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <Label htmlFor="email">{t("login.emailLabel")}</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder={t("login.emailPlaceholder")}
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//               />
//             </div>
            
//             <div>
//               <Label htmlFor="password">{t("login.passwordLabel")}</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder={t("login.passwordPlaceholder")}
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 required
//               />
//             </div>

//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading ? t("login.loggingIn") : t("login.button")}
//             </Button>
//           </form>

//           <div className="mt-6 space-y-2">
//             <div className="text-center text-sm text-gray-600">
//               {t("login.noAccount")}{" "}
//               <Link href="/auth/register" className="text-blue-600 hover:underline">
//                 {t("login.registerLink")}
//               </Link>
//             </div>

//             <div className="text-center text-sm text-gray-500">
//               {t("common.or")}{" "}
//               <Link href="/assistant" className="text-blue-600 hover:underline">
//                 {t("login.continueAsGuest")}
//               </Link>
//             </div>
//           </div>

//           <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
//             <p className="font-semibold text-blue-900">{t("login.demoAccount")}</p>
//             <p className="text-blue-700">{t("login.demoEmail")}</p>
//             <p className="text-blue-700">{t("login.demoPassword")}</p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [connectionStatus, setConnectionStatus] = useState<"checking" | "connected" | "disconnected" | null>(null)
  
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: ""
  })

  // Check backend connection
  const checkConnection = async () => {
    setConnectionStatus("checking")
    try {
      const response = await fetch("/api/check-config", {
        method: "GET",
        signal: AbortSignal.timeout(5000)
      })
      
      if (response.ok) {
        setConnectionStatus("connected")
        return true
      } else {
        setConnectionStatus("disconnected")
        return false
      }
    } catch (error) {
      setConnectionStatus("disconnected")
      return false
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Check connection first
    const isConnected = await checkConnection()
    if (!isConnected) {
      toast({
        title: "Connection Error",
        description: "Cannot connect to the authentication server. Please ensure the backend is running on port 8000.",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    try {
      // Validate input based on login method
      const identifier = loginMethod === "email" ? formData.email : formData.phone
      if (!identifier || !formData.password) {
        toast({
          title: "Missing Information",
          description: `Please enter your ${loginMethod} and password`,
          variant: "destructive"
        })
        setIsLoading(false)
        return
      }

      console.log(`🔐 Attempting login via ${loginMethod}:`, identifier.substring(0, 3) + "***")

      // Use Next.js API route instead of direct backend call
      const loginData = loginMethod === "email" 
        ? { email: formData.email, password: formData.password }
        : { phone: formData.phone, password: formData.password }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(loginData),
        signal: AbortSignal.timeout(15000) // 15 second timeout
      })

      console.log(`📡 Login response status: ${response.status}`)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Network error" }))
        
        // Handle specific error cases
        switch (response.status) {
          case 401:
            throw new Error("Invalid credentials. Please check your email/phone and password.")
          case 403:
            throw new Error("Account access denied. Please contact support.")
          case 404:
            throw new Error("Account not found. Please check your credentials or register.")
          case 429:
            throw new Error("Too many login attempts. Please try again later.")
          case 500:
            throw new Error("Server error. Please try again in a few minutes.")
          case 503:
            throw new Error("Authentication service is temporarily unavailable.")
          case 504:
            throw new Error("Connection timeout. Please check your internet connection.")
          default:
            throw new Error(errorData.error || `Login failed (${response.status})`)
        }
      }

      const data = await response.json()
      console.log("✅ Login successful:", data.email)

      // Validate response data
      if (!data.token || !data.user_id) {
        throw new Error("Invalid response from server. Please try again.")
      }

      // Store user data in localStorage
      localStorage.setItem("authToken", data.token)
      localStorage.setItem("userId", data.user_id?.toString() || "")
      localStorage.setItem("userEmail", data.email || "")
      localStorage.setItem("userPhone", data.phone || "")
      localStorage.setItem("userRole", data.role || "user")
      localStorage.setItem("userFullName", data.full_name || "")

      // Show success message
      toast({
        title: t("login.successTitle") || "Login Successful",
        description: (t("login.successDescription") || "Welcome back, {name}!").replace(
          "{name}", 
          data.full_name || data.email || "User"
        )
      })

      // Small delay to show success message
      setTimeout(() => {
        router.push("/assistant")
      }, 500)

    } catch (error: any) {
      console.error("❌ Login error:", error)
      
      // Handle network errors
      if (error.name === 'AbortError' || error.message?.includes('timeout')) {
        toast({
          title: "Connection Timeout",
          description: "The request timed out. Please check your connection and try again.",
          variant: "destructive"
        })
      } else if (error.message?.includes('fetch failed') || error.message?.includes('NetworkError')) {
        toast({
          title: "Network Error",
          description: "Cannot reach the server. Please check your connection and ensure the backend is running.",
          variant: "destructive"
        })
      } else {
        // Show the specific error message
        toast({
          title: t("login.failedTitle") || "Login Failed",
          description: error.message || t("login.failedDescription") || "Please check your credentials and try again.",
          variant: "destructive"
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '')
    
    // Add country code if missing
    if (digits.length > 0 && !digits.startsWith('216')) {
      if (digits.startsWith('0')) {
        return '+216' + digits.substring(1)
      } else if (digits.length <= 8) {
        return '+216' + digits
      }
    }
    
    // Format with country code
    if (digits.startsWith('216')) {
      return '+' + digits
    }
    
    return value.startsWith('+') ? value : '+' + digits
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData({ ...formData, phone: formatted })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            {t("login.title") || "Sign In"}
          </CardTitle>
          <p className="text-center text-gray-600 text-sm">
            {t("login.subtitle") || "Enter your credentials to access your account"}
          </p>
          
          {/* Connection Status Indicator */}
          {connectionStatus && (
            <div className={`flex items-center justify-center p-2 rounded-md text-xs ${
              connectionStatus === "connected" 
                ? "bg-green-50 text-green-700" 
                : connectionStatus === "disconnected"
                ? "bg-red-50 text-red-700"
                : "bg-yellow-50 text-yellow-700"
            }`}>
              {connectionStatus === "connected" && <CheckCircle className="w-3 h-3 mr-1" />}
              {connectionStatus === "disconnected" && <AlertCircle className="w-3 h-3 mr-1" />}
              {connectionStatus === "checking" && <div className="w-3 h-3 mr-1 border border-yellow-600 border-t-transparent rounded-full animate-spin" />}
              
              {connectionStatus === "connected" && "Server Connected"}
              {connectionStatus === "disconnected" && "Server Disconnected"}
              {connectionStatus === "checking" && "Checking Connection..."}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Login Method Tabs */}
          <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as "email" | "phone")} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              {/* Email Login */}
              <TabsContent value="email" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    {t("login.emailLabel") || "Email Address"}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("login.emailPlaceholder") || "Enter your email"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required={loginMethod === "email"}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Phone Login */}
              <TabsContent value="phone" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+216 XX XXX XXX"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="pl-10"
                      required={loginMethod === "phone"}
                      disabled={isLoading}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Format: +216 followed by your 8-digit number
                  </p>
                </div>
              </TabsContent>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  {t("login.passwordLabel") || "Password"}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.passwordPlaceholder") || "Enter your password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pr-10"
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5"
                disabled={isLoading || connectionStatus === "disconnected"}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("login.loggingIn") || "Signing In..."}
                  </div>
                ) : (
                  t("login.button") || "Sign In"
                )}
              </Button>
            </form>
          </Tabs>

          {/* Links and Actions */}
          <div className="space-y-4 pt-2">
            {/* Forgot Password */}
            <div className="text-center">
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  {t("common.or") || "Or"}
                </span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center text-sm text-gray-600">
              {t("login.noAccount") || "Don't have an account?"}{" "}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                {t("login.registerLink") || "Sign up"}
              </Link>
            </div>

            {/* Guest Access */}
            <div className="text-center text-sm">
              <Link href="/assistant" className="text-gray-500 hover:text-gray-700 hover:underline">
                {t("login.continueAsGuest") || "Continue as Guest"}
              </Link>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="text-center space-y-2">
              <p className="font-semibold text-blue-900 text-sm">
                {t("login.demoAccount") || "Demo Account"}
              </p>
              <div className="space-y-1 text-blue-700 text-xs">
                <p className="font-mono">
                  {t("login.demoEmail") || "Email: admin@ooredoo.com"}
                </p>
                <p className="font-mono">
                  {t("login.demoPassword") || "Password: admin123"}
                </p>
              </div>
              <p className="text-blue-600 text-xs">
                Use these credentials for testing
              </p>
            </div>
          </div>

          {/* Connection Help */}
          {connectionStatus === "disconnected" && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-red-700 space-y-1">
                  <p className="font-medium">Cannot connect to authentication server</p>
                  <p>Please ensure:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-red-600">
                    <li>Python backend is running on port 8000</li>
                    <li>Your internet connection is stable</li>
                    <li>No firewall is blocking the connection</li>
                  </ul>
                  <Button
                    onClick={checkConnection}
                    size="sm"
                    variant="outline"
                    className="mt-2 text-xs border-red-300 text-red-700 hover:bg-red-100"
                  >
                    Retry Connection
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}