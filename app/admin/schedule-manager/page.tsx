"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Calendar, Clock, Edit, AlertTriangle, CheckCircle, X } from "lucide-react"

// Mock doctors data
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Smith",
    specialization: "Cardiologist",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Pediatrician",
  },
  {
    id: 3,
    name: "Dr. Emily Johnson",
    specialization: "Dermatologist",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialization: "General Surgeon",
  },
]

// Mock schedule data
const mockSchedules: Record<number, Array<{ day: string; startTime: string; endTime: string }>> = {
  1: [
    { day: "Monday", startTime: "09:00 AM", endTime: "05:00 PM" },
    { day: "Tuesday", startTime: "09:00 AM", endTime: "05:00 PM" },
    { day: "Wednesday", startTime: "09:00 AM", endTime: "01:00 PM" },
    { day: "Thursday", startTime: "09:00 AM", endTime: "05:00 PM" },
    { day: "Friday", startTime: "09:00 AM", endTime: "03:00 PM" },
  ],
  2: [
    { day: "Monday", startTime: "08:00 AM", endTime: "04:00 PM" },
    { day: "Tuesday", startTime: "08:00 AM", endTime: "04:00 PM" },
    { day: "Thursday", startTime: "08:00 AM", endTime: "04:00 PM" },
    { day: "Friday", startTime: "08:00 AM", endTime: "02:00 PM" },
  ],
  3: [
    { day: "Monday", startTime: "10:00 AM", endTime: "06:00 PM" },
    { day: "Wednesday", startTime: "10:00 AM", endTime: "06:00 PM" },
    { day: "Friday", startTime: "10:00 AM", endTime: "04:00 PM" },
  ],
  4: [
    { day: "Tuesday", startTime: "07:00 AM", endTime: "03:00 PM" },
    { day: "Wednesday", startTime: "07:00 AM", endTime: "03:00 PM" },
    { day: "Thursday", startTime: "07:00 AM", endTime: "03:00 PM" },
  ],
}

