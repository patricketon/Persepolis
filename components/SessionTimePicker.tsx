// "use client"

// import { useState, useRef, useEffect, useCallback } from "react"

// interface SessionTimePickerProps {
//   onSelect: (time: string, duration: number) => void
//   onClose: () => void
// }

// export function SessionTimePicker({ onSelect, onClose }: SessionTimePickerProps) {
//   const [duration, setDuration] = useState<30 | 60 | null>(null)
//   const [selectedHour, setSelectedHour] = useState<number>(new Date().getHours())
//   const [selectedMinute, setSelectedMinute] = useState<number>(0)
//   const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">(
//     new Date().getHours() >= 12 ? "PM" : "AM"
//   )

//   const hourRef = useRef<HTMLDivElement>(null)
//   const minuteRef = useRef<HTMLDivElement>(null)
//   const periodRef = useRef<HTMLDivElement>(null)

//   const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
//   const minutes30 = [0, 30]
//   const minutes60 = [0]
//   const periods: ("AM" | "PM")[] = ["AM", "PM"]

//   const currentMinutes = duration === 30 ? minutes30 : minutes60

//   // Scroll to center selected item
//   const scrollToSelected = useCallback((
//     ref: React.RefObject<HTMLDivElement | null>,
//     index: number
//   ) => {
//     if (!ref.current) return
//     const itemHeight = 44
//     const containerHeight = ref.current.clientHeight
//     const scrollTop = index * itemHeight - (containerHeight / 2) + (itemHeight / 2)
//     ref.current.scrollTo({ top: scrollTop, behavior: "smooth" })
//   }, [])

//   // Initialize scroll positions when duration is selected
//   useEffect(() => {
//     if (duration) {
//       const now = new Date()
//       let hour = now.getHours()
//       const period = hour >= 12 ? "PM" : "AM"
//       hour = hour % 12 || 12

//       setSelectedHour(hour)
//       setSelectedPeriod(period)
//       setSelectedMinute(0)

//       setTimeout(() => {
//         scrollToSelected(hourRef, hours.indexOf(hour))
//         scrollToSelected(minuteRef, 0)
//         scrollToSelected(periodRef, periods.indexOf(period))
//       }, 100)
//     }
//   }, [duration, scrollToSelected])

//   // Handle scroll snap selection
//   const handleScroll = (
//     ref: React.RefObject<HTMLDivElement | null>,
//     items: (number | string)[],
//     setter: (val: any) => void
//   ) => {
//     if (!ref.current) return
//     const itemHeight = 44
//     const scrollTop = ref.current.scrollTop
//     const centerOffset = ref.current.clientHeight / 2
//     const index = Math.round((scrollTop + centerOffset - itemHeight / 2) / itemHeight)
//     const clampedIndex = Math.max(0, Math.min(index, items.length - 1))
//     setter(items[clampedIndex])
//   }

//   const formatTime = () => {
//     const hour24 = selectedPeriod === "PM" 
//       ? (selectedHour === 12 ? 12 : selectedHour + 12)
//       : (selectedHour === 12 ? 0 : selectedHour)
//     const date = new Date()
//     date.setHours(hour24, selectedMinute, 0, 0)
//     return date.toISOString()
//   }

//   const formatDisplay = () => {
//     return `${selectedHour}:${selectedMinute.toString().padStart(2, "0")} ${selectedPeriod}`
//   }

//   const isValidTime = () => {
//     const now = new Date()
//     const hour24 = selectedPeriod === "PM"
//       ? (selectedHour === 12 ? 12 : selectedHour + 12)
//       : (selectedHour === 12 ? 0 : selectedHour)
//     const selected = new Date()
//     selected.setHours(hour24, selectedMinute, 0, 0)
//     return selected > now
//   }

//   // Duration selection screen
//   if (!duration) {
//     return (
//       <div className="stp-overlay" onClick={onClose}>
//         <div className="stp-modal" onClick={(e) => e.stopPropagation()}>
//           <div className="stp-header">
//             <h2>Session Duration</h2>
//             <p>Select the perfect book club length for you. </p>
//           </div>

//           <div className="stp-duration-options">
//             <button
//               className="stp-duration-btn"
//               onClick={() => setDuration(30)}
//             >
//               <span className="stp-duration-value">30</span>
//               <span className="stp-duration-label">minutes</span>
//             </button>

