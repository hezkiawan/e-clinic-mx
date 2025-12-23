"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ArrowLeft, Calendar, Clock, Stethoscope, CheckCircle } from "lucide-react"

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    image: "/female-doctor.png",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "General Practitioner",
    image: "/male-doctor.png",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Dermatologist",
    image: "/female-dermatologist.png",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialization: "Orthopedic Surgeon",
    image: "/male-surgeon.png",
  },
]

// Mock time slots
const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
]

export default function BookAppointment() {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)

  const handleConfirmBooking = () => {
    if (!selectedDoctor || !selectedDate || !selectedTimeSlot) {
      alert("Please fill in all fields to confirm your booking")
      return
    }

    const doctor = mockDoctors.find((d) => d.id === selectedDoctor)
    alert(
      `Appointment Confirmed!\n\nDoctor: ${doctor?.name}\nDate: ${selectedDate}\nTime: ${selectedTimeSlot}\n\nYou will receive a confirmation email shortly.`,
    )
  }

  const handleBack = () => {
    window.history.back()
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

            {/* Back Button */}
            <Button
              onClick={handleBack}
              variant="ghost"
              className="flex items-center gap-2 text-slate-600 hover:text-[#0ea5e9] hover:bg-sky-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[#0ea5e9]" />
            Book an Appointment
          </h1>
          <p className="text-slate-600">Select a doctor, date, and time for your appointment</p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Select Doctor Section */}
            <Card className="p-6 bg-white shadow-md">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#0ea5e9]" />
                Select Doctor
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor.id)}
                    className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedDoctor === doctor.id
                        ? "border-[#0ea5e9] bg-sky-50 shadow-md"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {selectedDoctor === doctor.id && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-5 h-5 text-[#0ea5e9] fill-[#0ea5e9]" />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <img
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                      />
                      <div>
                        <p className="font-semibold text-slate-800">{doctor.name}</p>
                        <p className="text-sm text-slate-600">{doctor.specialization}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Select Date Section */}
            <Card className="p-6 bg-white shadow-md">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0ea5e9]" />
                Select Date
              </h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#0ea5e9] focus:outline-none focus:ring-2 focus:ring-sky-100 text-slate-700 transition-all"
              />
            </Card>

            {/* Select Time Slot Section */}
            <Card className="p-6 bg-white shadow-md">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0ea5e9]" />
                Select Time Slot
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTimeSlot(time)}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      selectedTimeSlot === time
                        ? "bg-[#0ea5e9] text-white shadow-md transform scale-105"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-sm"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Summary Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white shadow-md sticky top-24">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Booking Summary</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Doctor</p>
                  <p className="font-medium text-slate-800">
                    {selectedDoctor ? mockDoctors.find((d) => d.id === selectedDoctor)?.name : "Not selected"}
                  </p>
                  {selectedDoctor && (
                    <p className="text-sm text-slate-600">
                      {mockDoctors.find((d) => d.id === selectedDoctor)?.specialization}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Date</p>
                  <p className="font-medium text-slate-800">{selectedDate || "Not selected"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Time</p>
                  <p className="font-medium text-slate-800">{selectedTimeSlot || "Not selected"}</p>
                </div>
              </div>
              <Button
                onClick={handleConfirmBooking}
                className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold py-6 shadow-lg hover:shadow-xl transition-all"
                disabled={!selectedDoctor || !selectedDate || !selectedTimeSlot}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Confirm Booking
              </Button>
              {(!selectedDoctor || !selectedDate || !selectedTimeSlot) && (
                <p className="text-sm text-slate-500 text-center mt-3">Please complete all fields to confirm</p>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
