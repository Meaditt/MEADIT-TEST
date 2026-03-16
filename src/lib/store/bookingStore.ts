import { create } from 'zustand';

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  purpose: string;
}

export type BookingStatus = 'idle' | 'submitting' | 'success' | 'error';

interface BookingState {
  // Selected date/time
  selectedDate: Date | null;
  selectedTime: string | null;

  // Form data
  formData: BookingFormData;

  // Submission
  status: BookingStatus;
  errorMessage: string | null;
  confirmationId: string | null;

  // Actions
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  updateFormData: (data: Partial<BookingFormData>) => void;
  setStatus: (status: BookingStatus) => void;
  setError: (message: string | null) => void;
  setConfirmationId: (id: string | null) => void;
  reset: () => void;
}

const initialFormData: BookingFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  purpose: '',
};

export const useBookingStore = create<BookingState>((set) => ({
  selectedDate: null,
  selectedTime: null,
  formData: { ...initialFormData },
  status: 'idle',
  errorMessage: null,
  confirmationId: null,

  setSelectedDate: (date) => set({ selectedDate: date, selectedTime: null }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setStatus: (status) => set({ status }),
  setError: (message) => set({ errorMessage: message }),
  setConfirmationId: (id) => set({ confirmationId: id }),
  reset: () =>
    set({
      selectedDate: null,
      selectedTime: null,
      formData: { ...initialFormData },
      status: 'idle',
      errorMessage: null,
      confirmationId: null,
    }),
}));
