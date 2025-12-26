import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { PDFDocument } from "pdf-lib"
import { PdfFormData } from "@/lib/types"
import fontkit from "@pdf-lib/fontkit"

export async function POST(request: NextRequest) {
  try {
    const formData: PdfFormData = await request.json()

    // Read template PDF from disk
    const templatePath = path.join(process.cwd(), "public", "template.pdf")
    const existingPdfBytes = await fs.readFile(templatePath)

    // Load PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    pdfDoc.registerFontkit(fontkit)

    const fontPath = path.join(process.cwd(), "public", "fonts", "Roboto_SemiCondensed-Regular.ttf")
    const fontBytes = await fs.readFile(fontPath)
    const customFont = await pdfDoc.embedFont(fontBytes)

    const form = pdfDoc.getForm()

    // Fill text fields
    const textFields: (keyof PdfFormData)[] = [
      "documentNumber",
      "documentDate",
      "documentYear",
      "number",
      "gasInstalationType",
      "gasInstalationAddress",
      "gasInstalationNumber",
      "gasInstalationNumber1",
      "gasInstalationType1",
      "gasInstalationNumber2",
      "gasInstalationType2",
      "gasInstalationNumber3",
      "gasInstalationType3",
      "gasInstalationNumber4",
      "gasInstalationType4",
      "reviewerName",
      "ownerFullName",
      "conditionText1",
      "conditionText2",
      "conditionText3",
      "conditionText4",
      "conditionText5",
      "conditionText6",
      "conditionText7",
      "density7",
      "densityMinutes7",
      "otherName",
      "otherMessage",
      "conclusionText",
      "conclusionPressure",
      "periodDate1",
      "periodDate2",
    ]

    // Fill checkbox fields
    const checkboxFields: (keyof PdfFormData)[] = [
      "reviewToggle1",
      "reviewToggle2",
      "reviewToggle3",
      "reviewToggle4",
      "reviewToggle5",
      "reviewToggle6",
      "goodCondition1",
      "badCondition1",
      "goodCondition2",
      "badCondition2",
      "goodCondition3",
      "badCondition3",
      "goodCondition4",
      "badCondition4",
      "goodCondition5",
      "badCondition5",
      "goodCondition6",
      "badCondition6",
      "goodCondition7",
      "badCondition7",
    ]

    // Fill text fields
    for (const fieldName of textFields) {
      try {
        const field = form.getTextField(fieldName)
        const value = formData[fieldName]
        if (typeof value === "string") {
          field.setText(value)
          field.updateAppearances(customFont)
        }
      } catch {
        // Field doesn't exist in PDF, skip it
        console.warn(`Text field "${fieldName}" not found in PDF`)
      }
    }

    // Fill checkbox fields
    for (const fieldName of checkboxFields) {
      try {
        const field = form.getCheckBox(fieldName)
        const value = formData[fieldName]
        if (typeof value === "boolean" && value) {
          field.check()
        } else {
          field.uncheck()
        }
      } catch {
        // Field doesn't exist in PDF, skip it
        console.warn(`Checkbox field "${fieldName}" not found in PDF`)
      }
    }

    // Flatten form to make fields non-editable
    form.flatten()

    // Draw signatures on the PDF
    const pages = pdfDoc.getPages()
    const lastPage = pages[pages.length - 1]
    const { width, height } = lastPage.getSize()

    // Signature dimensions and positions (adjust these coordinates as needed)
    const signatureWidth = 150
    const signatureHeight = 50
    const bottomMargin = 55
    const leftSignatureX = 110  // X position for attended by signature
    const rightSignatureX = width - signatureWidth - 40  // X position for performed by signature

    // Draw attended by signature (left side)
    if (formData.attendedBySignature && formData.attendedBySignature.startsWith("data:image")) {
      try {
        const signatureData = formData.attendedBySignature.split(",")[1]
        const signatureBytes = Buffer.from(signatureData, "base64")
        
        // Check if it's PNG or JPEG based on data URL
        let signatureImage
        if (formData.attendedBySignature.includes("image/png")) {
          signatureImage = await pdfDoc.embedPng(signatureBytes)
        } else {
          signatureImage = await pdfDoc.embedJpg(signatureBytes)
        }

        lastPage.drawImage(signatureImage, {
          x: leftSignatureX,
          y: bottomMargin,
          width: signatureWidth,
          height: signatureHeight,
        })
      } catch (err) {
        console.warn("Failed to embed attended by signature:", err)
      }
    }

    // Draw performed by signature (right side)
    if (formData.performedBySignature && formData.performedBySignature.startsWith("data:image")) {
      try {
        const signatureData = formData.performedBySignature.split(",")[1]
        const signatureBytes = Buffer.from(signatureData, "base64")
        
        // Check if it's PNG or JPEG based on data URL
        let signatureImage
        if (formData.performedBySignature.includes("image/png")) {
          signatureImage = await pdfDoc.embedPng(signatureBytes)
        } else {
          signatureImage = await pdfDoc.embedJpg(signatureBytes)
        }

        lastPage.drawImage(signatureImage, {
          x: rightSignatureX,
          y: bottomMargin,
          width: signatureWidth,
          height: signatureHeight,
        })
      } catch (err) {
        console.warn("Failed to embed performed by signature:", err)
      }
    }

    // Draw stamp above performed by signature
    try {
      const stampPath = path.join(process.cwd(), "public", "stamp.png")
      const stampBytes = await fs.readFile(stampPath)
      const stampImage = await pdfDoc.embedPng(stampBytes)
      
      // Stamp dimensions and position (above the performed by signature)
      const stampWidth = 65
      const stampHeight = 51
      const stampX = rightSignatureX + 35  // Centered above signature
      const stampY = bottomMargin - 10  // 10px gap above signature

      lastPage.drawImage(stampImage, {
        x: stampX,
        y: stampY,
        width: stampWidth,
        height: stampHeight,
      })
    } catch (err) {
      console.warn("Failed to embed stamp:", err)
    }

    // Save PDF
    const pdfBytes = await pdfDoc.save()

    // Return PDF as downloadable response
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="inspection-report-${formData.documentNumber || "document"}.pdf"`,
        "Content-Length": pdfBytes.length.toString(),
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json(
      { error: "Failed to generate PDF", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
