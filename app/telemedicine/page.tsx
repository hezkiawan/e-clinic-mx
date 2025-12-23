"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Heart, User, Activity } from "lucide-react"

// Mock patient data for the sidebar
const mockPatientData = {
  name: "John Smith",
  age: 42,
  appointmentTime: "10:00 AM",
  doctorName: "Dr. Sarah Johnson",
  reason: "Follow-up Consultation",
}

export default function TelemedicineRoom() {
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [callDuration] = useState("05:23")
  const [userType] = useState<"patient" | "doctor">("patient") // Mock: change to "doctor" to see doctor view

  const router = useRouter()

  const handleToggleMic = () => setIsMicOn(!isMicOn)
  const handleToggleVideo = () => setIsVideoOn(!isVideoOn)

  const handleEndCall = () => {
    if (confirm("Are you sure you want to end this call?")) {
      router.push("/dashboard/patient")
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Call Duration Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <span className="text-slate-400 text-sm">Telemedicine Session</span>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-400 font-medium">{callDuration}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 p-4">
        {/* Video Area - Main Section */}
        <div className="flex-1 relative">
          {/* Remote Video (Doctor) - Main Screen */}
          <Card className="h-full bg-slate-800 border-slate-700 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              {/* Placeholder for Remote Video */}
              <div className="text-center">
                <div className="flex items-center justify-center w-24 h-24 bg-[#0ea5e9]/20 rounded-full mb-4 mx-auto">
                  <User className="w-12 h-12 text-[#0ea5e9]" />
                </div>
                <p className="text-white text-lg font-semibold">{mockPatientData.doctorName}</p>
                <p className="text-slate-400 text-sm">Cardiologist</p>
              </div>
            </div>

            {/* Doctor Name Label */}
            <div className="absolute top-4 left-4 px-3 py-2 bg-slate-900/80 backdrop-blur-sm rounded-lg">
              <p className="text-white text-sm font-medium">{mockPatientData.doctorName}</p>
            </div>

            {/* Local Video (Patient) - PIP in bottom-right */}
            <div className="absolute bottom-24 right-4 w-32 h-24 md:w-48 md:h-36 bg-slate-700 rounded-lg overflow-hidden border-2 border-slate-600 shadow-2xl">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                {isVideoOn ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-sky-500/20 rounded-full mb-1 mx-auto">
                      <User className="w-6 h-6 text-sky-400" />
                    </div>
                    <p className="text-white text-xs font-medium">You</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <VideoOff className="w-6 h-6 text-slate-400 mb-1 mx-auto" />
                    <p className="text-slate-400 text-xs">Camera Off</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Control Bar - Patient: Bottom center for thumb reach, Doctor: Centered */}
          {userType === "patient" ? (
            // Patient Controls - Mobile optimized at bottom
            <div className="absolute bottom-4 left-0 right-0">
              <div className="max-w-md mx-auto px-4">
                <div className="flex items-center justify-center gap-4 px-6 py-4 bg-slate-800/95 backdrop-blur-sm rounded-full shadow-2xl">
                  <Button
                    onClick={handleToggleMic}
                    className={`w-16 h-16 rounded-full ${
                      isMicOn ? "bg-slate-700 hover:bg-slate-600" : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                  </Button>
                  <Button
                    onClick={handleToggleVideo}
                    className={`w-16 h-16 rounded-full ${
                      isVideoOn ? "bg-slate-700 hover:bg-slate-600" : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                  </Button>
                  <Button onClick={handleEndCall} className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700">
                    <PhoneOff className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Doctor Controls - Desktop centered
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-4 px-6 py-4 bg-slate-800/95 backdrop-blur-sm rounded-full shadow-2xl border border-slate-700">
                <Button
                  onClick={handleToggleMic}
                  className={`w-14 h-14 rounded-full ${
                    isMicOn ? "bg-slate-700 hover:bg-slate-600" : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </Button>
                <Button
                  onClick={handleToggleVideo}
                  className={`w-14 h-14 rounded-full ${
                    isVideoOn ? "bg-slate-700 hover:bg-slate-600" : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </Button>
                <Button onClick={handleEndCall} className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700">
                  <PhoneOff className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Patient Information */}
        {userType === "patient" && (
          <Card className="w-80 bg-slate-800 border-slate-700 p-6 flex-shrink-0">
            <div className="space-y-6">
              {/* Patient Info Header */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#0ea5e9]" />
                  Patient Information
                </h3>
              </div>

              {/* Patient Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#0ea5e9]/20 rounded-full flex-shrink-0">
                    <User className="w-6 h-6 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Patient Name</p>
                    <p className="text-white font-semibold">{mockPatientData.name}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <p className="text-sm text-slate-400 mb-1">Age</p>
                  <p className="text-white font-semibold text-lg">{mockPatientData.age} years</p>
                </div>

                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <p className="text-sm text-slate-400 mb-1">Appointment Time</p>
                  <p className="text-white font-semibold">{mockPatientData.appointmentTime}</p>
                </div>

                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <p className="text-sm text-slate-400 mb-1">Reason for Visit</p>
                  <p className="text-white font-semibold">{mockPatientData.reason}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-slate-700">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-white">
                    <Activity className="w-4 h-4 mr-2" />
                    View Medical History
                  </Button>
                  <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600 text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    View Vitals
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
