"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Video, Clock, Stethoscope, Heart } from "lucide-react"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    date: "2024-01-15",
    time: "10:00 AM",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    type: "Telemedicine",
  },
  {
    id: 2,
    date: "2024-01-20",
    time: "2:30 PM",
    doctorName: "Dr. Michael Chen",
    specialty: "General Practitioner",
    type: "In-Person",
  },
  {
    id: 3,
    date: "2024-01-25",
    time: "11:15 AM",
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    type: "Telemedicine",
  },
]

// Mock data for medical history
const mockMedicalHistory = [
  {
    id: 1,
    date: "2023-12-10",
    diagnosis: "Annual Physical Checkup",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    date: "2023-11-05",
    diagnosis: "Seasonal Flu",
    doctor: "Dr. Michael Chen",
  },
  {
    id: 3,
    date: "2023-09-22",
    diagnosis: "Skin Allergy",
    doctor: "Dr. Emily Rodriguez",
  },
  {
    id: 4,
    date: "2023-07-18",
    diagnosis: "Routine Blood Work",
    doctor: "Dr. Sarah Johnson",
  },
]

export default function PatientDashboard() {
  const [patientName] = useState("John Smith")

  const router = useRouter()

  const handleJoinTelemedicine = (appointmentId: number) => {
    router.push("/telemedicine")
  }

  const handleBookAppointment = () => {
    router.push("/book-appointment")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 pb-20">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto border-x border-slate-200 min-h-screen bg-white shadow-xl">
        {/* Mobile Header */}
        <header className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] px-6 py-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <span className="text-2xl font-bold">e-Clinic</span>
              <p className="text-xs text-sky-100">Patient Portal</p>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1">Welcome back,</h1>
          <p className="text-xl text-sky-100">{patientName}</p>
        </header>

        {/* Main Content */}
        <main className="px-4 py-6 space-y-6">
          {/* Book Appointment Card - Prominent */}
          <Card className="p-6 bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] text-white shadow-lg border-0">
            <h3 className="text-xl font-bold mb-2">Book Appointment</h3>
            <p className="text-sky-100 mb-4 text-sm">Schedule your next visit</p>
            <Button
              onClick={handleBookAppointment}
              className="w-full h-12 bg-white text-[#0ea5e9] hover:bg-slate-50 font-semibold text-base shadow-md"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Now
            </Button>
          </Card>

          {/* Upcoming Appointments */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#0ea5e9]" />
              Upcoming
            </h2>
            <div className="space-y-4">
              {mockAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-4 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-sky-100 rounded-xl flex-shrink-0">
                      <Stethoscope className="w-6 h-6 text-[#0ea5e9]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 text-lg">{appointment.doctorName}</p>
                      <p className="text-sm text-slate-600">{appointment.specialty}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm">
                        <span className="flex items-center gap-1 text-slate-500">
                          <Calendar className="w-4 h-4" />
                          {appointment.date}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  {appointment.type === "Telemedicine" && (
                    <Button
                      onClick={() => handleJoinTelemedicine(appointment.id)}
                      className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
                    >
                      <Video className="w-5 h-5 mr-2" />
                      Join Telemedicine
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Medical History */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-[#0ea5e9]" />
              Medical History
            </h2>
            <Card className="shadow-md">
              <div className="divide-y divide-slate-100">
                {mockMedicalHistory.map((record) => (
                  <div key={record.id} className="p-4">
                    <p className="font-semibold text-slate-800 mb-1">{record.diagnosis}</p>
                    <p className="text-sm text-slate-600">{record.doctor}</p>
                    <p className="text-xs text-slate-500 mt-1">{record.date}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </div>
  )
}
