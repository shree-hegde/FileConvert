"use client"

export interface ConversionProgressProps {
  isConverting: boolean
  progress: number
  status: string
}

export function ConversionProgress({ isConverting, progress, status }: ConversionProgressProps) {
  if (!isConverting && progress === 0) return null

  return (
    <div className="w-full space-y-3">
      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
        <div className="bg-primary h-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-sm text-muted-foreground text-center">{status}</p>
    </div>
  )
}
