
// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { 
//   BarChart3, Users, MessageSquare, Clock, Settings, Download, 
//   Trash2, RefreshCw, Search, Calendar, PlayCircle,
//   AudioLines, Eye, X
// } from "lucide-react"
// import { useLanguage } from "@/hooks/use-language"
// import { useRouter } from "next/navigation"
// import { useToast } from "@/hooks/use-toast"

// interface ConversationMessage {
//   id: string
//   user_message: string
//   ai_response: string
//   timestamp: string
//   audio_path?: string
// }

// interface ConversationSession {
//   session_id: string
//   user_email?: string
//   full_name?: string
//   language: string
//   message_count: number
//   first_message: string
//   last_activity: string
//   messages?: ConversationMessage[]
// }

// interface Statistics {
//   total_users?: number
//   total_sessions?: number
//   total_conversations?: number
//   active_days?: number
// }

// export default function EnhancedAdminDashboard() {
//   const { t } = useLanguage()
//   const router = useRouter()
//   const { toast } = useToast()
  
//   const [isLoading, setIsLoading] = useState(true)
//   const [sessions, setSessions] = useState<ConversationSession[]>([])
//   const [filteredSessions, setFilteredSessions] = useState<ConversationSession[]>([])
//   const [statistics, setStatistics] = useState<Statistics>({})
//   const [searchTerm, setSearchTerm] = useState("")
//   const [dateFilter, setDateFilter] = useState("")
//   const [selectedSession, setSelectedSession] = useState<ConversationSession | null>(null)
//   const [sessionMessages, setSessionMessages] = useState<ConversationMessage[]>([])
//   const [playingAudio, setPlayingAudio] = useState<string | null>(null)
//   const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)

//   useEffect(() => {
//     const userRole = localStorage.getItem("userRole")
//     const authToken = localStorage.getItem("authToken")
    
//     if (!authToken || userRole !== "admin") {
//       toast({
//         title: "Access Denied",
//         description: "Admin access required",
//         variant: "destructive"
//       })
//       router.push("/")
//       return
//     }

//     fetchDashboardData()
//   }, [])

//  // Add these debug logs to your fetchDashboardData function in admin dashboard

// const fetchDashboardData = async () => {
//   setIsLoading(true)
//   const token = localStorage.getItem("authToken")

//   try {
//     // Fetch statistics
//     console.log("🔍 DEBUG: Fetching statistics...")
//     const statsResponse = await fetch("http://localhost:8000/api/dashboard/statistics", {
//       headers: { "Authorization": `Bearer ${token}` }
//     })
    
//     if (statsResponse.ok) {
//       const stats = await statsResponse.json()
//       console.log("📊 DEBUG: Statistics received:", stats)
//       setStatistics(stats)
//     }

//     // Fetch sessions (grouped conversations) - CONFIRM THIS IS THE RIGHT ENDPOINT
//     console.log("🔍 DEBUG: Fetching SESSIONS (not conversations)...")
//     const sessionsResponse = await fetch("http://localhost:8000/api/dashboard/sessions", {
//       headers: { "Authorization": `Bearer ${token}` }
//     })

//     console.log("🔍 DEBUG: Sessions response status:", sessionsResponse.status)

//     if (sessionsResponse.ok) {
//       const sessionsData = await sessionsResponse.json()
//       console.log("🔍 DEBUG: Sessions data received:", sessionsData)
//       console.log("🔍 DEBUG: Number of sessions:", sessionsData.length)
      
//       // Log first session to see structure
//       if (sessionsData.length > 0) {
//         console.log("🔍 DEBUG: First session structure:", sessionsData[0])
//       }
      
//       setSessions(sessionsData)
//       setFilteredSessions(sessionsData)
//     } else {
//       const errorText = await sessionsResponse.text()
//       console.error("❌ DEBUG: Sessions endpoint failed:", errorText)
//     }

//   } catch (error) {
//     console.error("❌ DEBUG: Error fetching dashboard data:", error)
//     toast({
//       title: "Error",
//       description: "Failed to load dashboard data",
//       variant: "destructive"
//     })
//   } finally {
//     setIsLoading(false)
//   }
// }

//   // Search and filter functionality
//   useEffect(() => {
//     let filtered = sessions

//     if (searchTerm) {
//       filtered = filtered.filter(session => 
//         session.first_message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         session.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         session.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (dateFilter) {
//       filtered = filtered.filter(session => 
//         session.last_activity?.startsWith(dateFilter)
//       )
//     }

//     setFilteredSessions(filtered)
//   }, [searchTerm, dateFilter, sessions])

//   const fetchSessionMessages = async (sessionId: string) => {
//     const token = localStorage.getItem("authToken")
    
//     try {
//       const response = await fetch(`http://localhost:8000/api/dashboard/session/${sessionId}/messages`, {
//         headers: { "Authorization": `Bearer ${token}` }
//       })

//       if (response.ok) {
//         const messages = await response.json()
//         setSessionMessages(messages)
//       }
//     } catch (error) {
//       console.error("Error fetching session messages:", error)
//       toast({
//         title: "Error",
//         description: "Failed to load conversation messages",
//         variant: "destructive"
//       })
//     }
//   }

//   const viewSessionDetails = async (session: ConversationSession) => {
//     setSelectedSession(session)
//     await fetchSessionMessages(session.session_id)
//   }

//   const playAudioRecording = async (audioPath: string) => {
//     if (currentAudio) {
//       currentAudio.pause()
//       setCurrentAudio(null)
//       setPlayingAudio(null)
//     }

//     if (playingAudio === audioPath) {
//       return
//     }

//     try {
//       const audio = new Audio(`http://localhost:8000/recordings/${audioPath}`)
//       audio.onended = () => {
//         setPlayingAudio(null)
//         setCurrentAudio(null)
//       }
      
//       await audio.play()
//       setCurrentAudio(audio)
//       setPlayingAudio(audioPath)
//     } catch (error) {
//       console.error("Error playing audio:", error)
//       toast({
//         title: "Playback Error",
//         description: "Could not play audio recording",
//         variant: "destructive"
//       })
//     }
//   }

//   const exportToCSV = () => {
//     const csv = [
//       ["Session ID", "User", "Language", "Messages", "First Message", "Last Activity"],
//       ...filteredSessions.map(session => [
//         session.session_id,
//         session.user_email || "Guest",
//         session.language,
//         session.message_count.toString(),
//         session.first_message,
//         session.last_activity
//       ])
//     ].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n")

//     const blob = new Blob([csv], { type: "text/csv" })
//     const url = window.URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = `conversation-sessions-${new Date().toISOString().split("T")[0]}.csv`
//     a.click()
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
//           <p className="text-gray-600">Conversation Sessions Overview</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
//                   <p className="text-2xl font-bold text-gray-900">{statistics.total_users || 0}</p>
//                 </div>
//                 <div className="p-3 bg-gray-50 rounded-lg">
//                   <Users className="w-6 h-6 text-gray-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Total Sessions</p>
//                   <p className="text-2xl font-bold text-gray-900">{statistics.total_sessions || 0}</p>
//                 </div>
//                 <div className="p-3 bg-gray-50 rounded-lg">
//                   <MessageSquare className="w-6 h-6 text-gray-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Total Messages</p>
//                   <p className="text-2xl font-bold text-gray-900">{statistics.total_conversations || 0}</p>
//                 </div>
//                 <div className="p-3 bg-gray-50 rounded-lg">
//                   <MessageSquare className="w-6 h-6 text-gray-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Audio Recordings</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {sessions.reduce((total, session) => total + (session.messages?.filter(m => m.audio_path).length || 0), 0)}
//                   </p>
//                 </div>
//                 <div className="p-3 bg-gray-50 rounded-lg">
//                   <AudioLines className="w-6 h-6 text-gray-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search and Filter Bar */}
//         <Card className="mb-6">
//           <CardContent className="pt-6">
//             <div className="flex gap-4 flex-wrap">
//               <div className="flex-1 min-w-[200px]">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <Input
//                     placeholder="Search sessions..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
              
//               <Input
//                 type="date"
//                 value={dateFilter}
//                 onChange={(e) => setDateFilter(e.target.value)}
//                 className="w-[200px]"
//               />