//             <button
//               className="stp-duration-btn"
//               onClick={() => setDuration(60)}
//             >
//               <span className="stp-duration-value">1</span>
//               <span className="stp-duration-label">hour</span>
//             </button>
//           </div>

//           <div style={{ display: 'flex', justifyContent: 'center'}}>
//             <button className="stp-cancel" onClick={onClose}>
//               Cancel
//             </button>
//           </div>
          
//         </div>
//       </div>
//     )
//   }

//   // Time picker screen
//   return (
//     <div className="stp-overlay" onClick={onClose}>
//       <div className="stp-modal" onClick={(e) => e.stopPropagation()}>
//         <div className="stp-header">
//           <button className="stp-back" onClick={() => setDuration(null)}>
//             ← Back
//           </button>
//           <h2>Select one of our Daily Time To Join Club </h2>
//           <p>{duration} minute session</p>
//         </div>

//         <div className="stp-time-display">
//           <span className="stp-time-badge">{formatDisplay()}</span>
//         </div>

//         <div className="stp-picker-container">
//           <div className="stp-picker-highlight" />

//           {/* Hours */}
//           <div
//             ref={hourRef}
//             className="stp-wheel"
//             onScroll={() => handleScroll(hourRef, hours, setSelectedHour)}
//           >
//             <div className="stp-wheel-padding" />
//             {hours.map((h) => (
//               <div
//                 key={h}
//                 className={`stp-wheel-item ${selectedHour === h ? "selected" : ""}`}
//                 onClick={() => {
//                   setSelectedHour(h)
//                   scrollToSelected(hourRef, hours.indexOf(h))
//                 }}
//               >
//                 {h}
//               </div>
//             ))}
//             <div className="stp-wheel-padding" />
//           </div>

//           {/* Minutes */}
//           <div
//             ref={minuteRef}
//             className="stp-wheel"
//             onScroll={() => handleScroll(minuteRef, currentMinutes, setSelectedMinute)}
//           >
//             <div className="stp-wheel-padding" />
//             {currentMinutes.map((m) => (
//               <div
//                 key={m}
//                 className={`stp-wheel-item ${selectedMinute === m ? "selected" : ""}`}
//                 onClick={() => {
//                   setSelectedMinute(m)
//                   scrollToSelected(minuteRef, currentMinutes.indexOf(m))
//                 }}
//               >
//                 {m.toString().padStart(2, "0")}
//               </div>
//             ))}
//             <div className="stp-wheel-padding" />
//           </div>

//           {/* AM/PM */}
//           <div
//             ref={periodRef}
//             className="stp-wheel"
//             onScroll={() => handleScroll(periodRef, periods, setSelectedPeriod)}
//           >
//             <div className="stp-wheel-padding" />
//             {periods.map((p) => (
//               <div
//                 key={p}
//                 className={`stp-wheel-item ${selectedPeriod === p ? "selected" : ""}`}
//                 onClick={() => {
//                   setSelectedPeriod(p)
//                   scrollToSelected(periodRef, periods.indexOf(p))
//                 }}
//               >
//                 {p}
//               </div>
//             ))}
//             <div className="stp-wheel-padding" />
//           </div>
//         </div>

//         {!isValidTime() && (
//           <p className="stp-warning">Please select a future time</p>
//         )}

//         <div className="stp-actions">
//           <button className="stp-cancel" onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             className="stp-confirm"
//             disabled={!isValidTime()}
//             onClick={() => onSelect(formatTime(), duration)}
//           >
//             Join Session
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"

interface SessionTimePickerProps {
  onSelect: (time: string, duration: number) => void
  onClose: () => void
}

