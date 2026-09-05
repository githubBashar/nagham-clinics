import { createContext, useContext, useState, type ReactNode } from 'react'
import { BookingModal } from '@/components/BookingPanel'

/** Global booking state: any CTA can open the booking modal via `openBooking()` */
const BookingContext = createContext<{ openBooking: () => void }>({ openBooking: () => {} })

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <BookingContext.Provider value={{ openBooking: () => setOpen(true) }}>
      {children}
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </BookingContext.Provider>
  )
}

export const useBooking = () => useContext(BookingContext)
