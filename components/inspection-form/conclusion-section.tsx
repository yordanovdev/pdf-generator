"use client"

import { UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { InspectionFormData } from "@/lib/types"



interface ConclusionSectionProps {
  register: UseFormRegister<InspectionFormData>
}

export default function ConclusionSection({ register }: ConclusionSectionProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-foreground">ЗАКЛЮЧЕНИЕ:</h2>
      <Textarea
        {...register("conclusion")}
        placeholder="Въведете заключение..."
        rows={4}
        className="resize-none"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2.5">
          <Label htmlFor="pressure" className="text-sm font-semibold text-foreground/80">
            Рраб (mbar)
          </Label>
          <Input
            id="pressure"
            {...register("pressure")}
            placeholder="mbar"
            className="h-12 text-base"
          />
        </div>
      </div>
    </div>
  )
}
