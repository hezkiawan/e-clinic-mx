"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, User, LogOut, Calendar, Video, Clock, Stethoscope } from "lucide-react"

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

  const handleLogout = () => {
    alert("Logged out successfully")
  }

  const handleJoinTelemedicine = (appointmentId: number) => {
    alert(`Joining telemedicine session for appointment #${appointmentId}`)
  }

  const handleBookAppointment = () => {
    alert("Redirecting to Book Appointment page")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-[#0ea5e9] rounded-lg">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">e-Clinic</span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-slate-600 hover:text-[#0ea5e9] hover:bg-sky-50"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </Button>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="flex items-center gap-2 text-slate-600 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back, {patientName}</h1>
          <p className="text-slate-600">Manage your appointments and view your medical history</p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Book Appointment Card - Prominent */}
          <Card className="col-span-1 md:col-span-2 p-6 bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] text-white shadow-xl hover:shadow-2xl transition-all border-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Book New Appointment</h3>
                <p className="text-sky-100 mb-4">Schedule a visit with our healthcare professionals</p>
                <Button
                  onClick={handleBookAppointment}
                  className="bg-white text-[#0ea5e9] hover:bg-slate-50 font-semibold shadow-md"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
              <Calendar className="w-20 h-20 text-sky-100 opacity-50" />
            </div>
          </Card>

          {/* Quick Stats Card */}
          <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                <Stethoscope className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Upcoming</p>
                <p className="text-2xl font-bold text-slate-800">{mockAppointments.length}</p>
                <p className="text-xs text-slate-500">Appointments</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Upcoming Appointments Section */}
        <Card className="mb-8 p-6 bg-white shadow-md">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#0ea5e9]" />
            Upcoming Appointments
          </h2>
          <div className="space-y-4">
            {mockAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-[#0ea5e9] hover:bg-sky-50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4 sm:mb-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-sky-100 rounded-lg flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{appointment.doctorName}</p>
                    <p className="text-sm text-slate-600">{appointment.specialty}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-sm text-slate-500">
                        <span className="font-medium">{appointment.date}</span>
                      </p>
                      <p className="text-sm text-slate-500">
                        <span className="font-medium">{appointment.time}</span>
                      </p>
                    </div>
                  </div>
                </div>
                {appointment.type === "Telemedicine" && (
                  <Button
                    onClick={() => handleJoinTelemedicine(appointment.id)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium shadow-md flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    Join Telemedicine
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Medical History Section */}
        <Card className="p-6 bg-white shadow-md">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-[#0ea5e9]" />
            Medical History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Diagnosis</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Doctor</th>
                </tr>
              </thead>
              <tbody>
                {mockMedicalHistory.map((record) => (
                  <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-slate-600">{record.date}</td>
                    <td className="py-3 px-4 text-sm text-slate-800 font-medium">{record.diagnosis}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{record.doctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
