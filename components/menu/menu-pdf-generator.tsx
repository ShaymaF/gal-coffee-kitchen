"use client"

import { jsPDF } from "jspdf"
import { useState } from "react"
import { Download, Loader2 } from "lucide-react"

interface MenuItem {
  _id: string
  name: string
  category: string
  description: string | null
  price: {
    price: string
    isPromo: boolean
    pricePromo: number
  }
}

interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

interface MenuPDFGeneratorProps {
  menuCategories: MenuCategory[]
  className?: string
}

export function MenuPDFGenerator({ menuCategories, className = "" }: MenuPDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    if (isGenerating) return
    setIsGenerating(true)

    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })

      const darkGreen = [0, 68, 63]
      const beige = [231, 207, 171]
      const lightBeige = [255, 239, 211]

      doc.setFillColor(...darkGreen)
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F")

      // Add Logo
      const logo = new Image()
      logo.src = "/images/logo-beige.png"
      await new Promise((res) => (logo.onload = res))
      const pageWidth = doc.internal.pageSize.getWidth()
        const pageHeight = doc.internal.pageSize.getHeight()
const logoWidth = 120
const logoHeight = 80

const x1 = (pageWidth - logoWidth) / 2 // center horizontally
const y1 = (pageHeight - logoHeight) / 3 // center horizontally

      doc.addImage(logo, "PNG", x1, y1, logoWidth, logoHeight)

      doc.setFontSize(10)
      doc.setTextColor(...beige)
      doc.setFont("helvetica", "normal")
    //   doc.text("GAL COFFEE & KITCHEN", doc.internal.pageSize.getWidth() / 2, 65, { align: "center" })

      doc.setFontSize(36)
      doc.setFont("helvetica", "bold")
    //   doc.text("OUR MENU", doc.internal.pageSize.getWidth() / 2, 100, { align: "center" })

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text("71 Madison Ave, New York, NY 10016", doc.internal.pageSize.getWidth() / 2, 270, { align: "center" })

      doc.addPage()
      doc.setFillColor(...darkGreen)
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F")

      let y = 30
      const left = 25
      const right = doc.internal.pageSize.getWidth() - 25
      const contentWidth = right - left

      for (const category of menuCategories) {
        if (y > doc.internal.pageSize.getHeight() - 50) {
          doc.addPage()
          doc.setFillColor(...darkGreen)
          doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F")
          y = 30
        }

        doc.setFontSize(14)
        doc.setTextColor(...beige)
        doc.setFont("helvetica", "bold")
        doc.text(category.name.toUpperCase(), doc.internal.pageSize.getWidth() / 2, y, { align: "center" })

        y += 10

        for (const item of category.items) {
          if (y > doc.internal.pageSize.getHeight() - 40) {
            doc.addPage()
            doc.setFillColor(...darkGreen)
            doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F")
            y = 30
          }

          doc.setFontSize(9)
          doc.setFont("helvetica", "bold")
          doc.setTextColor(...beige)
          doc.text(item.name.toUpperCase(), left, y)

          const price = item.price.isPromo ? `$${item.price.pricePromo.toFixed(2)}` : `$${item.price.price}`
          const priceWidth = doc.getTextWidth(price)
          doc.text(price, right - priceWidth, y)

          y += 5

          if (item.description) {
            doc.setFontSize(8)
            doc.setFont("helvetica", "normal")
            doc.setTextColor(...lightBeige)
            const lines = doc.splitTextToSize(item.description, contentWidth)
            doc.text(lines, left, y)
            y += lines.length * 4 + 2
          } else {
            y += 4
          }

          doc.setDrawColor(...lightBeige)
          doc.setLineWidth(0.1)
          doc.line(left, y, right, y)
          y += 6
        }
        y += 10
      }

      const totalPages = doc.getNumberOfPages()
      for (let i = 2; i <= totalPages; i++) {
        doc.setPage(i)
        doc.setDrawColor(...lightBeige)
        doc.setLineWidth(0.3)
        doc.line(left + 30, doc.internal.pageSize.getHeight() - 15, right - 30, doc.internal.pageSize.getHeight() - 15)
        doc.setFontSize(8)
        doc.setTextColor(...lightBeige)
        doc.setFont("helvetica", "normal")
        doc.text(`${i - 1} / ${totalPages - 1}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" })
      }

      doc.save("gal-coffee-kitchen-menu.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className={`fidalgo-button text-gal-beige flex items-center justify-center gap-2 ${className}`}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          GENERATING PDF...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          DOWNLOAD FULL MENU (PDF)
        </>
      )}
    </button>
  )
}
