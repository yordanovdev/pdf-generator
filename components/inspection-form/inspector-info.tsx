"use client"

import { UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InspectionFormData } from "@/lib/types"

interface InspectorInfoProps {
  register: UseFormRegister<InspectionFormData>
}

export default function InspectorInfo({ register }: InspectorInfoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="space-y-2.5">
        <Label htmlFor="inspector" className="text-sm font-semibold text-foreground/80">
          Прегледа се извърши от инж.
        </Label>
        <Input
          id="inspector"
          {...register("inspector")}
          placeholder="Име на инспектор"
          className="h-12 text-base"
        />
      </div>
      <div className="space-y-2.5">
        <Label htmlFor="ownerName" className="text-sm font-semibold text-foreground/80">
          Име на собственика
        </Label>
        <Input
          id="ownerName"
          {...register("ownerName")}
          placeholder="Пълно име на собственика"
          className="h-12 text-base"
        />
      </div>
    </div>
  )
}
