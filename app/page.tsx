"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InspectionFormData, defaultFormValues, transformToPdfData } from "@/lib/types"
import {
  FormHeader,
  ReviewTypes,
  InstallationDetails,
  GasDevices,
  InspectorInfo,
  InspectionsList,
  ConclusionSection,
  DeadlinesSection,
  SignaturesSection,
} from "@/components/inspection-form"

export default function InspectionForm() {
  const [isGenerating, setIsGenerating] = useState(false)
  const { register, handleSubmit, watch, setValue } = useForm<InspectionFormData>({
    defaultValues: defaultFormValues,
  })

  const onSubmit = async (data: InspectionFormData) => {
    setIsGenerating(true)
    try {
      const pdfData = transformToPdfData(data)
      
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pdfData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.details || "Failed to generate PDF")
      }

      // Get the PDF blob and trigger download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `inspection-report-${pdfData.documentNumber || "document"}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert(error instanceof Error ? error.message : "Failed to generate PDF")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-8">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center tracking-tight">РЕВИЗИОНЕН АКТ</CardTitle>
            <p className="text-center text-primary-foreground/90 text-sm mt-2">
              Технически преглед на газова инсталация
            </p>
          </CardHeader>

          <CardContent className="p-6 sm:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Form Header */}
              <FormHeader register={register} />

              {/* Review Types */}
              <ReviewTypes register={register} watch={watch} setValue={setValue} />

              {/* Installation Details */}
              <InstallationDetails register={register} />

              {/* Gas Devices */}
              <GasDevices register={register} watch={watch} />

              {/* Inspector and Owner Name */}
              <InspectorInfo register={register} />

              {/* Inspections */}
              <InspectionsList register={register} watch={watch} setValue={setValue} />

              {/* Conclusion */}
              <ConclusionSection register={register} />

              {/* Deadlines */}
              <DeadlinesSection register={register} />

              {/* Signatures */}
              <SignaturesSection register={register} setValue={setValue} />

              {/* Generate PDF Button */}
              <div className="flex justify-center pt-8">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isGenerating}
                  className="w-full sm:w-auto px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {isGenerating ? "Генериране..." : "Генериране на PDF"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}