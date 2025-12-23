"use client"
import { useState } from "react"
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
  const [callDuration, setCallDuration] = useState("05:23")

  const handleToggleMic = () => {
    setIsMicOn(!isMicOn)
  }

  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn)
  }

  const handleEndCall = () => {
    if (confirm("Are you sure you want to end this call?")) {
      alert("Call ended. Redirecting to dashboard...")
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Top Header Bar */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-[#0ea5e9] rounded-lg">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-lg font-bold text-white">e-Clinic</span>
            <span className="text-slate-400 text-sm ml-4">Telemedicine Session</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-400 font-medium">{callDuration}</span>
            </div>
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
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-slate-700 rounded-lg overflow-hidden border-2 border-slate-600 shadow-2xl">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                {isVideoOn ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-sky-500/20 rounded-full mb-2 mx-auto">
                      <User className="w-8 h-8 text-sky-400" />
                    </div>
                    <p className="text-white text-xs font-medium">You</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <VideoOff className="w-8 h-8 text-slate-400 mb-2 mx-auto" />
                    <p className="text-slate-400 text-xs">Camera Off</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Control Bar - Bottom Center */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-4 px-6 py-4 bg-slate-800/95 backdrop-blur-sm rounded-full shadow-2xl border border-slate-700">
              {/* Mic Toggle */}
              <Button
                onClick={handleToggleMic}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isMicOn ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </Button>

              {/* Video Toggle */}
              <Button
                onClick={handleToggleVideo}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isVideoOn ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </Button>

              {/* End Call Button */}
              <Button
                onClick={handleEndCall}
                className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-all"
              >
                <PhoneOff className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar - Patient Information */}
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
      </div>
    </div>
  )
}
