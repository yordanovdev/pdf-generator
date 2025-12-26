"use client"

import { UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InspectionFormData } from "@/lib/types"

interface InstallationDetailsProps {
  register: UseFormRegister<InspectionFormData>
}

export default function InstallationDetails({ register }: InstallationDetailsProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2.5">
        <Label htmlFor="installationType" className="text-sm font-semibold text-foreground/80">
          на СПО: Страдна газова инсталация, тип
        </Label>
        <Input
          id="installationType"
          {...register("installationType")}
          placeholder="Въведете тип инсталация"
          className="h-12 text-base"
        />
      </div>
      <div className="space-y-2.5">
        <Label htmlFor="installationAddress" className="text-sm font-semibold text-foreground/80">
          монтирана на адрес:
        </Label>
        <Input
          id="installationAddress"
          {...register("installationAddress")}
          placeholder="Въведете адрес"
          className="h-12 text-base"
        />
      </div>
    </div>
  )
}