//               <Button onClick={fetchDashboardData} variant="outline">
//                 <RefreshCw className="w-4 h-4 mr-2" />
//                 Refresh
//               </Button>

//               <Button onClick={exportToCSV} variant="outline">
//                 <Download className="w-4 h-4 mr-2" />
//                 Export CSV
//               </Button>
//             </div>
            
//             <div className="mt-4 text-sm text-gray-600">
//               Showing {filteredSessions.length} of {sessions.length} conversation sessions
//             </div>
//           </CardContent>
//         </Card>

//         {/* Sessions Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <MessageSquare className="w-5 h-5 mr-2" />
//               Conversation Sessions
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0">
//             <div className="max-h-[600px] overflow-auto">
//               <table className="w-full">
//                 <thead className="sticky top-0 bg-white border-b z-10">
//                   <tr>
//                     <th className="text-left p-4 bg-gray-50">Session ID</th>
//                     <th className="text-left p-4 bg-gray-50">User</th>
//                     <th className="text-left p-4 bg-gray-50">Messages</th>
//                     <th className="text-left p-4 bg-gray-50">First Message</th>
//                     <th className="text-left p-4 bg-gray-50">Language</th>
//                     <th className="text-left p-4 bg-gray-50">Last Activity</th>
//                     <th className="text-left p-4 bg-gray-50">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredSessions.length === 0 ? (
//                     <tr>
//                       <td colSpan={7} className="text-center py-8 text-gray-500">
//                         No conversation sessions found
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredSessions.map((session) => (
//                       <tr key={session.session_id} className="border-b hover:bg-gray-50">
//                         <td className="p-4 text-sm font-mono">
//                           {session.session_id.slice(-8)}...
//                         </td>
//                         <td className="p-4 text-sm">
//                           <div>
//                             <p className="font-medium">{session.full_name || "Guest"}</p>
//                             <p className="text-gray-500 text-xs">{session.user_email || "No email"}</p>
//                           </div>
//                         </td>
//                         <td className="p-4 text-sm">
//                           <Badge variant="secondary">{session.message_count} messages</Badge>
//                         </td>
//                         <td className="p-4 text-sm max-w-[200px] truncate">
//                           {session.first_message}
//                         </td>
//                         <td className="p-4">
//                           <Badge variant="outline">{session.language}</Badge>
//                         </td>
//                         <td className="p-4 text-sm">
//                           {new Date(session.last_activity).toLocaleString()}
//                         </td>
//                         <td className="p-4">
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => viewSessionDetails(session)}
//                           >
//                             <Eye className="w-4 h-4 mr-1" />
//                             View Details
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Session Details Dialog */}
//         <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
//           <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
//             <DialogHeader>
//               <div className="flex items-center justify-between">
//                 <DialogTitle>
//                   Conversation Session Details
//                 </DialogTitle>
//                 <Button 
//                   variant="ghost" 
//                   size="sm"
//                   onClick={() => setSelectedSession(null)}
//                 >
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//             </DialogHeader>
            
//             {selectedSession && (
//               <div className="space-y-4">
//                 {/* Session Info */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Session ID</p>
//                       <p className="font-mono text-sm">{selectedSession.session_id}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">User</p>
//                       <p className="text-sm">{selectedSession.full_name || "Guest"}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Language</p>
//                       <p className="text-sm">{selectedSession.language}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Messages</p>
//                       <p className="text-sm">{selectedSession.message_count}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Messages */}
//                 <div className="space-y-4">
//                   <h3 className="font-semibold">Conversation Messages</h3>
//                   {sessionMessages.map((message, index) => (
//                     <div key={message.id} className="space-y-2">
//                       {/* User Message */}
//                       <div className="bg-blue-50 p-3 rounded-lg">
//                         <div className="flex items-center justify-between mb-2">
//                           <span className="text-sm font-medium text-blue-600">User</span>
//                           <div className="flex items-center gap-2">
//                             <span className="text-xs text-gray-500">
//                               {new Date(message.timestamp).toLocaleString()}
//                             </span>
//                             {message.audio_path && (
//                               <Button
//                                 size="sm"
//                                 variant={playingAudio === message.audio_path ? "default" : "outline"}
//                                 onClick={() => playAudioRecording(message.audio_path!)}
//                               >
//                                 {playingAudio === message.audio_path ? (
//                                   <>
//                                     <AudioLines className="w-3 h-3 mr-1 animate-pulse" />
//                                     Playing
//                                   </>
//                                 ) : (
//                                   <>
//                                     <PlayCircle className="w-3 h-3 mr-1" />
//                                     Play
//                                   </>
//                                 )}
//                               </Button>
//                             )}
//                           </div>
//                         </div>
//                         <p className="text-gray-800">{message.user_message}</p>
//                       </div>
                      
//                       {/* AI Response */}
//                       <div className="bg-green-50 p-3 rounded-lg">
//                         <span className="text-sm font-medium text-green-600">AI Response</span>
//                         <p className="text-gray-800 mt-1">{message.ai_response}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  BarChart3, Users, MessageSquare, Clock, Settings, Download, 
  Trash2, RefreshCw, Search, Calendar, PlayCircle,
  AudioLines, Eye, X, Square, Volume2, Headphones, ArrowLeft
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface ConversationMessage {
  id: string
  user_message: string
  ai_response: string
  timestamp: string
  user_audio_path?: string
  ai_audio_path?: string
}

interface ConversationSession {
  session_id: string
  user_email?: string
  full_name?: string
  language: string
  message_count: number
  first_message: string
  last_activity: string
  user_audio_count?: number
  ai_audio_count?: number
  total_audio_count?: number
}

interface Statistics {
  total_users?: number
  total_sessions?: number
  total_conversations?: number
  total_audio_recordings?: number
  user_audio_recordings?: number
  ai_audio_recordings?: number
  active_days?: number
}