export function SessionTimePicker({ onSelect, onClose }: SessionTimePickerProps) {
  const [duration, setDuration] = useState<30 | 60 | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null)

  const wheelRef = useRef<HTMLDivElement>(null)

  // Generate available time slots for today (only future times)
  const slots = useMemo(() => {
    if (!duration) return []
    
    const now = new Date()
    const results: Date[] = []
    const startHour = 6 // 6 AM
    const endHour = 24 // 11 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      if (duration === 60) {
        // 1-hour sessions: only on the hour
        const slot = new Date()
        slot.setHours(hour, 0, 0, 0)
        if (slot > now) results.push(slot)
      } else {
        // 30-min sessions: on the hour and half hour
        const slotA = new Date()
        slotA.setHours(hour, 0, 0, 0)
        if (slotA > now) results.push(slotA)
        
        const slotB = new Date()
        slotB.setHours(hour, 30, 0, 0)
        if (slotB > now) results.push(slotB)
      }
    }
    
    return results
  }, [duration])

  // Set initial selection to first available slot
  useEffect(() => {
    if (slots.length > 0 && !selectedSlot) {
      setSelectedSlot(slots[0])
    }
  }, [slots, selectedSlot])

  // Scroll to center selected item
  const scrollToIndex = useCallback((index: number) => {
    if (!wheelRef.current) return
    const itemHeight = 52
    const containerHeight = wheelRef.current.clientHeight
    const scrollTop = index * itemHeight - (containerHeight / 2) + (itemHeight / 2)
    wheelRef.current.scrollTo({ top: scrollTop, behavior: "smooth" })
  }, [])

  // Initialize scroll position
  useEffect(() => {
    if (duration && slots.length > 0) {
      setTimeout(() => scrollToIndex(0), 100)
    }
  }, [duration, slots, scrollToIndex])

  // Handle scroll selection
  const handleScroll = () => {
    if (!wheelRef.current || slots.length === 0) return
    const itemHeight = 52
    const scrollTop = wheelRef.current.scrollTop
    const centerOffset = wheelRef.current.clientHeight / 2
    const index = Math.round((scrollTop + centerOffset - itemHeight / 2) / itemHeight)
    const clampedIndex = Math.max(0, Math.min(index, slots.length - 1))
    setSelectedSlot(slots[clampedIndex])
  }

  const formatSlot = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const isValidSelection = selectedSlot && selectedSlot > new Date()

  // Duration selection screen
  if (!duration) {
    return (
      <div className="stp-overlay" onClick={onClose}>
        <div className="stp-modal" onClick={(e) => e.stopPropagation()}>
          <div className="stp-header">
            <h2>Session Duration</h2>
            <p>Our book clubs run daily. How long would you like to discuss?</p>
          </div>

          <div className="stp-duration-options">
            <button
              className="stp-duration-btn"
              onClick={() => setDuration(30)}
            >
              <span className="stp-duration-value">30</span>
              <span className="stp-duration-label">minutes</span>
            </button>

            <button
              className="stp-duration-btn"
              onClick={() => setDuration(60)}
            >
              <span className="stp-duration-value">1</span>
              <span className="stp-duration-label">hour</span>
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="stp-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Time picker screen
  return (
    <div className="stp-overlay" onClick={onClose}>
      <div className="stp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="stp-header">
          <button className="stp-back" onClick={() => { setDuration(null); setSelectedSlot(null); }}>
            ← Back
          </button>
          <h2>Select a Time</h2>
          <p>Daily {duration}-minute sessions</p>
        </div>

        {slots.length === 0 ? (
          <div className="stp-no-slots">
            <p>No more sessions available today.</p>
            <p>Check back tomorrow!</p>
          </div>
        ) : (
          <>
            <div className="stp-picker-container">
              <div className="stp-picker-highlight" />

              <div
                ref={wheelRef}
                className="stp-wheel stp-wheel-wide"
                onScroll={handleScroll}
              >
                <div className="stp-wheel-padding" />
                {slots.map((slot, i) => (
                  <div
                    key={slot.toISOString()}
                    className={`stp-wheel-item ${selectedSlot?.getTime() === slot.getTime() ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedSlot(slot)
                      scrollToIndex(i)
                    }}
                  >
                    {formatSlot(slot)}
                  </div>
                ))}
                <div className="stp-wheel-padding" />
              </div>
            </div>

            {!isValidSelection && (
              <p className="stp-warning-large">Please select a future time</p>
            )}
          </>
        )}

        <div className="stp-actions">
          <button className="stp-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="stp-confirm"
            disabled={!isValidSelection}
            onClick={() => selectedSlot && onSelect(selectedSlot.toISOString(), duration)}
          >
            Join Session
          </button>
        </div>
      </div>
    </div>
  )
}