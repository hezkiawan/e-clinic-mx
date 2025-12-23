"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, FileText, Pill, StickyNote, AlertCircle, CheckCircle, LogOut } from "lucide-react"
import { DesktopSidebar } from "@/components/desktop-sidebar"

// Mock patient data
const mockPatient = {
  name: "John Doe",
  age: 42,
  patientId: "P-2024-1523",
  appointmentDate: "January 15, 2024",
}

export default function AddMedicalRecord() {
  const [diagnosis, setDiagnosis] = useState("")
  const [treatment, setTreatment] = useState("")
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState({ diagnosis: false })
  const [showSuccess, setShowSuccess] = useState(false)

  const router = useRouter()

  const handleSaveRecord = () => {
    if (!diagnosis.trim()) {
      setErrors({ diagnosis: true })
      return
    }
    setErrors({ diagnosis: false })
    setShowSuccess(true)
    alert(`Medical Record Saved Successfully!\n\nPatient: ${mockPatient.name}\nDiagnosis: ${diagnosis}`)

    setTimeout(() => {
      setDiagnosis("")
      setTreatment("")
      setNotes("")
      setShowSuccess(false)
    }, 2000)
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
              <h1 className="text-2xl font-bold text-slate-800">Add Medical Record</h1>
              <p className="text-sm text-slate-600">Complete the medical record for your patient consultation</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg">
                <User className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Dr. Sarah Johnson</span>
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
          {/* Success Message */}
          {showSuccess && (
            <Card className="mb-6 bg-green-50 border-green-200 p-4">
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <p className="font-semibold">Medical record saved successfully!</p>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Patient Context */}
            <Card className="p-6 h-fit">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#0ea5e9]" />
                Patient Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#0ea5e9] rounded-full flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Patient</p>
                    <p className="text-slate-800 font-semibold text-lg">{mockPatient.name}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Patient ID:</span>
                    <span className="text-sm font-semibold text-slate-800">{mockPatient.patientId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Age:</span>
                    <span className="text-sm font-semibold text-slate-800">{mockPatient.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Date:</span>
                    <span className="text-sm font-semibold text-slate-800">{mockPatient.appointmentDate}</span>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700">
                  <FileText className="w-4 h-4 mr-2" />
                  View Medical History
                </Button>
              </div>
            </Card>

            {/* Right Column - Medical Record Form */}
            <Card className="col-span-2 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Medical Record Details</h3>

              <div className="space-y-6">
                {/* Diagnosis Field */}
                <div>
                  <label
                    htmlFor="diagnosis"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2"
                  >
                    <FileText className="w-4 h-4 text-[#0ea5e9]" />
                    Diagnosis *
                  </label>
                  <input
                    id="diagnosis"
                    type="text"
                    value={diagnosis}
                    onChange={(e) => {
                      setDiagnosis(e.target.value)
                      if (errors.diagnosis && e.target.value.trim()) {
                        setErrors({ diagnosis: false })
                      }
                    }}
                    placeholder="Enter primary diagnosis"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.diagnosis ? "border-red-500 bg-red-50" : "border-slate-300"
                    } focus:outline-none focus:ring-2 ${
                      errors.diagnosis ? "focus:ring-red-500" : "focus:ring-[#0ea5e9]"
                    } transition-all`}
                  />
                  {errors.diagnosis && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>Diagnosis is required</span>
                    </div>
                  )}
                </div>

                {/* Treatment/Prescription Field */}
                <div>
                  <label
                    htmlFor="treatment"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2"
                  >
                    <Pill className="w-4 h-4 text-[#0ea5e9]" />
                    Treatment / Prescription
                  </label>
                  <textarea
                    id="treatment"
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    placeholder="Enter prescribed medications, dosages, and treatment plan..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] transition-all resize-none"
                  />
                </div>

                {/* Notes Field */}
                <div>
                  <label htmlFor="notes" className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <StickyNote className="w-4 h-4 text-[#0ea5e9]" />
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional observations, follow-up recommendations, or remarks..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] transition-all resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleSaveRecord}
                    className="flex-1 bg-[#0ea5e9] hover:bg-[#0284c7] text-white py-6 text-lg font-semibold"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Save Record
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDiagnosis("")
                      setTreatment("")
                      setNotes("")
                      setErrors({ diagnosis: false })
                    }}
                    className="px-8 py-6 border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Clear Form
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
