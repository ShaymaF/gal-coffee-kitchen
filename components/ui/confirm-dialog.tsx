"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "CONFIRM",
  cancelText = "CANCEL",
  children,
}: ConfirmDialogProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Prevent scrolling when dialog is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md"
            >
              <div className="bg-gal-dark border border-gal-beige/20 rounded-sm shadow-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gal-beige/10">
                  <h3 className="text-xl font-light text-gal-beige font-serif">
                    {title}
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-gal-beige/50 hover:text-gal-beige transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                {/* Content */}
                <div className="p-6">
                  <p className="text-gal-beige/80 mb-6">{description}</p>
                  {children}
                </div>
                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t border-gal-beige/10">
                  <Button
                    variant="outline"
                    className="border-gal-beige/50 text-gal-beige/70 hover:bg-transparent hover:border-gal-beige hover:text-gal-beige"
                    onClick={onClose}
                  >
                    {cancelText}
                  </Button>
                  <Button
                    className="bg-gal-beige text-gal-dark hover:bg-gal-beige/90"
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                  >
                    {confirmText}
                  </Button>
                </div>{" "}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
