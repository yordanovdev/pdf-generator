"use client"

import { UseFormRegister, UseFormWatch } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InspectionFormData } from "@/lib/types"

interface GasDevicesProps {
  register: UseFormRegister<InspectionFormData>
  watch: UseFormWatch<InspectionFormData>
}

export default function GasDevices({ register, watch }: GasDevicesProps) {
  const gasDevices = watch("gasDevices")

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">и присъединените газови уреди, както следва:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {gasDevices.map((_, index) => (
          <Card key={index} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-5 space-y-4">
              <div className="space-y-2.5">
                <Label htmlFor={`gasRef${index}`} className="text-xs font-semibold text-muted-foreground">
                  рег. № 848-ГИ-...............{String(index + 1).padStart(2, "0")}
                </Label>
                <Input
                  id={`gasRef${index}`}
                  {...register(`gasDevices.${index}.ref`)}
                  placeholder="Референтен номер"
                  className="h-11"
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor={`gasType${index}`} className="text-xs font-semibold text-muted-foreground">
                  вид на уреда
                </Label>
                <Input
                  id={`gasType${index}`}
                  {...register(`gasDevices.${index}.type`)}
                  placeholder="Тип на уреда"
                  className="h-11"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
