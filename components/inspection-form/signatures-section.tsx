"use client"

import { UseFormRegister, UseFormSetValue } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SignatureCanvas from "@/components/signature-canvas"
import { InspectionFormData } from "@/lib/types"

interface SignaturesSectionProps {
  register: UseFormRegister<InspectionFormData>
  setValue: UseFormSetValue<InspectionFormData>
}

export default function SignaturesSection({ register, setValue }: SignaturesSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
      <div className="space-y-4">
        <Label className="text-base font-bold text-foreground">Присъствал на прегледа:</Label>
        <SignatureCanvas
          onSave={(signature) => setValue("attendedBySignature", signature)}
        />
      </div>
      <div className="space-y-4">
        <Label className="text-base font-bold text-foreground">Извършил прегледа:</Label>
        <SignatureCanvas
          onSave={(signature) => setValue("performedBySignature", signature)}
        />
      </div>
    </div>
  )
}
