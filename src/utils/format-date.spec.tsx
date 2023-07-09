import {
  formatDate,
  parseSelectedDate,
  parseSelectedDatetime,
} from './format-date';

describe('DateUtils', () => {
  describe('formatDate', () => {
    it('formats the date in the specified format', () => {
      const date = new Date(2022, 1, 15, 14, 30, 0); // February 15, 2022, 14:30:00
      const formattedDate = formatDate(date, 'date', 'en-US');

      expect(formattedDate).toBe('2/15/2022');
    });

    it('formats the time in the specified format', () => {
      const date = new Date(2022, 1, 15, 14, 30, 0); // February 15, 2022, 14:30:00
      const formattedTime = formatDate(date, 'time', 'en-US');

      expect(formattedTime).toBe('2:30:00 PM');
    });

    it('returns a fallback value if an error occurs during formatting', () => {
      const invalidDate = '2022-02-15T14:30:00'; // Invalid format
      const formattedDate = formatDate(invalidDate, 'date', 'en-US');

      expect(formattedDate).toBe('--/--/----');
    });
  });

  describe('parseSelectedDate', () => {
    it('parses the selected date into YYYY-MM-DD format', () => {
      const selectedDate = '2022-02-15'; // February 15, 2022
      const parsedDate = parseSelectedDate(selectedDate);

      expect(parsedDate).toBe('2022-02-15');
    });
  });

  describe('parseSelectedDatetime', () => {
    it('parses the selected datetime into YYYY-MM-DDTHH:MM format', () => {
      const selectedDatetime = '2022-02-15T14:30'; // February 15, 2022, 14:30:00
      const parsedDatetime = parseSelectedDatetime(selectedDatetime);

      expect(parsedDatetime).toBe('2022-02-15T14:30');
    });
  });
});