export default function CompleteAdminDashboard() {
  const { t } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = useState(true)
  const [sessions, setSessions] = useState<ConversationSession[]>([])
  const [filteredSessions, setFilteredSessions] = useState<ConversationSession[]>([])
  const [statistics, setStatistics] = useState<Statistics>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [selectedSession, setSelectedSession] = useState<ConversationSession | null>(null)
  const [sessionMessages, setSessionMessages] = useState<ConversationMessage[]>([])
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    const authToken = localStorage.getItem("authToken")
    
    if (!authToken || userRole !== "admin") {
      toast({
        title: "Access Denied",
        description: "Admin access required",
        variant: "destructive"
      })
      router.push("/")
      return
    }

    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    const token = localStorage.getItem("authToken")

    try {
      // Fetch statistics
      console.log("📊 Fetching admin statistics...")
      const statsResponse = await fetch("http://localhost:8000/api/dashboard/statistics", {
        headers: { "Authorization": `Bearer ${token}` }
      })
      
      if (statsResponse.ok) {
        const stats = await statsResponse.json()
        console.log("📊 Admin statistics received:", stats)
        setStatistics(stats)
      } else {
        console.error("❌ Failed to fetch statistics")
      }

      // Fetch sessions with audio counts
      console.log("📋 Fetching admin sessions...")
      const sessionsResponse = await fetch("http://localhost:8000/api/dashboard/sessions", {
        headers: { "Authorization": `Bearer ${token}` }
      })

      if (sessionsResponse.ok) {
        const sessionsData = await sessionsResponse.json()
        console.log("📋 Admin sessions received:", sessionsData.length, "sessions")
        
        setSessions(sessionsData)
        setFilteredSessions(sessionsData)
      } else {
        const errorText = await sessionsResponse.text()
        console.error("❌ Sessions endpoint failed:", errorText)
      }

    } catch (error) {
      console.error("❌ Error fetching admin dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Search and filter functionality
  useEffect(() => {
    let filtered = sessions

    if (searchTerm) {
      filtered = filtered.filter(session => 
        session.first_message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (dateFilter) {
      filtered = filtered.filter(session => 
        session.last_activity?.startsWith(dateFilter)
      )
    }

    setFilteredSessions(filtered)
  }, [searchTerm, dateFilter, sessions])

  const fetchSessionMessages = async (sessionId: string) => {
    const token = localStorage.getItem("authToken")
    
    try {
      console.log(`📋 Fetching messages for session: ${sessionId}`)
      const response = await fetch(`http://localhost:8000/api/dashboard/session/${sessionId}/messages`, {
        headers: { "Authorization": `Bearer ${token}` }
      })

      if (response.ok) {
        const messages = await response.json()
        console.log(`📋 Loaded ${messages.length} messages for session ${sessionId}`)
        
        // Count audio recordings in this session
        const userAudioCount = messages.filter((m: ConversationMessage) => m.user_audio_path).length
        const aiAudioCount = messages.filter((m: ConversationMessage) => m.ai_audio_path).length
        console.log(`🔊 Found ${userAudioCount} user audio + ${aiAudioCount} AI audio recordings`)
        
        setSessionMessages(messages)
      } else {
        console.error("❌ Failed to fetch session messages")
        toast({
          title: "Error",
          description: "Failed to load conversation messages",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("❌ Error fetching session messages:", error)
      toast({
        title: "Error",
        description: "Failed to load conversation messages",
        variant: "destructive"
      })
    }
  }

  const viewSessionDetails = async (session: ConversationSession) => {
    setSelectedSession(session)
    await fetchSessionMessages(session.session_id)
  }

  const playAudioRecording = async (audioPath: string) => {
    // Stop current audio if playing
    if (currentAudio) {
      currentAudio.pause()
      setCurrentAudio(null)
      setPlayingAudio(null)
    }

    // If clicking on the same audio, just stop it
    if (playingAudio === audioPath) {
      return
    }

    try {
      console.log(`🔊 Playing audio: ${audioPath}`)
      const audioUrl = `http://localhost:8000/recordings/${audioPath}`
      const audio = new Audio(audioUrl)
      
      // Set up event handlers
      audio.onloadstart = () => console.log(`🔊 Audio loading: ${audioPath}`)
      audio.oncanplay = () => console.log(`🔊 Audio ready: ${audioPath}`)
      audio.onended = () => {
        console.log(`🔊 Audio ended: ${audioPath}`)
        setPlayingAudio(null)
        setCurrentAudio(null)
      }
      audio.onerror = (e) => {
        console.error(`🔊 Audio error: ${audioPath}`, e)
        toast({
          title: "Playback Error",
          description: "Could not play audio recording. The file may not exist.",
          variant: "destructive"
        })
        setPlayingAudio(null)
        setCurrentAudio(null)
      }
      
      await audio.play()
      setCurrentAudio(audio)
      setPlayingAudio(audioPath)
      console.log(`🔊 Audio playing: ${audioPath}`)
    } catch (error) {
      console.error("❌ Error playing audio:", error)
      toast({
        title: "Playback Error",
        description: "Could not play audio recording",
        variant: "destructive"
      })
    }
  }

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      setCurrentAudio(null)
      setPlayingAudio(null)
      console.log("🔊 Audio stopped by admin")
    }
  }

  const downloadAudio = (audioPath: string) => {
    const link = document.createElement('a')
    link.href = `http://localhost:8000/recordings/${audioPath}`
    link.download = audioPath
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    console.log(`📥 Admin audio download initiated: ${audioPath}`)
  }

  const exportToCSV = () => {
    const csv = [
      ["Session ID", "User Email", "Full Name", "Language", "Messages", "User Audio", "AI Audio", "Total Audio", "First Message", "Last Activity"],
      ...filteredSessions.map(session => {
        const userAudioCount = session.user_audio_count || 0
        const aiAudioCount = session.ai_audio_count || 0
        return [
          session.session_id,
          session.user_email || "Guest",
          session.full_name || "Unknown",
          session.language,
          session.message_count.toString(),
          userAudioCount.toString(),
          aiAudioCount.toString(),
          (userAudioCount + aiAudioCount).toString(),
          session.first_message,
          session.last_activity
        ]
      })
    ].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `admin-voice-sessions-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
    console.log("📊 Admin CSV export completed")
  }

  const getLanguageDisplay = (lang: string) => {
    const languages: { [key: string]: string } = {
      "en-US": "English",
      "fr-FR": "Français", 
      "ar-SA": "العربية"
    }
    return languages[lang] || lang
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push("/auth/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Voice AI Assistant Analytics & Session Management</p>
            {playingAudio && (
              <div className="flex items-center gap-2 text-blue-600 mt-2">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span className="text-sm">Playing: {playingAudio}</span>
                <Button onClick={stopAudio} size="sm" variant="outline">
                  Stop
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/assistant">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Assistant
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.total_users || 0}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.total_sessions || 0}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.total_conversations || 0}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Audio</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistics.total_audio_recordings || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">User + AI</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Headphones className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">User Audio</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistics.user_audio_recordings || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">User recordings</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <AudioLines className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">AI Audio</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistics.ai_audio_recordings || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">AI responses</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <Volume2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4 flex-wrap items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search sessions by user, message, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-[200px]"
                placeholder="Filter by date"
              />

              <Button onClick={fetchDashboardData} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>

              <Button onClick={exportToCSV} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>

              {/* Audio Control Display */}
              {playingAudio && (
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                  <Volume2 className="w-4 h-4 animate-pulse text-blue-600" />
                  <span className="text-sm text-blue-600">Playing: {playingAudio}</span>
                  <Button onClick={stopAudio} variant="destructive" size="sm">
                    <Square className="w-4 h-4 mr-1" />
                    Stop
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
              <span>Showing {filteredSessions.length} of {sessions.length} sessions</span>
              <span>Total audio files: {statistics.total_audio_recordings || 0}</span>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Sessions Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Voice Conversation Sessions
              </div>
              <Badge variant="outline">{filteredSessions.length} sessions</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[600px] overflow-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-white border-b z-10">
                  <tr>
                    <th className="text-left p-4 bg-gray-50 font-medium">Session ID</th>
                    <th className="text-left p-4 bg-gray-50 font-medium">User</th>
                    <th className="text-left p-4 bg-gray-50 font-medium">Messages</th>
                    <th className="text-left p-4 bg-gray-50 font-medium">Audio Files</th>
                    <th className="text-left p-4 bg-gray-50 font-medium">First Message</th>
                    <th className="text-left p-4 bg-gray-50 font-medium">Language</th>
                    <th className="text-left p-4 bg-gray-50 font-medium">Last Activity</th>
                    <th className="text-left p-4 bg-gray-50 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSessions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-gray-500">
                        <div className="flex flex-col items-center">
                          <MessageSquare className="w-12 h-12 text-gray-300 mb-4" />
                          <p className="text-lg font-medium mb-2">No conversation sessions found</p>
                          <p className="text-sm">Try adjusting your search or date filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredSessions.map((session) => {
                      const userAudioCount = session.user_audio_count || 0
                      const aiAudioCount = session.ai_audio_count || 0
                      const totalAudio = userAudioCount + aiAudioCount
                      
                      return (
                        <tr key={session.session_id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="p-4 text-sm">
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                              {session.session_id.slice(-12)}...
                            </span>
                          </td>
                          <td className="p-4 text-sm">
                            <div>
                              <p className="font-medium text-gray-900">
                                {session.full_name || "Guest User"}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {session.user_email || "No email"}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 text-sm">
                            <Badge variant="secondary" className="text-xs">
                              {session.message_count} messages
                            </Badge>
                          </td>
                          <td className="p-4 text-sm">
                            {totalAudio > 0 ? (
                              <div className="flex items-center gap-2">
                                <Headphones className="w-4 h-4 text-orange-500" />
                                <div className="text-xs">
                                  <span className="font-medium text-orange-600">{totalAudio} total</span>
                                  <div className="text-gray-500">
                                    {userAudioCount}👤 + {aiAudioCount}🤖
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-xs">No audio</span>
                            )}
                          </td>
                          <td className="p-4 text-sm max-w-[200px]">
                            <p className="truncate" title={session.first_message}>
                              {session.first_message}
                            </p>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="text-xs">
                              {getLanguageDisplay(session.language)}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm">
                            <div className="text-xs text-gray-600">
                              {formatTimestamp(session.last_activity)}
                            </div>
                          </td>
                          <td className="p-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => viewSessionDetails(session)}
                              className="text-xs"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Session Details Dialog */}
        <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
          <DialogContent className="max-w-6xl max-h-[85vh] overflow-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl">
                  Voice Conversation Session Details
                </DialogTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedSession(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </DialogHeader>
            
            {selectedSession && (
              <div className="space-y-6">
                {/* Enhanced Session Info */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">Session Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Session ID</p>
                      <p className="font-mono text-sm bg-white px-2 py-1 rounded border">
                        {selectedSession.session_id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">User</p>
                      <div className="text-sm">
                        <p className="font-medium">{selectedSession.full_name || "Guest"}</p>
                        <p className="text-gray-500 text-xs">{selectedSession.user_email || "No email"}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Language</p>
                      <Badge variant="outline">{getLanguageDisplay(selectedSession.language)}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Messages</p>
                      <p className="text-lg font-bold text-blue-600">{selectedSession.message_count}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Audio Recordings</p>
                      <div className="text-sm">
                        <span className="font-medium text-orange-600">
                          {sessionMessages.filter(m => m.user_audio_path || m.ai_audio_path).length} total
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {sessionMessages.filter(m => m.user_audio_path).length} user • {" "}
                          {sessionMessages.filter(m => m.ai_audio_path).length} AI
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Last Activity</p>
                      <p className="text-sm">{formatTimestamp(selectedSession.last_activity)}</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Messages Display */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Conversation Messages ({sessionMessages.length})
                    </h3>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {sessionMessages.filter(m => m.user_audio_path).length} user audio
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {sessionMessages.filter(m => m.ai_audio_path).length} AI audio
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="max-h-[500px] overflow-y-auto space-y-6 pr-2 border rounded-lg p-4 bg-gray-50">
                    {sessionMessages.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p>No messages found for this session</p>
                      </div>
                    ) : (
                      sessionMessages.map((message, index) => (
                        <div key={message.id} className="space-y-4 border-b border-gray-200 pb-6 last:border-b-0">
                          {/* User Message */}
                          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-blue-700">
                                  👤 User Message #{index + 1}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                  {formatTimestamp(message.timestamp)}
                                </span>
                                {message.user_audio_path && (
                                  <div className="flex gap-1">
                                    {playingAudio === message.user_audio_path ? (
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={stopAudio}
                                      >
                                        <Square className="w-3 h-3 mr-1" />
                                        Stop
                                      </Button>
                                    ) : (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => playAudioRecording(message.user_audio_path!)}
                                      >
                                        <PlayCircle className="w-3 h-3 mr-1" />
                                        Play
                                      </Button>
                                    )}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => downloadAudio(message.user_audio_path!)}
                                      title="Download user audio"
                                    >
                                      <Download className="w-3 h-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-800 leading-relaxed">{message.user_message}</p>
                            {message.user_audio_path && (
                              <div className="mt-3 flex items-center text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                <AudioLines className="w-3 h-3 mr-1" />
                                <span>Audio file: {message.user_audio_path}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* AI Response */}
                          <div className="bg-green-50 border border-green-200 p-4 rounded-lg ml-8">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-green-700">
                                  🤖 AI Assistant Response
                                </span>
                              </div>
                              {message.ai_audio_path && (
                                <div className="flex gap-1">
                                  {playingAudio === message.ai_audio_path ? (
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={stopAudio}
                                    >
                                      <Square className="w-3 h-3 mr-1" />
                                      Stop
                                    </Button>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => playAudioRecording(message.ai_audio_path!)}
                                    >
                                      <Volume2 className="w-3 h-3 mr-1" />
                                      Play AI
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => downloadAudio(message.ai_audio_path!)}
                                    title="Download AI audio"
                                  >
                                    <Download className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-800 leading-relaxed">{message.ai_response}</p>
                            {message.ai_audio_path && (
                              <div className="mt-3 flex items-center text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                <AudioLines className="w-3 h-3 mr-1" />
                                <span>AI audio: {message.ai_audio_path}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { 
//   BarChart3, Users, MessageSquare, Clock, Settings, Download, 
//   Trash2, RefreshCw, Search, Calendar, PlayCircle,
//   AudioLines, Eye, X, Square, Volume2, Headphones
// } from "lucide-react"
// import { useLanguage } from "@/hooks/use-language"
// import { useRouter } from "next/navigation"
// import { useToast } from "@/hooks/use-toast"

// interface ConversationMessage {
//   id: string
//   user_message: string
//   ai_response: string
//   timestamp: string
//   user_audio_path?: string  // NEW
//   ai_audio_path?: string
// }

// interface ConversationSession {
//   session_id: string
//   user_email?: string
//   full_name?: string
//   language: string
//   message_count: number
//   first_message: string
//   last_activity: string
//   messages?: ConversationMessage[]
// }

// interface Statistics {
//   total_users?: number
//   total_sessions?: number
//   total_conversations?: number
//   total_audio_recordings?: number
//   active_days?: number
// }

// export default function EnhancedAdminDashboard() {
//   const { t } = useLanguage()
//   const router = useRouter()
//   const { toast } = useToast()
  
//   const [isLoading, setIsLoading] = useState(true)
//   const [sessions, setSessions] = useState<ConversationSession[]>([])
//   const [filteredSessions, setFilteredSessions] = useState<ConversationSession[]>([])
//   const [statistics, setStatistics] = useState<Statistics>({})
//   const [searchTerm, setSearchTerm] = useState("")
//   const [dateFilter, setDateFilter] = useState("")
//   const [selectedSession, setSelectedSession] = useState<ConversationSession | null>(null)
//   const [sessionMessages, setSessionMessages] = useState<ConversationMessage[]>([])
//   const [playingAudio, setPlayingAudio] = useState<string | null>(null)
//   const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)

//   useEffect(() => {
//     const userRole = localStorage.getItem("userRole")
//     const authToken = localStorage.getItem("authToken")
    
//     if (!authToken || userRole !== "admin") {
//       toast({
//         title: "Access Denied",
//         description: "Admin access required",
//         variant: "destructive"
//       })
//       router.push("/")
//       return
//     }

//     fetchDashboardData()
//   }, [])

//   const fetchDashboardData = async () => {
//     setIsLoading(true)
//     const token = localStorage.getItem("authToken")

//     try {
//       // Fetch statistics
//       console.log("📊 Fetching statistics...")
//       const statsResponse = await fetch("http://localhost:8000/api/dashboard/statistics", {
//         headers: { "Authorization": `Bearer ${token}` }
//       })
      
//       if (statsResponse.ok) {
//         const stats = await statsResponse.json()
//         console.log("📊 Statistics received:", stats)
//         setStatistics(stats)
//       }

//       // Fetch sessions
//       console.log("📋 Fetching sessions...")
//       const sessionsResponse = await fetch("http://localhost:8000/api/dashboard/sessions", {
//         headers: { "Authorization": `Bearer ${token}` }
//       })

//       if (sessionsResponse.ok) {
//         const sessionsData = await sessionsResponse.json()
//         console.log("📋 Sessions data received:", sessionsData.length, "sessions")
        
//         setSessions(sessionsData)
//         setFilteredSessions(sessionsData)
//       } else {
//         const errorText = await sessionsResponse.text()
//         console.error("❌ Sessions endpoint failed:", errorText)
//       }

//     } catch (error) {
//       console.error("❌ Error fetching dashboard data:", error)
//       toast({
//         title: "Error",
//         description: "Failed to load dashboard data",
//         variant: "destructive"
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Search and filter functionality
//   useEffect(() => {
//     let filtered = sessions

//     if (searchTerm) {
//       filtered = filtered.filter(session => 
//         session.first_message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         session.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         session.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (dateFilter) {
//       filtered = filtered.filter(session => 
//         session.last_activity?.startsWith(dateFilter)
//       )
//     }

//     setFilteredSessions(filtered)
//   }, [searchTerm, dateFilter, sessions])

//   const fetchSessionMessages = async (sessionId: string) => {
//     const token = localStorage.getItem("authToken")
    
//     try {
//       const response = await fetch(`http://localhost:8000/api/dashboard/session/${sessionId}/messages`, {
//         headers: { "Authorization": `Bearer ${token}` }
//       })

//       if (response.ok) {
//         const messages = await response.json()
//         console.log(`📋 Loaded ${messages.length} messages for session ${sessionId}`)
        
//         // Count audio recordings in this session
//         const userAudioCount = messages.filter((m: ConversationMessage) => m.user_audio_path).length
//         const aiAudioCount = messages.filter((m: ConversationMessage) => m.ai_audio_path).length
//         console.log(`🔊 ${userAudioCount} user audio + ${aiAudioCount} AI audio recordings found`)
        
//         setSessionMessages(messages)
//       }
//     } catch (error) {
//       console.error("Error fetching session messages:", error)
//       toast({
//         title: "Error",
//         description: "Failed to load conversation messages",
//         variant: "destructive"
//       })
//     }
//   }

//   const viewSessionDetails = async (session: ConversationSession) => {
//     setSelectedSession(session)
//     await fetchSessionMessages(session.session_id)
//   }

//   const playAudioRecording = async (audioPath: string) => {
//     // Stop current audio if playing
//     if (currentAudio) {
//       currentAudio.pause()
//       setCurrentAudio(null)
//       setPlayingAudio(null)
//     }

//     // If clicking on the same audio, just stop it
//     if (playingAudio === audioPath) {
//       return
//     }

//     try {
//       console.log(`🔊 Playing audio: ${audioPath}`)
//       const audioUrl = `http://localhost:8000/recordings/${audioPath}`
//       const audio = new Audio(audioUrl)
      
//       // Set up event handlers
//       audio.onloadstart = () => console.log(`🔊 Audio loading: ${audioPath}`)
//       audio.oncanplay = () => console.log(`🔊 Audio ready: ${audioPath}`)
//       audio.onended = () => {
//         console.log(`🔊 Audio ended: ${audioPath}`)
//         setPlayingAudio(null)
//         setCurrentAudio(null)
//       }
//       audio.onerror = (e) => {
//         console.error(`🔊 Audio error: ${audioPath}`, e)
//         toast({
//           title: "Playback Error",
//           description: "Could not play audio recording. The file may not exist.",
//           variant: "destructive"
//         })
//         setPlayingAudio(null)
//         setCurrentAudio(null)
//       }
      
//       await audio.play()
//       setCurrentAudio(audio)
//       setPlayingAudio(audioPath)
//       console.log(`🔊 Audio playing: ${audioPath}`)
//     } catch (error) {
//       console.error("Error playing audio:", error)
//       toast({
//         title: "Playback Error",
//         description: "Could not play audio recording",
//         variant: "destructive"
//       })
//     }
//   }

//   const stopAudio = () => {
//     if (currentAudio) {
//       currentAudio.pause()
//       currentAudio.currentTime = 0
//       setCurrentAudio(null)
//       setPlayingAudio(null)
//       console.log("🔊 Audio stopped")
//     }
//   }

//   const downloadAudio = (audioPath: string) => {
//     const link = document.createElement('a')
//     link.href = `http://localhost:8000/recordings/${audioPath}`
//     link.download = audioPath
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//     console.log(`📥 Audio download initiated: ${audioPath}`)
//   }

//   const exportToCSV = () => {
//     const csv = [
//       ["Session ID", "User", "Language", "Messages", "User Audio", "AI Audio", "Total Audio", "First Message", "Last Activity"],
//       ...filteredSessions.map(session => {
//         const userAudioCount = session.messages?.filter(m => m.user_audio_path).length || 0
//         const aiAudioCount = session.messages?.filter(m => m.ai_audio_path).length || 0
//         return [
//           session.session_id,
//           session.user_email || "Guest",
//           session.language,
//           session.message_count.toString(),
//           userAudioCount.toString(),
//           aiAudioCount.toString(),
//           (userAudioCount + aiAudioCount).toString(),
//           session.first_message,
//           session.last_activity
//         ]
//       })
//     ].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n")

//     const blob = new Blob([csv], { type: "text/csv" })
//     const url = window.URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = `voice-conversation-sessions-${new Date().toISOString().split("T")[0]}.csv`
//     a.click()
//     console.log("📊 CSV export completed")
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
//           <p className="text-gray-600">Voice AI Assistant Analytics & Session Management</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
//                   <p className="text-2xl font-bold text-gray-900">{statistics.total_users || 0}</p>
//                 </div>
//                 <div className="p-3 bg-blue-50 rounded-lg">
//                   <Users className="w-6 h-6 text-blue-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Sessions</p>
//                   <p className="text-2xl font-bold text-gray-900">{statistics.total_sessions || 0}</p>
//                 </div>
//                 <div className="p-3 bg-green-50 rounded-lg">
//                   <MessageSquare className="w-6 h-6 text-green-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Messages</p>
//                   <p className="text-2xl font-bold text-gray-900">{statistics.total_conversations || 0}</p>
//                 </div>
//                 <div className="p-3 bg-purple-50 rounded-lg">
//                   <MessageSquare className="w-6 h-6 text-purple-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Audio Recordings</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {statistics.total_audio_recordings || 0}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">User + AI Audio</p>
//                 </div>
//                 <div className="p-3 bg-orange-50 rounded-lg">
//                   <Headphones className="w-6 h-6 text-orange-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Active Days</p>
//                   <p className="text-2xl font-bold text-gray-900">{statistics.active_days || 0}</p>
//                 </div>
//                 <div className="p-3 bg-indigo-50 rounded-lg">
//                   <Calendar className="w-6 h-6 text-indigo-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search and Filter Bar */}
//         <Card className="mb-6">
//           <CardContent className="pt-6">
//             <div className="flex gap-4 flex-wrap items-center">
//               <div className="flex-1 min-w-[200px]">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <Input
//                     placeholder="Search sessions..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
              
//               <Input
//                 type="date"
//                 value={dateFilter}
//                 onChange={(e) => setDateFilter(e.target.value)}
//                 className="w-[200px]"
//               />

//               <Button onClick={fetchDashboardData} variant="outline">
//                 <RefreshCw className="w-4 h-4 mr-2" />
//                 Refresh
//               </Button>

//               <Button onClick={exportToCSV} variant="outline">
//                 <Download className="w-4 h-4 mr-2" />
//                 Export CSV
//               </Button>

//               {/* Audio Control */}
//               {playingAudio && (
//                 <div className="flex items-center gap-2">
//                   <Volume2 className="w-4 h-4 animate-pulse text-blue-600" />
//                   <span className="text-sm text-blue-600">Playing: {playingAudio}</span>
//                   <Button onClick={stopAudio} variant="destructive" size="sm">
//                     <Square className="w-4 h-4 mr-2" />
//                     Stop Audio
//                   </Button>
//                 </div>
//               )}
//             </div>
            
//             <div className="mt-4 text-sm text-gray-600">
//               <span>Showing {filteredSessions.length} of {sessions.length} sessions</span>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Sessions Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <MessageSquare className="w-5 h-5 mr-2" />
//               Voice Conversation Sessions
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0">
//             <div className="max-h-[600px] overflow-auto">
//               <table className="w-full">
//                 <thead className="sticky top-0 bg-white border-b z-10">
//                   <tr>
//                     <th className="text-left p-4 bg-gray-50">Session ID</th>
//                     <th className="text-left p-4 bg-gray-50">User</th>
//                     <th className="text-left p-4 bg-gray-50">Messages</th>
//                     <th className="text-left p-4 bg-gray-50">Audio Recordings</th>
//                     <th className="text-left p-4 bg-gray-50">First Message</th>
//                     <th className="text-left p-4 bg-gray-50">Language</th>
//                     <th className="text-left p-4 bg-gray-50">Last Activity</th>
//                     <th className="text-left p-4 bg-gray-50">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredSessions.length === 0 ? (
//                     <tr>
//                       <td colSpan={8} className="text-center py-8 text-gray-500">
//                         No conversation sessions found
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredSessions.map((session) => {
//                       const userAudioCount = session.messages?.filter(m => m.user_audio_path).length || 0
//                       const aiAudioCount = session.messages?.filter(m => m.ai_audio_path).length || 0
//                       const totalAudio = userAudioCount + aiAudioCount
                      
//                       return (
//                         <tr key={session.session_id} className="border-b hover:bg-gray-50">
//                           <td className="p-4 text-sm font-mono">
//                             {session.session_id.slice(-8)}...
//                           </td>
//                           <td className="p-4 text-sm">
//                             <div>
//                               <p className="font-medium">{session.full_name || "Guest"}</p>
//                               <p className="text-gray-500 text-xs">{session.user_email || "No email"}</p>
//                             </div>
//                           </td>
//                           <td className="p-4 text-sm">
//                             <Badge variant="secondary">{session.message_count} messages</Badge>
//                           </td>
//                           <td className="p-4 text-sm">
//                             {totalAudio > 0 ? (
//                               <div className="flex items-center gap-1">
//                                 <Headphones className="w-4 h-4 text-orange-500" />
//                                 <span className="text-orange-600 font-medium">{totalAudio}</span>
//                                 <span className="text-xs text-gray-500">
//                                   ({userAudioCount}👤 + {aiAudioCount}🤖)
//                                 </span>
//                               </div>
//                             ) : (
//                               <span className="text-gray-400">No audio</span>
//                             )}
//                           </td>
//                           <td className="p-4 text-sm max-w-[200px] truncate">
//                             {session.first_message}
//                           </td>
//                           <td className="p-4">
//                             <Badge variant="outline">{session.language}</Badge>
//                           </td>
//                           <td className="p-4 text-sm">
//                             {new Date(session.last_activity).toLocaleString()}
//                           </td>
//                           <td className="p-4">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() => viewSessionDetails(session)}
//                             >
//                               <Eye className="w-4 h-4 mr-1" />
//                               View Details
//                             </Button>
//                           </td>
//                         </tr>
//                       )
//                     })
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Session Details Dialog */}
//         <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
//           <DialogContent className="max-w-6xl max-h-[80vh] overflow-auto">
//             <DialogHeader>
//               <div className="flex items-center justify-between">
//                 <DialogTitle>
//                   Voice Conversation Session Details
//                 </DialogTitle>
//                 <Button 
//                   variant="ghost" 
//                   size="sm"
//                   onClick={() => setSelectedSession(null)}
//                 >
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//             </DialogHeader>
            
//             {selectedSession && (
//               <div className="space-y-4">
//                 {/* Session Info */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="grid grid-cols-3 gap-4">
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Session ID</p>
//                       <p className="font-mono text-sm">{selectedSession.session_id}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">User</p>
//                       <p className="text-sm">{selectedSession.full_name || "Guest"}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Language</p>
//                       <p className="text-sm">{selectedSession.language}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Messages</p>
//                       <p className="text-sm">{selectedSession.message_count}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Audio Recordings</p>
//                       <div className="text-sm">
//                         <span className="font-medium">{sessionMessages.filter(m => m.user_audio_path || m.ai_audio_path).length} total</span>
//                         <div className="text-xs text-gray-500">
//                           {sessionMessages.filter(m => m.user_audio_path).length} user + {sessionMessages.filter(m => m.ai_audio_path).length} AI
//                         </div>
//                       </div>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Last Activity</p>
//                       <p className="text-sm">{new Date(selectedSession.last_activity).toLocaleString()}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Messages */}
//                 <div className="space-y-4">
//                   <h3 className="font-semibold flex items-center">
//                     <MessageSquare className="w-5 h-5 mr-2" />
//                     Voice Conversation Messages ({sessionMessages.length})
//                   </h3>
//                   <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
//                     {sessionMessages.map((message, index) => (
//                       <div key={message.id} className="space-y-3 border-b pb-4 last:border-b-0">
//                         {/* User Message */}
//                         <div className="bg-blue-50 p-4 rounded-lg">
//                           <div className="flex items-center justify-between mb-2">
//                             <span className="text-sm font-medium text-blue-700 flex items-center">
//                               👤 User Message
//                             </span>
//                             <div className="flex items-center gap-2">
//                               <span className="text-xs text-gray-500">
//                                 {new Date(message.timestamp).toLocaleString()}
//                               </span>
//                               {message.user_audio_path && (
//                                 <div className="flex gap-1">
//                                   {playingAudio === message.user_audio_path ? (
//                                     <Button
//                                       size="sm"
//                                       variant="destructive"
//                                       onClick={stopAudio}
//                                     >
//                                       <Square className="w-3 h-3 mr-1" />
//                                       Stop
//                                     </Button>
//                                   ) : (
//                                     <Button
//                                       size="sm"
//                                       variant="outline"
//                                       onClick={() => playAudioRecording(message.user_audio_path!)}
//                                     >
//                                       <PlayCircle className="w-3 h-3 mr-1" />
//                                       Play User
//                                     </Button>
//                                   )}
//                                   <Button
//                                     size="sm"
//                                     variant="ghost"
//                                     onClick={() => downloadAudio(message.user_audio_path!)}
//                                     title="Download user audio"
//                                   >
//                                     <Download className="w-3 h-3" />
//                                   </Button>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                           <p className="text-gray-800">{message.user_message}</p>
//                           {message.user_audio_path && (
//                             <div className="mt-2 flex items-center text-xs text-blue-600">
//                               <AudioLines className="w-3 h-3 mr-1" />
//                               <span>User audio: {message.user_audio_path}</span>
//                             </div>
//                           )}
//                         </div>
                        
//                         {/* AI Response */}
//                         <div className="bg-green-50 p-4 rounded-lg ml-8">
//                           <div className="flex items-center justify-between mb-2">
//                             <span className="text-sm font-medium text-green-700 flex items-center">
//                               🤖 AI Assistant Response
//                             </span>
//                             {message.ai_audio_path && (
//                               <div className="flex gap-1">
//                                 {playingAudio === message.ai_audio_path ? (
//                                   <Button
//                                     size="sm"
//                                     variant="destructive"
//                                     onClick={stopAudio}
//                                   >
//                                     <Square className="w-3 h-3 mr-1" />
//                                     Stop
//                                   </Button>
//                                 ) : (
//                                   <Button
//                                     size="sm"
//                                     variant="outline"
//                                     onClick={() => playAudioRecording(message.ai_audio_path!)}
//                                   >
//                                     <PlayCircle className="w-3 h-3 mr-1" />
//                                     Play AI
//                                   </Button>
//                                 )}
//                                 <Button
//                                   size="sm"
//                                   variant="ghost"
//                                   onClick={() => downloadAudio(message.ai_audio_path!)}
//                                   title="Download AI audio"
//                                 >
//                                   <Download className="w-3 h-3" />
//                                 </Button>
//                               </div>
//                             )}
//                           </div>
//                           <p className="text-gray-800">{message.ai_response}</p>
//                           {message.ai_audio_path && (
//                             <div className="mt-2 flex items-center text-xs text-green-600">
//                               <AudioLines className="w-3 h-3 mr-1" />
//                               <span>AI audio: {message.ai_audio_path}</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   )
// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { 
//   BarChart3, Users, MessageSquare, Clock, Settings, Download, 
//   Trash2, RefreshCw, Search, Calendar, PlayCircle,
//   AudioLines, Eye, X, Square, Volume2, Headphones
// } from "lucide-react"
// import { useLanguage } from "@/hooks/use-language"
// import { useRouter } from "next/navigation"
// import { useToast } from "@/hooks/use-toast"

// interface ConversationMessage {
//   id: string
//   user_message: string
//   ai_response: string
//   timestamp: string
//   audio_path?: string
// }

// interface ConversationSession {
//   session_id: string
//   user_email?: string
//   full_name?: string
//   language: string
//   message_count: number
//   first_message: string
//   last_activity: string
//   messages?: ConversationMessage[]
// }

// interface Statistics {
//   total_users?: number
//   total_sessions?: number
//   total_conversations?: number
//   total_audio_recordings?: number
//   active_days?: number
// }

// export default function EnhancedAdminDashboard() {
//   const { t } = useLanguage()
//   const router = useRouter()
//   const { toast } = useToast()
  
//   const [isLoading, setIsLoading] = useState(true)
//   const [sessions, setSessions] = useState<ConversationSession[]>([])
//   const [filteredSessions, setFilteredSessions] = useState<ConversationSession[]>([])
//   const [statistics, setStatistics] = useState<Statistics>({})
//   const [searchTerm, setSearchTerm] = useState("")
//   const [dateFilter, setDateFilter] = useState("")
//   const [selectedSession, setSelectedSession] = useState<ConversationSession | null>(null)
//   const [sessionMessages, setSessionMessages] = useState<ConversationMessage[]>([])
//   const [playingAudio, setPlayingAudio] = useState<string | null>(null)
//   const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)

//   useEffect(() => {
//     const userRole = localStorage.getItem("userRole")
//     const authToken = localStorage.getItem("authToken")
    
//     if (!authToken || userRole !== "admin") {
//       toast({
//         title: "Access Denied",
//         description: "Admin access required",
//         variant: "destructive"
//       })
//       router.push("/")
//       return
//     }

//     fetchDashboardData()
//   }, [])

//   const fetchDashboardData = async () => {
//     setIsLoading(true)
//     const token = localStorage.getItem("authToken")

//     try {
//       // Fetch statistics
//       console.log("📊 Fetching statistics...")
//       const statsResponse = await fetch("http://localhost:8000/api/dashboard/statistics", {
//         headers: { "Authorization": `Bearer ${token}` }
//       })
      
//       if (statsResponse.ok) {
//         const stats = await statsResponse.json()
//         console.log("📊 Statistics received:", stats)
//         setStatistics(stats)
//       }

//       // Fetch sessions
//       console.log("📋 Fetching sessions...")
//       const sessionsResponse = await fetch("http://localhost:8000/api/dashboard/sessions", {
//         headers: { "Authorization": `Bearer ${token}` }
//       })

//       if (sessionsResponse.ok) {
//         const sessionsData = await sessionsResponse.json()
//         console.log("📋 Sessions data received:", sessionsData.length, "sessions")
        
//         // Calculate total audio recordings
//         const totalAudioRecordings = sessionsData.reduce((total: number, session: any) => 
//           total + (session.messages?.filter((m: any) => m.audio_path).length || 0), 0
//         )
        
//         setStatistics(prev => ({ ...prev, total_audio_recordings: totalAudioRecordings }))
//         setSessions(sessionsData)
//         setFilteredSessions(sessionsData)
//       } else {
//         const errorText = await sessionsResponse.text()
//         console.error("❌ Sessions endpoint failed:", errorText)
//       }

//     } catch (error) {
//       console.error("❌ Error fetching dashboard data:", error)
//       toast({
//         title: "Error",
//         description: "Failed to load dashboard data",
//         variant: "destructive"
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Search and filter functionality
//   useEffect(() => {
//     let filtered = sessions

//     if (searchTerm) {
//       filtered = filtered.filter(session => 
//         session.first_message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         session.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         session.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }

//     if (dateFilter) {
//       filtered = filtered.filter(session => 
//         session.last_activity?.startsWith(dateFilter)
//       )
//     }

//     setFilteredSessions(filtered)
//   }, [searchTerm, dateFilter, sessions])

//   const fetchSessionMessages = async (sessionId: string) => {
//     const token = localStorage.getItem("authToken")
    
//     try {
//       const response = await fetch(`http://localhost:8000/api/dashboard/session/${sessionId}/messages`, {
//         headers: { "Authorization": `Bearer ${token}` }
//       })

//       if (response.ok) {
//         const messages = await response.json()
//         console.log(`📋 Loaded ${messages.length} messages for session ${sessionId}`)
        
//         // Count audio recordings in this session
//         const audioCount = messages.filter((m: ConversationMessage) => m.audio_path).length
//         console.log(`🔊 ${audioCount} audio recordings found in this session`)
        
//         setSessionMessages(messages)
//       }
//     } catch (error) {
//       console.error("Error fetching session messages:", error)
//       toast({
//         title: "Error",
//         description: "Failed to load conversation messages",
//         variant: "destructive"
//       })
//     }
//   }

//   const viewSessionDetails = async (session: ConversationSession) => {
//     setSelectedSession(session)
//     await fetchSessionMessages(session.session_id)
//   }

//   const playAudioRecording = async (audioPath: string) => {
//     // Stop current audio if playing
//     if (currentAudio) {
//       currentAudio.pause()
//       setCurrentAudio(null)
//       setPlayingAudio(null)
//     }

//     // If clicking on the same audio, just stop it
//     if (playingAudio === audioPath) {
//       return
//     }

//     try {
//       console.log(`🔊 Playing audio: ${audioPath}`)
//       const audioUrl = `http://localhost:8000/recordings/${audioPath}`
//       const audio = new Audio(audioUrl)
      
//       // Set up event handlers
//       audio.onloadstart = () => console.log(`🔊 Audio loading: ${audioPath}`)
//       audio.oncanplay = () => console.log(`🔊 Audio ready: ${audioPath}`)
//       audio.onended = () => {
//         console.log(`🔊 Audio ended: ${audioPath}`)
//         setPlayingAudio(null)
//         setCurrentAudio(null)
//       }
//       audio.onerror = (e) => {
//         console.error(`🔊 Audio error: ${audioPath}`, e)
//         toast({
//           title: "Playback Error",
//           description: "Could not play audio recording. The file may not exist.",
//           variant: "destructive"
//         })
//         setPlayingAudio(null)
//         setCurrentAudio(null)
//       }
      
//       await audio.play()
//       setCurrentAudio(audio)
//       setPlayingAudio(audioPath)
//       console.log(`🔊 Audio playing: ${audioPath}`)
//     } catch (error) {
//       console.error("Error playing audio:", error)
//       toast({
//         title: "Playback Error",
//         description: "Could not play audio recording",
//         variant: "destructive"
//       })
//     }
//   }

//   const stopAudio = () => {
//     if (currentAudio) {
//       currentAudio.pause()
//       currentAudio.currentTime = 0
//       setCurrentAudio(null)
//       setPlayingAudio(null)
//       console.log("🔊 Audio stopped")
//     }
//   }

//   const downloadAudio = (audioPath: string) => {
//     const link = document.createElement('a')
//     link.href = `http://localhost:8000/recordings/${audioPath}`
//     link.download = audioPath
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//     console.log(`📥 Audio download initiated: ${audioPath}`)
//   }

//   const exportToCSV = () => {
//     const csv = [
//       ["Session ID", "User", "Language", "Messages", "Audio Recordings", "First Message", "Last Activity"],
//       ...filteredSessions.map(session => {
//         const audioCount = session.messages?.filter(m => m.audio_path).length || 0
//         return [
//           session.session_id,
//           session.user_email || "Guest",
//           session.language,
//           session.message_count.toString(),
//           audioCount.toString(),
//           session.first_message,
//           session.last_activity
//         ]
//       })
//     ].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n")

//     const blob = new Blob([csv], { type: "text/csv" })
//     const url = window.URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = `conversation-sessions-${new Date().toISOString().split("T")[0]}.csv`
//     a.click()
//     console.log("📊 CSV export completed")
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
//           <p className="text-gray-600">Voice AI Assistant Analytics & Session Management</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
//                   <p className="text-2xl font-bold text-gray-900">{statistics.total_users || 0}</p>
//                 </div>
//                 <div className="p-3 bg-blue-50 rounded-lg">
//                   <Users className="w-6 h-6 text-blue-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Sessions</p>
//                   <p className="text-2xl font-bold text-gray-900">{statistics.total_sessions || 0}</p>
//                 </div>
//                 <div className="p-3 bg-green-50 rounded-lg">
//                   <MessageSquare className="w-6 h-6 text-green-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Messages</p>
//                   <p className="text-2xl font-bold text-gray-900">{statistics.total_conversations || 0}</p>
//                 </div>
//                 <div className="p-3 bg-purple-50 rounded-lg">
//                   <MessageSquare className="w-6 h-6 text-purple-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Audio Recordings</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {statistics.total_audio_recordings || 
//                      sessions.reduce((total, session) => 
//                        total + (session.messages?.filter(m => m.audio_path).length || 0), 0)}
//                   </p>
//                 </div>
//                 <div className="p-3 bg-orange-50 rounded-lg">
//                   <Headphones className="w-6 h-6 text-orange-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">Active Days</p>
//                   <p className="text-2xl font-bold text-gray-900">{statistics.active_days || 0}</p>
//                 </div>
//                 <div className="p-3 bg-indigo-50 rounded-lg">
//                   <Calendar className="w-6 h-6 text-indigo-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search and Filter Bar */}
//         <Card className="mb-6">
//           <CardContent className="pt-6">
//             <div className="flex gap-4 flex-wrap items-center">
//               <div className="flex-1 min-w-[200px]">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <Input
//                     placeholder="Search sessions..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
              
//               <Input
//                 type="date"
//                 value={dateFilter}
//                 onChange={(e) => setDateFilter(e.target.value)}
//                 className="w-[200px]"
//               />

//               <Button onClick={fetchDashboardData} variant="outline">
//                 <RefreshCw className="w-4 h-4 mr-2" />
//                 Refresh
//               </Button>

//               <Button onClick={exportToCSV} variant="outline">
//                 <Download className="w-4 h-4 mr-2" />
//                 Export CSV
//               </Button>

//               {/* Audio Control */}
//               {playingAudio && (
//                 <Button onClick={stopAudio} variant="destructive" size="sm">
//                   <Square className="w-4 h-4 mr-2" />
//                   Stop Audio
//                 </Button>
//               )}
//             </div>
            
//             <div className="mt-4 text-sm text-gray-600 flex items-center gap-4">
//               <span>Showing {filteredSessions.length} of {sessions.length} sessions</span>
//               {playingAudio && (
//                 <div className="flex items-center gap-2 text-blue-600">
//                   <Volume2 className="w-4 h-4 animate-pulse" />
//                   <span>Playing: {playingAudio}</span>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Sessions Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <MessageSquare className="w-5 h-5 mr-2" />
//               Voice Conversation Sessions
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0">
//             <div className="max-h-[600px] overflow-auto">
//               <table className="w-full">
//                 <thead className="sticky top-0 bg-white border-b z-10">
//                   <tr>
//                     <th className="text-left p-4 bg-gray-50">Session ID</th>
//                     <th className="text-left p-4 bg-gray-50">User</th>
//                     <th className="text-left p-4 bg-gray-50">Messages</th>
//                     <th className="text-left p-4 bg-gray-50">Audio</th>
//                     <th className="text-left p-4 bg-gray-50">First Message</th>
//                     <th className="text-left p-4 bg-gray-50">Language</th>
//                     <th className="text-left p-4 bg-gray-50">Last Activity</th>
//                     <th className="text-left p-4 bg-gray-50">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredSessions.length === 0 ? (
//                     <tr>
//                       <td colSpan={8} className="text-center py-8 text-gray-500">
//                         No conversation sessions found
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredSessions.map((session) => {
//                       const audioCount = session.messages?.filter(m => m.audio_path).length || 0
//                       return (
//                         <tr key={session.session_id} className="border-b hover:bg-gray-50">
//                           <td className="p-4 text-sm font-mono">
//                             {session.session_id.slice(-8)}...
//                           </td>
//                           <td className="p-4 text-sm">
//                             <div>
//                               <p className="font-medium">{session.full_name || "Guest"}</p>
//                               <p className="text-gray-500 text-xs">{session.user_email || "No email"}</p>
//                             </div>
//                           </td>
//                           <td className="p-4 text-sm">
//                             <Badge variant="secondary">{session.message_count} messages</Badge>
//                           </td>
//                           <td className="p-4 text-sm">
//                             {audioCount > 0 ? (
//                               <div className="flex items-center gap-1">
//                                 <Headphones className="w-4 h-4 text-orange-500" />
//                                 <span className="text-orange-600 font-medium">{audioCount}</span>
//                               </div>
//                             ) : (
//                               <span className="text-gray-400">No audio</span>
//                             )}
//                           </td>
//                           <td className="p-4 text-sm max-w-[200px] truncate">
//                             {session.first_message}
//                           </td>
//                           <td className="p-4">
//                             <Badge variant="outline">{session.language}</Badge>
//                           </td>
//                           <td className="p-4 text-sm">
//                             {new Date(session.last_activity).toLocaleString()}
//                           </td>
//                           <td className="p-4">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() => viewSessionDetails(session)}
//                             >
//                               <Eye className="w-4 h-4 mr-1" />
//                               View Details
//                             </Button>
//                           </td>
//                         </tr>
//                       )
//                     })
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Session Details Dialog */}
//         <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
//           <DialogContent className="max-w-6xl max-h-[80vh] overflow-auto">
//             <DialogHeader>
//               <div className="flex items-center justify-between">
//                 <DialogTitle>
//                   Voice Conversation Session Details
//                 </DialogTitle>
//                 <Button 
//                   variant="ghost" 
//                   size="sm"
//                   onClick={() => setSelectedSession(null)}
//                 >
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//             </DialogHeader>
            
//             {selectedSession && (
//               <div className="space-y-4">
//                 {/* Session Info */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="grid grid-cols-3 gap-4">
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Session ID</p>
//                       <p className="font-mono text-sm">{selectedSession.session_id}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">User</p>
//                       <p className="text-sm">{selectedSession.full_name || "Guest"}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Language</p>
//                       <p className="text-sm">{selectedSession.language}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Messages</p>
//                       <p className="text-sm">{selectedSession.message_count}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Audio Recordings</p>
//                       <p className="text-sm">{sessionMessages.filter(m => m.audio_path).length}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">Last Activity</p>
//                       <p className="text-sm">{new Date(selectedSession.last_activity).toLocaleString()}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Messages */}
//                 <div className="space-y-4">
//                   <h3 className="font-semibold flex items-center">
//                     <MessageSquare className="w-5 h-5 mr-2" />
//                     Voice Conversation Messages ({sessionMessages.length})
//                   </h3>
//                   <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
//                     {sessionMessages.map((message, index) => (
//                       <div key={message.id} className="space-y-3 border-b pb-4 last:border-b-0">
//                         {/* User Message */}
//                         <div className="bg-blue-50 p-4 rounded-lg">
//                           <div className="flex items-center justify-between mb-2">
//                             <span className="text-sm font-medium text-blue-700 flex items-center">
//                               👤 User Message
//                             </span>
//                             <div className="flex items-center gap-2">
//                               <span className="text-xs text-gray-500">
//                                 {new Date(message.timestamp).toLocaleString()}
//                               </span>
//                               {message.audio_path && (
//                                 <div className="flex gap-1">
//                                   {playingAudio === message.audio_path ? (
//                                     <Button
//                                       size="sm"
//                                       variant="destructive"
//                                       onClick={stopAudio}
//                                     >
//                                       <Square className="w-3 h-3 mr-1" />
//                                       Stop
//                                     </Button>
//                                   ) : (
//                                     <Button
//                                       size="sm"
//                                       variant="outline"
//                                       onClick={() => playAudioRecording(message.audio_path!)}
//                                     >
//                                       <PlayCircle className="w-3 h-3 mr-1" />
//                                       Play Audio
//                                     </Button>
//                                   )}
//                                   <Button
//                                     size="sm"
//                                     variant="ghost"
//                                     onClick={() => downloadAudio(message.audio_path!)}
//                                     title="Download audio"
//                                   >
//                                     <Download className="w-3 h-3" />
//                                   </Button>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                           <p className="text-gray-800">{message.user_message}</p>
//                           {message.audio_path && (
//                             <div className="mt-2 flex items-center text-xs text-blue-600">
//                               <AudioLines className="w-3 h-3 mr-1" />
//                               <span>Audio recorded: {message.audio_path}</span>
//                             </div>
//                           )}
//                         </div>
                        
//                         {/* AI Response */}
//                         <div className="bg-green-50 p-4 rounded-lg ml-8">
//                           <span className="text-sm font-medium text-green-700 flex items-center mb-2">
//                             🤖 AI Assistant Response
//                           </span>
//                           <p className="text-gray-800">{message.ai_response}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   )
// }