export default function DoctorScheduleManager() {
  const [selectedDoctor, setSelectedDoctor] = useState<number>(1)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showConflictWarning, setShowConflictWarning] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Update form state
  const [updateDate, setUpdateDate] = useState("")
  const [updateStartTime, setUpdateStartTime] = useState("")
  const [updateEndTime, setUpdateEndTime] = useState("")

  const currentDoctor = mockDoctors.find((doc) => doc.id === selectedDoctor)
  const currentSchedule = mockSchedules[selectedDoctor] || []

  const handleUpdateSchedule = () => {
    // Mock validation - simulate conflict detection
    if (updateStartTime && updateEndTime && updateDate) {
      // Simulate conflict (for demo purposes, show conflict randomly)
      const hasConflict = Math.random() > 0.5

      if (hasConflict) {
        setShowConflictWarning(true)
        setTimeout(() => setShowConflictWarning(false), 5000)
      } else {
        setShowSuccessMessage(true)
        setShowUpdateForm(false)
        setUpdateDate("")
        setUpdateStartTime("")
        setUpdateEndTime("")
        setTimeout(() => setShowSuccessMessage(false), 3000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-[#0ea5e9] rounded-lg">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">e-Clinic</span>
            <span className="text-sm text-slate-500 ml-2">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-slate-700 hover:text-[#0ea5e9]">
              Dashboard
            </Button>
            <Button variant="ghost" className="text-slate-700 hover:text-[#0ea5e9]">
              Doctors
            </Button>
            <Button variant="ghost" className="text-slate-700 hover:text-[#0ea5e9]">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Doctor Schedule Manager</h1>
          <p className="text-slate-600">Manage and update doctor availability schedules</p>
        </div>

        {/* Conflict Warning */}
        {showConflictWarning && (
          <Card className="mb-6 bg-red-50 border-red-300 border-2 p-4">
            <div className="flex items-center gap-3 text-red-700">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-bold text-lg">Schedule Conflict Detected</p>
                <p className="text-sm text-red-600 mt-1">
                  The selected time slot conflicts with an existing appointment. Please choose a different time or
                  resolve the conflict first.
                </p>
              </div>
              <button onClick={() => setShowConflictWarning(false)} className="text-red-700 hover:text-red-900">
                <X className="w-5 h-5" />
              </button>
            </div>
          </Card>
        )}

        {/* Success Message */}
        {showSuccessMessage && (
          <Card className="mb-6 bg-green-50 border-green-300 p-4">
            <div className="flex items-center gap-3 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <p className="font-semibold">Schedule updated successfully!</p>
            </div>
          </Card>
        )}

        {/* Doctor Filter */}
        <Card className="p-6 mb-6">
          <label className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0ea5e9]" />
            Select Doctor
          </label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] text-slate-800 font-medium bg-white"
          >
            {mockDoctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Schedule Table */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Current Schedule</h3>
              <Button
                onClick={() => setShowUpdateForm(!showUpdateForm)}
                className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Update Schedule
              </Button>
            </div>

            {/* Doctor Info */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-sky-50 rounded-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-[#0ea5e9] rounded-full">
                <span className="text-white font-bold text-lg">
                  {currentDoctor?.name.split(" ")[1]?.charAt(0) || "D"}
                </span>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-lg">{currentDoctor?.name}</p>
                <p className="text-sm text-slate-600">{currentDoctor?.specialization}</p>
              </div>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-700">Day</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-700">Start Time</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-700">End Time</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-700">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSchedule.map((schedule, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-800">{schedule.day}</td>
                      <td className="py-4 px-4 text-slate-700">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#0ea5e9]" />
                          {schedule.startTime}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#0ea5e9]" />
                          {schedule.endTime}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 text-sm">8 hours</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {currentSchedule.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>No schedule available for this doctor</p>
              </div>
            )}
          </Card>

          {/* Update Schedule Form */}
          <Card className={`p-6 h-fit ${showUpdateForm ? "border-[#0ea5e9] border-2" : ""}`}>
            <h3 className="text-lg font-bold text-slate-800 mb-6">Update Schedule</h3>

            {!showUpdateForm && (
              <div className="text-center py-8 text-slate-500">
                <Edit className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-sm">Click "Update Schedule" to modify doctor availability</p>
              </div>
            )}

            {showUpdateForm && (
              <div className="space-y-5">
                {/* Date Input */}
                <div>
                  <label htmlFor="date" className="text-sm font-semibold text-slate-700 mb-2 block">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={updateDate}
                    onChange={(e) => setUpdateDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  />
                </div>

                {/* Start Time Input */}
                <div>
                  <label htmlFor="start-time" className="text-sm font-semibold text-slate-700 mb-2 block">
                    New Start Time
                  </label>
                  <input
                    id="start-time"
                    type="time"
                    value={updateStartTime}
                    onChange={(e) => setUpdateStartTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  />
                </div>

                {/* End Time Input */}
                <div>
                  <label htmlFor="end-time" className="text-sm font-semibold text-slate-700 mb-2 block">
                    New End Time
                  </label>
                  <input
                    id="end-time"
                    type="time"
                    value={updateEndTime}
                    onChange={(e) => setUpdateEndTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    onClick={handleUpdateSchedule}
                    className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white py-3"
                    disabled={!updateDate || !updateStartTime || !updateEndTime}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Update Schedule
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowUpdateForm(false)
                      setUpdateDate("")
                      setUpdateStartTime("")
                      setUpdateEndTime("")
                    }}
                    className="w-full border-slate-300 text-slate-700"
                  >
                    Cancel
                  </Button>
                </div>

                {/* Info Box */}
                <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-700">
                    <strong>Note:</strong> Changes will be validated against existing appointments to prevent conflicts.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
