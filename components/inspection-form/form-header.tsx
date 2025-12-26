"use client"

import { UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InspectionFormData } from "@/lib/types"

interface FormHeaderProps {
  register: UseFormRegister<InspectionFormData>
}



export default function FormHeader({ register }: FormHeaderProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div className="space-y-2.5">
        <Label htmlFor="formNumber" className="text-sm font-semibold text-foreground/80">
          №
        </Label>
        <Input
          id="formNumber"
          {...register("formNumber")}
          placeholder="000"
          className="h-12 text-base"
        />
      </div>
      <div className="space-y-2.5">
        <Label htmlFor="refNumber" className="text-sm font-semibold text-foreground/80">
          рег. № 848 - ГИ -
        </Label>
        <Input
          id="refNumber"
          {...register("refNumber")}
          placeholder="..."
          className="h-12 text-base"
        />
      </div>
      <div className="space-y-2.5">
        <Label htmlFor="dateYear" className="text-sm font-semibold text-foreground/80">
          20....г.
        </Label>
        <Input
          id="dateYear"
          {...register("dateYear")}
          placeholder="20...г."
          className="h-12 text-base"
        />
      </div>
    </div>
  )
}
