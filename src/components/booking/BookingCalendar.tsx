'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '@/lib/store/bookingStore';

// ============================================================================
// CONSTANTS
// ============================================================================

const AVAILABLE_TIMES = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const PURPOSE_OPTIONS = [
  'Discuss a new project idea',
  'AI automation consultation',
  'Explore partnership opportunities',
  'Get a quote for my project',
  'Other',
];

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
}

function formatDate(date: Date): string {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// ============================================================================
// CALENDAR GRID
// ============================================================================

function CalendarGrid({
  currentMonth,
  selectedDate,
  onSelectDate,
  onChangeMonth,
}: {
  currentMonth: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onChangeMonth: (delta: number) => void;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));

    return days;
  }, [currentMonth]);

  const isDateAvailable = useCallback(
    (date: Date) => {
      if (date < today) return false;
      const day = date.getDay();
      // Weekdays only
      return day !== 0 && day !== 6;
    },
    [today]
  );

  const isSelected = useCallback(
    (date: Date) =>
      selectedDate !== null && toDateString(date) === toDateString(selectedDate),
    [selectedDate]
  );

  const canGoPrev = currentMonth.getMonth() !== today.getMonth() ||
    currentMonth.getFullYear() !== today.getFullYear();

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => onChangeMonth(-1)}
          disabled={!canGoPrev}
          className="p-2 rounded-lg transition-colors duration-175"
          style={{
            color: canGoPrev ? '#1a1a18' : '#e2e0d8',
          }}
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3
          className="text-lg font-medium"
          style={{ fontFamily: 'var(--font-display)', color: '#1a1a18' }}
        >
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() => onChangeMonth(1)}
          className="p-2 rounded-lg transition-colors duration-175"
          style={{ color: '#1a1a18' }}
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium py-2"
            style={{ color: '#7a7a72' }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, i) => {
          if (!date) {
            return <div key={`empty-${i}`} />;
          }

          const available = isDateAvailable(date);
          const selected = isSelected(date);
          const isToday = toDateString(date) === toDateString(today);

          return (
            <button
              key={toDateString(date)}
              onClick={() => available && onSelectDate(date)}
              disabled={!available}
              className="relative aspect-square flex items-center justify-center text-sm rounded-xl transition-all duration-175"
              style={{
                background: selected
                  ? '#c9a96e'
                  : 'transparent',
                color: selected
                  ? '#fafaf8'
                  : available
                  ? '#1a1a18'
                  : '#e2e0d8',
                fontWeight: isToday ? 600 : 400,
                cursor: available ? 'pointer' : 'default',
              }}
              onMouseEnter={(e) => {
                if (available && !selected) {
                  e.currentTarget.style.background = '#f4f3ef';
                }
              }}
              onMouseLeave={(e) => {
                if (available && !selected) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {date.getDate()}
              {isToday && !selected && (
                <span
                  className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: '#c9a96e' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// TIME PICKER
// ============================================================================

function TimePicker({
  selectedTime,
  onSelectTime,
  selectedDate,
}: {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  selectedDate: Date;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.175 }}
    >
      <p className="text-sm font-medium mb-3" style={{ color: '#7a7a72' }}>
        Available times for {formatDate(selectedDate)}
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {AVAILABLE_TIMES.map((time) => (
          <button
            key={time}
            onClick={() => onSelectTime(time)}
            className="px-3 py-2.5 text-sm rounded-xl transition-all duration-175 border"
            style={{
              background: selectedTime === time ? '#c9a96e' : 'transparent',
              color: selectedTime === time ? '#fafaf8' : '#1a1a18',
              borderColor: selectedTime === time ? '#c9a96e' : '#e2e0d8',
            }}
            onMouseEnter={(e) => {
              if (selectedTime !== time) {
                e.currentTarget.style.borderColor = '#c9a96e';
                e.currentTarget.style.background = 'rgba(201, 169, 110, 0.06)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTime !== time) {
                e.currentTarget.style.borderColor = '#e2e0d8';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {formatTime(time)}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================================
// BOOKING FORM
// ============================================================================

function BookingForm({ onBack }: { onBack: () => void }) {
  const { formData, updateFormData, selectedDate, selectedTime, setStatus, setError, setConfirmationId } =
    useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setStatus('submitting');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: toDateString(selectedDate),
          time: selectedTime,
          sourcePage: window.location.pathname,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setError(data.error || 'Something went wrong.');
        setIsSubmitting(false);
        return;
      }

      setConfirmationId(data.bookingId);
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.175 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm mb-5 transition-colors duration-175"
        style={{ color: '#7a7a72' }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#1a1a18'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = '#7a7a72'; }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
        Change date & time
      </button>

      {/* Selected slot summary */}
      <div
        className="flex items-center gap-3 p-4 rounded-xl mb-6"
        style={{ background: '#f4f3ef', border: '1px solid #e2e0d8' }}
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: '#c9a96e' }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: '#1a1a18' }}>
            {selectedDate && formatDate(selectedDate)}
          </p>
          <p className="text-sm" style={{ color: '#7a7a72' }}>
            {selectedTime && formatTime(selectedTime)} - 30 min discovery call
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="booking-name" className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a18' }}>
              Name *
            </label>
            <input
              type="text"
              id="booking-name"
              required
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-175"
              style={{
                background: '#f4f3ef',
                border: '1px solid #e2e0d8',
                color: '#1a1a18',
                outline: 'none',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#c9a96e'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e0d8'; }}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="booking-email" className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a18' }}>
              Email *
            </label>
            <input
              type="email"
              id="booking-email"
              required
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-175"
              style={{
                background: '#f4f3ef',
                border: '1px solid #e2e0d8',
                color: '#1a1a18',
                outline: 'none',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#c9a96e'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e0d8'; }}
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="booking-phone" className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a18' }}>
              Phone <span className="font-normal" style={{ color: '#7a7a72' }}>(optional)</span>
            </label>
            <input
              type="tel"
              id="booking-phone"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-175"
              style={{
                background: '#f4f3ef',
                border: '1px solid #e2e0d8',
                color: '#1a1a18',
                outline: 'none',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#c9a96e'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e0d8'; }}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label htmlFor="booking-company" className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a18' }}>
              Company <span className="font-normal" style={{ color: '#7a7a72' }}>(optional)</span>
            </label>
            <input
              type="text"
              id="booking-company"
              value={formData.company}
              onChange={(e) => updateFormData({ company: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-175"
              style={{
                background: '#f4f3ef',
                border: '1px solid #e2e0d8',
                color: '#1a1a18',
                outline: 'none',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#c9a96e'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e0d8'; }}
              placeholder="Your company"
            />
          </div>
        </div>

        <div>
          <label htmlFor="booking-purpose" className="block text-sm font-medium mb-1.5" style={{ color: '#1a1a18' }}>
            Meeting purpose *
          </label>
          <select
            id="booking-purpose"
            required
            value={formData.purpose}
            onChange={(e) => updateFormData({ purpose: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-175 appearance-none cursor-pointer"
            style={{
              background: '#f4f3ef',
              border: '1px solid #e2e0d8',
              color: formData.purpose ? '#1a1a18' : '#7a7a72',
              outline: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237a7a72' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '40px',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#c9a96e'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e0d8'; }}
          >
            <option value="" disabled>Select a reason for meeting</option>
            {PURPOSE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-full text-sm font-medium transition-all duration-175 flex items-center justify-center gap-2"
          style={{
            background: isSubmitting ? '#7a7a72' : '#1a1a18',
            color: '#fafaf8',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = '#000'; }}
          onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.background = '#1a1a18'; }}
        >
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Booking your call...
            </>
          ) : (
            'Confirm Booking'
          )}
        </button>
      </form>
    </motion.div>
  );
}

// ============================================================================
// SUCCESS VIEW
// ============================================================================

function SuccessView() {
  const { selectedDate, selectedTime, formData, confirmationId, reset } = useBookingStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center py-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: 'rgba(201, 169, 110, 0.12)' }}
      >
        <svg className="w-8 h-8" style={{ color: '#c9a96e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <h3
        className="text-2xl font-medium mb-2"
        style={{ fontFamily: 'var(--font-display)', color: '#1a1a18' }}
      >
        You&apos;re all set!
      </h3>
      <p className="text-sm mb-6" style={{ color: '#7a7a72' }}>
        We&apos;ll send a confirmation to <strong style={{ color: '#1a1a18' }}>{formData.email}</strong>
      </p>

      <div
        className="rounded-xl p-5 mb-6 text-left"
        style={{ background: '#f4f3ef', border: '1px solid #e2e0d8' }}
      >
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span style={{ color: '#7a7a72' }}>Date</span>
            <span style={{ color: '#1a1a18' }}>{selectedDate && formatDate(selectedDate)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: '#7a7a72' }}>Time</span>
            <span style={{ color: '#1a1a18' }}>{selectedTime && formatTime(selectedTime)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: '#7a7a72' }}>Duration</span>
            <span style={{ color: '#1a1a18' }}>30 minutes</span>
          </div>
          {confirmationId && (
            <div className="flex justify-between text-sm" style={{ borderTop: '1px solid #e2e0d8', paddingTop: '12px' }}>
              <span style={{ color: '#7a7a72' }}>Booking ID</span>
              <span className="font-mono text-xs" style={{ color: '#c9a96e' }}>{confirmationId}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={reset}
        className="text-sm font-medium transition-colors duration-175"
        style={{ color: '#c9a96e' }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#a8854a'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = '#c9a96e'; }}
      >
        Book another call
      </button>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

type BookingStep = 'date' | 'form' | 'success';

export function BookingCalendar() {
  const {
    selectedDate,
    selectedTime,
    status,
    errorMessage,
    setSelectedDate,
    setSelectedTime,
    setError,
  } = useBookingStore();

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const step: BookingStep =
    status === 'success'
      ? 'success'
      : selectedDate && selectedTime
      ? 'form'
      : 'date';

  const handleChangeMonth = (delta: number) => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: '#fafaf8',
        border: '1px solid #e2e0d8',
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5"
        style={{ borderBottom: '1px solid #e2e0d8' }}
      >
        <h2
          className="text-xl font-medium"
          style={{ fontFamily: 'var(--font-display)', color: '#1a1a18' }}
        >
          Book a Discovery Call
        </h2>
        <p className="text-sm mt-1" style={{ color: '#7a7a72' }}>
          30 minutes &middot; Free &middot; No commitment
        </p>
      </div>

      {/* Progress indicator */}
      <div className="px-6 pt-5">
        <div className="flex items-center gap-2 mb-5">
          {(['Select a date', 'Your details', 'Confirmed'] as const).map((label, i) => {
            const stepIndex = i;
            const currentStepIndex = step === 'date' ? 0 : step === 'form' ? 1 : 2;
            const isActive = stepIndex === currentStepIndex;
            const isComplete = stepIndex < currentStepIndex;

            return (
              <div key={label} className="flex items-center gap-2 flex-1">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 transition-all duration-175"
                  style={{
                    background: isActive ? '#c9a96e' : isComplete ? '#c9a96e' : '#f4f3ef',
                    color: isActive || isComplete ? '#fafaf8' : '#7a7a72',
                  }}
                >
                  {isComplete ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepIndex + 1
                  )}
                </div>
                <span
                  className="text-xs font-medium hidden sm:block"
                  style={{ color: isActive ? '#1a1a18' : '#7a7a72' }}
                >
                  {label}
                </span>
                {i < 2 && (
                  <div
                    className="flex-1 h-px hidden sm:block"
                    style={{ background: isComplete ? '#c9a96e' : '#e2e0d8' }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {/* Error message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 rounded-xl text-sm"
              style={{ background: 'rgba(220, 38, 38, 0.06)', color: '#b91c1c', border: '1px solid rgba(220, 38, 38, 0.15)' }}
            >
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-xs underline underline-offset-2"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {step === 'date' && (
            <motion.div
              key="date-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.175 }}
            >
              <CalendarGrid
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                onChangeMonth={handleChangeMonth}
              />

              {/* Time slots */}
              <AnimatePresence>
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-5"
                    style={{ borderTop: '1px solid #e2e0d8' }}
                  >
                    <TimePicker
                      selectedTime={selectedTime}
                      onSelectTime={setSelectedTime}
                      selectedDate={selectedDate}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {step === 'form' && (
            <motion.div
              key="form-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.175 }}
            >
              <BookingForm onBack={() => setSelectedTime(null)} />
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.175 }}
            >
              <SuccessView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default BookingCalendar;
