"use client"

import { UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InspectionFormData } from "@/lib/types"

interface DeadlinesSectionProps {
  register: UseFormRegister<InspectionFormData>
}

export default function DeadlinesSection({ register }: DeadlinesSectionProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-base font-bold text-foreground">
        Срок за извършване на следващия периодичен технически преглед:
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2.5">
          <Label htmlFor="deadlineSGI" className="text-sm font-semibold text-foreground/80">
            до ... г. - за СГИ
          </Label>
          <Input
            id="deadlineSGI"
            {...register("deadlineSGI")}
            placeholder="дата"
            className="h-12 text-base"
          />
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="deadlineGasDevices" className="text-sm font-semibold text-foreground/80">
            до ... г. - за газови уреди
          </Label>
          <Input
            id="deadlineGasDevices"
            {...register("deadlineGasDevices")}
            placeholder="дата"
            className="h-12 text-base"
          />
        </div>
      </div>
    </div>
  )
}
