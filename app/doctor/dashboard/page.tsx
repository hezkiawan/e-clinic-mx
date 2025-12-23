"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, Calendar, CheckCircle, Users, Clock, Video, FilePlus, LogOut, TrendingUp } from "lucide-react"
import { DesktopSidebar } from "@/components/desktop-sidebar"

// Mock appointment data
const mockAppointments = [
  {
    id: 1,
    time: "09:00 AM",
    patientName: "John Doe",
    type: "Telemedicine",
    status: "Scheduled",
  },
  {
    id: 2,
    time: "10:30 AM",
    patientName: "Sarah Smith",
    type: "In-Person",
    status: "Scheduled",
  },
  {
    id: 3,
    time: "11:00 AM",
    patientName: "Michael Johnson",
    type: "Telemedicine",
    status: "Scheduled",
  },
  {
    id: 4,
    time: "02:00 PM",
    patientName: "Emily Davis",
    type: "In-Person",
    status: "Completed",
  },
  {
    id: 5,
    time: "03:30 PM",
    patientName: "David Wilson",
    type: "Telemedicine",
    status: "Scheduled",
  },
]

export default function DoctorDashboard() {
  const router = useRouter()

  const handleStartCall = () => {
    router.push("/telemedicine?role=doctor")
  }

  const handleAddRecord = () => {
    router.push("/doctor/add-record")
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DesktopSidebar userRole="doctor" />

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Welcome, Dr. Sarah Johnson</h1>
              <p className="text-sm text-slate-600">Here's your schedule for today</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg">
                <Calendar className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-700 mb-1">Pending Appointments</p>
                  <p className="text-4xl font-bold text-amber-900">5</p>
                  <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    For today
                  </p>
                </div>
                <div className="flex items-center justify-center w-16 h-16 bg-amber-200 rounded-full">
                  <Calendar className="w-8 h-8 text-amber-700" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">Completed Today</p>
                  <p className="text-4xl font-bold text-green-900">12</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +20% from yesterday
                  </p>
                </div>
                <div className="flex items-center justify-center w-16 h-16 bg-green-200 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-700" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-sky-700 mb-1">Total Patients</p>
                  <p className="text-4xl font-bold text-sky-900">48</p>
                  <p className="text-xs text-sky-600 mt-2 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Active patients
                  </p>
                </div>
                <div className="flex items-center justify-center w-16 h-16 bg-sky-200 rounded-full">
                  <Users className="w-8 h-8 text-sky-700" />
                </div>
              </div>
            </Card>
          </div>

          {/* Today's Appointments Table */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#0ea5e9]" />
              Today's Appointments
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Time</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Patient Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-medium text-slate-800">{appointment.time}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-[#0ea5e9] rounded-full">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-slate-800">{appointment.patientName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            appointment.type === "Telemedicine"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {appointment.type === "Telemedicine" ? (
                            <Video className="w-3 h-3" />
                          ) : (
                            <User className="w-3 h-3" />
                          )}
                          {appointment.type}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            appointment.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {appointment.status === "Completed" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {appointment.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          {appointment.type === "Telemedicine" && appointment.status !== "Completed" && (
                            <Button
                              onClick={handleStartCall}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Video className="w-4 h-4 mr-1.5" />
                              Start Call
                            </Button>
                          )}
                          <Button
                            onClick={handleAddRecord}
                            size="sm"
                            className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
                          >
                            <FilePlus className="w-4 h-4 mr-1.5" />
                            Add Record
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
