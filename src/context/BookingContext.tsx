import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface BookingData {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
}

interface BookingContextType {
  bookings: BookingData[];
  addBooking: (booking: BookingData) => Promise<boolean>;
  isSlotBooked: (date: string, time: string) => boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<BookingData[]>([]);

  useEffect(() => {
    // Fetch initial bookings when component mounts
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const addBooking = async (booking: BookingData): Promise<boolean> => {
    try {
      // Check if the slot is already booked
      const isAlreadyBooked = bookings.some(
        existingBooking => 
          existingBooking.date === booking.date && 
          existingBooking.time === booking.time
      );

      if (isAlreadyBooked) {
        return false; // Booking failed - slot already taken
      }

      // Send booking to backend
      await axios.post('http://localhost:5000/bookings', booking);
      
      // Update local state
      setBookings(prev => [...prev, booking]);
      return true; // Booking successful
    } catch (error) {
      console.error('Error adding booking:', error);
      return false;
    }
  };

  const isSlotBooked = (date: string, time: string): boolean => {
    return bookings.some(
      booking => booking.date === date && booking.time === time
    );
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, isSlotBooked }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}