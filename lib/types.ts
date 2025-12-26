export interface InspectionItem {
  id: number
  title: string
  goodCondition: boolean
  notes: string
  requiresName?: boolean
}

export interface GasDevice {
  ref: string
  type: string
}

export interface ReviewTypes {
  1: boolean
  2: boolean
  3: boolean
  4: boolean
  5: boolean
  6: boolean
}

export interface InspectionFormData {
  formNumber: string
  refNumber: string
  dateYear: string
  reviewTypes: ReviewTypes
  installationType: string
  installationAddress: string
  gasDevices: GasDevice[]
  inspector: string
  ownerName: string
  inspections: InspectionItem[]
  conclusion: string
  pressure: string
  deadlineSGI: string
  deadlineGasDevices: string
  attendedBySignature: string
  performedBySignature: string
  // Inspection 7 specific fields
  density7: string
  densityMinutes7: string
  // Inspection 8 (Other) specific fields  
  otherName: string
  otherMessage: string
}

// PDF output structure that matches the PDF form fields
export interface PdfFormData {
  // Document info
  documentNumber: string
  documentDate: string
  documentYear: string
  number: string
  
  // Review toggles
  reviewToggle1: boolean
  reviewToggle2: boolean
  reviewToggle3: boolean
  reviewToggle4: boolean
  reviewToggle5: boolean
  reviewToggle6: boolean
  
  // Gas installation
  gasInstalationType: string
  gasInstalationAddress: string
  gasInstalationNumber: string
  
  // Gas devices
  gasInstalationNumber1: string
  gasInstalationType1: string
  gasInstalationNumber2: string
  gasInstalationType2: string
  gasInstalationNumber3: string
  gasInstalationType3: string
  gasInstalationNumber4: string
  gasInstalationType4: string
  
  // Inspector and owner
  reviewerName: string
  ownerFullName: string
  
  // Inspection conditions (1-7)
  goodCondition1: boolean
  badCondition1: boolean
  conditionText1: string
  
  goodCondition2: boolean
  badCondition2: boolean
  conditionText2: string
  
  goodCondition3: boolean
  badCondition3: boolean
  conditionText3: string
  
  goodCondition4: boolean
  badCondition4: boolean
  conditionText4: string
  
  goodCondition5: boolean
  badCondition5: boolean
  conditionText5: string
  
  goodCondition6: boolean
  badCondition6: boolean
  conditionText6: string
  
  goodCondition7: boolean
  badCondition7: boolean
  conditionText7: string
  density7: string
  densityMinutes7: string
  
  // Other (inspection 8)
  otherName: string
  otherMessage: string
  
  // Conclusion
  conclusionText: string
  conclusionPressure: string
  
  // Period dates
  periodDate1: string
  periodDate2: string
  
  // Signatures (base64 data URLs)
  attendedBySignature: string
  performedBySignature: string
}

