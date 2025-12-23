"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Calendar, Clock, CheckCircle, ArrowLeft } from "lucide-react"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"

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

  const router = useRouter()

  const handleConfirmBooking = () => {
    if (!selectedDoctor || !selectedDate || !selectedTimeSlot) {
      alert("Please fill in all fields to confirm your booking")
      return
    }

    const doctor = mockDoctors.find((d) => d.id === selectedDoctor)
    alert(
      `Appointment Confirmed!\n\nDoctor: ${doctor?.name}\nDate: ${selectedDate}\nTime: ${selectedTimeSlot}\n\nYou will receive a confirmation email shortly.`,
    )

    // Navigate back after 1 second
    setTimeout(() => {
      router.push("/dashboard/patient")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 pb-20">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto border-x border-slate-200 min-h-screen bg-white shadow-xl">
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-200 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push("/dashboard/patient")} className="text-slate-600">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 flex-1">
              <div className="flex items-center justify-center w-10 h-10 bg-[#0ea5e9] rounded-lg">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Book Appointment</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-6 space-y-6">
          {/* Select Doctor */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Select Doctor</h2>
            <div className="space-y-3">
              {mockDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedDoctor === doctor.id
                      ? "border-2 border-[#0ea5e9] bg-sky-50 shadow-md"
                      : "border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 text-lg">{doctor.name}</p>
                      <p className="text-sm text-slate-600">{doctor.specialization}</p>
                    </div>
                    {selectedDoctor === doctor.id && <CheckCircle className="w-6 h-6 text-[#0ea5e9] fill-[#0ea5e9]" />}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Select Date */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#0ea5e9]" />
              Select Date
            </h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full h-12 px-4 border-2 border-slate-200 rounded-lg focus:border-[#0ea5e9] focus:outline-none text-slate-700 text-lg"
            />
          </div>

          {/* Select Time Slot - Touch-friendly grid */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#0ea5e9]" />
              Select Time
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTimeSlot(time)}
                  className={`h-12 rounded-lg font-semibold text-base transition-all ${
                    selectedTimeSlot === time
                      ? "bg-[#0ea5e9] text-white shadow-lg scale-105"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          {(selectedDoctor || selectedDate || selectedTimeSlot) && (
            <Card className="p-4 bg-sky-50 border-[#0ea5e9]">
              <h3 className="font-bold text-slate-800 mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Doctor:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedDoctor ? mockDoctors.find((d) => d.id === selectedDoctor)?.name : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date:</span>
                  <span className="font-semibold text-slate-800">{selectedDate || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Time:</span>
                  <span className="font-semibold text-slate-800">{selectedTimeSlot || "-"}</span>
                </div>
              </div>
            </Card>
          )}

          {/* Confirm Button */}
          <Button
            onClick={handleConfirmBooking}
            className="w-full h-14 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold text-lg shadow-lg"
            disabled={!selectedDoctor || !selectedDate || !selectedTimeSlot}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirm Booking
          </Button>
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </div>
  )
}
