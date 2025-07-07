import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

export function cn(...inputs: any[]) {
  return twMerge(clsx(...inputs))
}

// format date time
export const formatDateTime = (dateString: Date | string) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
      month: "short", // abbreviated month name (e.g., 'Oct')
      day: "numeric", // numeric day of the month (e.g., '25')
      year: "numeric", // numeric year (e.g., '2023')
      hour: "numeric", // numeric hour (e.g., '8')
      minute: "numeric", // numeric minute (e.g., '30')
      hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };
  
    const dateDayOptions: Intl.DateTimeFormatOptions = {
      weekday: "short", // abbreviated weekday name (e.g., 'Mon')
      year: "numeric", // numeric year (e.g., '2023')
      month: "2-digit", // numeric month (e.g., '10')
      day: "2-digit", // numeric day of the month (e.g., '25')
    };
  
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: "short", // abbreviated month name (e.g., 'Oct')
      year: "numeric", // numeric year (e.g., '2023')
      day: "numeric", // numeric day of the month (e.g., '25')
    };
  
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric", // numeric hour (e.g., '8')
      minute: "numeric", // numeric minute (e.g., '30')
      hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };
  
    const inputDate = new Date(dateString);
    const now = new Date();
  
    // Calculate the difference in calendar days
    const daysDifference = Math.round(
      (inputDate.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
    );
  
    // Determine relative date (Today, Tomorrow, or Day of the Week)
    let relativeDate: string;
    if (daysDifference < 0) {
      relativeDate = inputDate.toLocaleString("en-US", dateOptions); 
    } else if (daysDifference === 0) {
      relativeDate = "Today";
    } else if (daysDifference === 1) {
      relativeDate = "Tomorrow";
    } else if (daysDifference > 1 && daysDifference <= 7) {
      relativeDate = inputDate.toLocaleString("en-US", { weekday: "long" }); // e.g., "Wednesday"
    } else if (daysDifference > 7) {
      relativeDate = `${daysDifference} days`;
    } else {
      // Fallback if needed
      relativeDate = inputDate.toLocaleString("en-US", dateOptions);
    }
  
    // Format date and time
    const formattedDateTime: string = inputDate.toLocaleString("en-US", dateTimeOptions);
    const formattedDateDay: string = inputDate.toLocaleString("en-US", dateDayOptions);
    const formattedDate: string = inputDate.toLocaleString("en-US", dateOptions);
    const formattedTime: string = inputDate.toLocaleString("en-US", timeOptions);
  
    return {
      relativeDate, // e.g., "Today", "Tomorrow", "Wednesday", or "129 days"
      dateTime: formattedDateTime, // e.g., "Dec 31, 2024, 4:31 PM"
      dateDay: formattedDateDay, // e.g., "Tue, 12/31/2024"
      dateOnly: formattedDate, // e.g., "Dec 31, 2024"
      timeOnly: formattedTime, // e.g., "4:31 PM"
    };
  };

