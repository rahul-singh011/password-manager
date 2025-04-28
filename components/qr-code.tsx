"use client"

import { useEffect, useRef } from "react"

interface QRCodeProps {
  value: string
  size?: number
}

export function QRCode({ value, size = 200 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const generateQRCode = async () => {
      if (!canvasRef.current) return

      // This is a mock implementation
      // In a real app, you would use a library like qrcode.js
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, size, size)

      // Draw a fake QR code pattern
      ctx.fillStyle = "#000000"

      // Draw border
      ctx.fillRect(20, 20, size - 40, 20)
      ctx.fillRect(20, size - 40, size - 40, 20)
      ctx.fillRect(20, 40, 20, size - 80)
      ctx.fillRect(size - 40, 40, 20, size - 80)

      // Draw position detection patterns
      // Top-left
      ctx.fillRect(40, 40, 40, 40)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(50, 50, 20, 20)
      ctx.fillStyle = "#000000"

      // Top-right
      ctx.fillRect(size - 80, 40, 40, 40)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(size - 70, 50, 20, 20)
      ctx.fillStyle = "#000000"

      // Bottom-left
      ctx.fillRect(40, size - 80, 40, 40)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(50, size - 70, 20, 20)
      ctx.fillStyle = "#000000"

      // Draw random dots to simulate QR code data
      for (let i = 0; i < 100; i++) {
        const x = 80 + Math.random() * (size - 160)
        const y = 80 + Math.random() * (size - 160)
        const s = 5 + Math.random() * 10
        ctx.fillRect(x, y, s, s)
      }
    }

    generateQRCode()
  }, [value, size])

  return <canvas ref={canvasRef} width={size} height={size} className="bg-white rounded-md" />
}