export function transformToPdfData(formData: InspectionFormData): PdfFormData {
  return {
    // Document info
    documentNumber: formData.formNumber,
    documentDate: formData.refNumber,
    documentYear: formData.dateYear,
    number: formData.formNumber,
    
    // Review toggles
    reviewToggle1: formData.reviewTypes[1],
    reviewToggle2: formData.reviewTypes[2],
    reviewToggle3: formData.reviewTypes[3],
    reviewToggle4: formData.reviewTypes[4],
    reviewToggle5: formData.reviewTypes[5],
    reviewToggle6: formData.reviewTypes[6],
    
    // Gas installation
    gasInstalationType: formData.installationType,
    gasInstalationAddress: formData.installationAddress,
    gasInstalationNumber: formData.refNumber,
    
    // Gas devices
    gasInstalationNumber1: formData.gasDevices[0]?.ref || "",
    gasInstalationType1: formData.gasDevices[0]?.type || "",
    gasInstalationNumber2: formData.gasDevices[1]?.ref || "",
    gasInstalationType2: formData.gasDevices[1]?.type || "",
    gasInstalationNumber3: formData.gasDevices[2]?.ref || "",
    gasInstalationType3: formData.gasDevices[2]?.type || "",
    gasInstalationNumber4: formData.gasDevices[3]?.ref || "",
    gasInstalationType4: formData.gasDevices[3]?.type || "",
    
    // Inspector and owner
    reviewerName: formData.inspector,
    ownerFullName: formData.ownerName,
    
    // Inspection conditions - goodCondition true means good ticked, bad unticked
    // goodCondition false means good unticked, bad ticked
    goodCondition1: formData.inspections[0]?.goodCondition ?? true,
    badCondition1: !(formData.inspections[0]?.goodCondition ?? true),
    conditionText1: formData.inspections[0]?.notes || "",
    
    goodCondition2: formData.inspections[1]?.goodCondition ?? true,
    badCondition2: !(formData.inspections[1]?.goodCondition ?? true),
    conditionText2: formData.inspections[1]?.notes || "",
    
    goodCondition3: formData.inspections[2]?.goodCondition ?? true,
    badCondition3: !(formData.inspections[2]?.goodCondition ?? true),
    conditionText3: formData.inspections[2]?.notes || "",
    
    goodCondition4: formData.inspections[3]?.goodCondition ?? true,
    badCondition4: !(formData.inspections[3]?.goodCondition ?? true),
    conditionText4: formData.inspections[3]?.notes || "",
    
    goodCondition5: formData.inspections[4]?.goodCondition ?? true,
    badCondition5: !(formData.inspections[4]?.goodCondition ?? true),
    conditionText5: formData.inspections[4]?.notes || "",
    
    goodCondition6: formData.inspections[5]?.goodCondition ?? true,
    badCondition6: !(formData.inspections[5]?.goodCondition ?? true),
    conditionText6: formData.inspections[5]?.notes || "",
    
    goodCondition7: formData.inspections[6]?.goodCondition ?? true,
    badCondition7: !(formData.inspections[6]?.goodCondition ?? true),
    conditionText7: formData.inspections[6]?.notes || "",
    density7: formData.density7,
    densityMinutes7: formData.densityMinutes7,
    
    // Other (inspection 8)
    otherName: formData.otherName,
    otherMessage: formData.otherMessage,
    
    // Conclusion
    conclusionText: formData.conclusion,
    conclusionPressure: formData.pressure,
    
    // Period dates
    periodDate1: formData.deadlineSGI,
    periodDate2: formData.deadlineGasDevices,
    
    // Signatures
    attendedBySignature: formData.attendedBySignature,
    performedBySignature: formData.performedBySignature,
  }
}

export const defaultInspections: InspectionItem[] = [
  {
    id: 1,
    title:
      "Външен преглед по чл. 367 от Наредбата по чл. 200 ал. 1 от 3Е /вкл. проверка чрез визуален оглед на: механичната цялост на СГИ, изправността на контролно измерителни уреди, наличие на неправомерни ремонти, реконструкции и монтаж на газови уредби, състоянието на площадката/помещенията в която е монтирано СПО и др./",
    goodCondition: true,
    notes: "",
    requiresName: false,
  },
  {
    id: 2,
    title: "Проверка за пропуски на газ с преносим газдетектор.",
    goodCondition: true,
    notes: "",
    requiresName: false,
  },
  {
    id: 3,
    title: "Проверка за изправното действие на блокировките и защитите на газовите уредби.",
    goodCondition: true,
    notes: "",
    requiresName: false,
  },
  {
    id: 4,
    title: "Инструктиран ползвател /правоспособен експлоатационен персонал/.",
    goodCondition: true,
    notes: "",
    requiresName: false,
  },
  {
    id: 5,
    title: "Проверка за наличието на ел. потенциал по инсталацията и корпусите на газовите уредби.",
    goodCondition: true,
    notes: "",
    requiresName: false,
  },
  {
    id: 6,
    title: "Проверка на документация от сервизен дневник относно профилактика и други документи.",
    goodCondition: true,
    notes: "",
    requiresName: false,
  },
  {
    id: 7,
    title: "Комбинирано изпитване на якост и плътност с Р =",
    goodCondition: true,
    notes: "",
    requiresName: true,
  },
  {
    id: 8,
    title: "Друго",
    goodCondition: true,
    notes: "",
    requiresName: true,
  },
]

export const defaultFormValues: InspectionFormData = {
  formNumber: "",
  refNumber: "",
  dateYear: "",
  reviewTypes: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  },
  installationType: "",
  installationAddress: "",
  gasDevices: [
    { ref: "", type: "" },
    { ref: "", type: "" },
    { ref: "", type: "" },
    { ref: "", type: "" },
  ],
  inspector: "",
  ownerName: "",
  inspections: defaultInspections,
  conclusion: "",
  pressure: "",
  deadlineSGI: "",
  deadlineGasDevices: "",
  attendedBySignature: "",
  performedBySignature: "",
  // Inspection 7 specific fields
  density7: "",
  densityMinutes7: "",
  // Inspection 8 (Other) specific fields
  otherName: "",
  otherMessage: "",
}
