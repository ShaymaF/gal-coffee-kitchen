"use client"

import { useState, useCallback } from "react"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

interface ConfirmOptions {
  title: string
  description: string
  confirmText?: string
  cancelText?: string
}

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions>({
    title: "Confirm",
    description: "Are you sure you want to continue?",
  })
  const [resolveReject, setResolveReject] = useState<{
    resolve: (value: boolean) => void
    reject: (reason?: any) => void
  } | null>(null)

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      setOptions(options)
      setResolveReject({ resolve, reject })
      setIsOpen(true)
    })
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    if (resolveReject) {
      resolveReject.resolve(false)
    }
  }, [resolveReject])

  const handleConfirm = useCallback(() => {
    if (resolveReject) {
      resolveReject.resolve(true)
    }
  }, [resolveReject])

  const ConfirmationDialog = useCallback(
    () => (
      <ConfirmDialog
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={options.title}
        description={options.description}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
      />
    ),
    [isOpen, handleClose, handleConfirm, options],
  )

  return { confirm, ConfirmationDialog }
}
