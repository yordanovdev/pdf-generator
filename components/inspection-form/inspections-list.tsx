"use client"

import { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { InspectionFormData } from "@/lib/types"

interface InspectionsListProps {
  register: UseFormRegister<InspectionFormData>
  watch: UseFormWatch<InspectionFormData>
  setValue: UseFormSetValue<InspectionFormData>
}

export default function InspectionsList({ register, watch, setValue }: InspectionsListProps) {
  const inspections = watch("inspections")

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">При прегледът се направили и констатирали:</h2>
      <div className="space-y-4">
        {inspections.map((inspection, index) => (
          <Card key={inspection.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-5 space-y-4">
              <h3 className="font-semibold text-base leading-relaxed text-foreground">
                {inspection.id}. {inspection.title}
              </h3>

              {/* Inspection 7 - density fields */}
              {inspection.id === 7 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                  <div className="space-y-2">
                    <Label htmlFor="density7" className="text-sm font-semibold text-foreground/80">
                      Плътност (mbar)
                    </Label>
                    <Input
                      id="density7"
                      {...register("density7")}
                      placeholder="mbar"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="densityMinutes7" className="text-sm font-semibold text-foreground/80">
                      Продължителност (минути)
                    </Label>
                    <Input
                      id="densityMinutes7"
                      {...register("densityMinutes7")}
                      placeholder="минути"
                      className="h-11"
                    />
                  </div>
                </div>
              )}

              {/* Inspection 8 - Other fields */}
              {inspection.id === 8 && (
                <div className="space-y-4 pb-2">
                  <div className="space-y-2">
                    <Label htmlFor="otherName" className="text-sm font-semibold text-foreground/80">
                      Име
                    </Label>
                    <Input
                      id="otherName"
                      {...register("otherName")}
                      placeholder="Въведете име..."
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otherMessage" className="text-sm font-semibold text-foreground/80">
                      Съобщение
                    </Label>
                    <Textarea
                      id="otherMessage"
                      {...register("otherMessage")}
                      placeholder="Въведете съобщение..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`good-${inspection.id}`}
                    checked={inspection.goodCondition}
                    onCheckedChange={(checked) =>
                      setValue(`inspections.${index}.goodCondition`, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`good-${inspection.id}`}
                    className="cursor-pointer font-medium text-foreground"
                  >
                    Добро състояние
                  </Label>
                </div>

                {!inspection.goodCondition && (
                  <div className="space-y-2.5 pl-8 pt-2">
                    <Label
                      htmlFor={`notes-${inspection.id}`}
                      className="text-sm font-semibold text-foreground/80"
                    >
                      Съобщение:
                    </Label>
                    <Textarea
                      id={`notes-${inspection.id}`}
                      {...register(`inspections.${index}.notes`)}
                      placeholder="Въведете описание на проблема..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
