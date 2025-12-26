"use client"

import { UseFormRegister, UseFormWatch, UseFormSetValue, Path } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { InspectionFormData } from "@/lib/types"

interface ReviewTypesProps {
  register: UseFormRegister<InspectionFormData>
  watch: UseFormWatch<InspectionFormData>
  setValue: UseFormSetValue<InspectionFormData>
}

const reviewTypeOptions = [
  { id: 1, path: "reviewTypes.1" as Path<InspectionFormData>, label: "Периодичен без изпитване на якост и плътност;" },
  { id: 2, path: "reviewTypes.2" as Path<InspectionFormData>, label: "ТП след преустройство;" },
  { id: 3, path: "reviewTypes.3" as Path<InspectionFormData>, label: "Периодичен с изпитване на якост и плътност;" },
  { id: 4, path: "reviewTypes.4" as Path<InspectionFormData>, label: "ТП след изтичане на дванадесет месеца без експлоатация;" },
  { id: 5, path: "reviewTypes.5" as Path<InspectionFormData>, label: "ТП след монтаж или ремонт на елементи под налягане;" },
  { id: 6, path: "reviewTypes.6" as Path<InspectionFormData>, label: "ТП по искане на ползвателя по съдържението;" },
] as const

export default function ReviewTypes({ watch, setValue }: ReviewTypesProps) {
  const reviewTypes = watch("reviewTypes")

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">За резултатите от извършения технически преглед:</h2>
      <div className="space-y-4 pl-2">
        {reviewTypeOptions.map((option) => (
          <div key={option.id} className="flex items-center gap-3">
            <Checkbox
              id={`review-${option.id}`}
              checked={reviewTypes[option.id]}
              onCheckedChange={(checked) => 
                setValue(option.path, checked as boolean)
              }
            />
            <Label htmlFor={`review-${option.id}`} className="cursor-pointer font-normal leading-relaxed text-foreground/90">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
