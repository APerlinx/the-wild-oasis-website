'use client'

import { createContext, use, useContext, useState } from 'react'

const ReservationContext = createContext()

const intialState = { from: undefined, to: undefined }

function ReservationProvider({ children }) {
  const [range, setRange] = useState(intialState)

  const resetRange = () => setRange(intialState)

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  )
}

function useReservation() {
  const context = use(ReservationContext)
  if (context === undefined)
    throw new Error('Context was used outside provider')
  return context
}

export { ReservationProvider, useReservation }
