import { generateTimeSlots, generateMonths, generateAvailability, generateDaysForMonth, generateTimeAvailability, generateUnavailableDates } from '../../utilities/dateUtils';


// test for time slot utility
describe('generateTimeSlots', () => {
  const availableTimesMap = new Map();
  const formData = { day: '1', month: 'Mar', year: '2025' };

  beforeEach(() => {
    availableTimesMap.set('1-Mar-2025', ['8:00 AM', '11:00 AM', '2:00 PM']);
  });

  test('returns placeholder when formData is incomplete', () => {
    const result = generateTimeSlots(availableTimesMap, {});
    expect(result[0].props.children).toBe('Date');
  });

  test('returns available times for a future date', () => {
    const result = generateTimeSlots(availableTimesMap, formData);
    expect(result.map((option) => option.props.value)).toEqual([
      '',
      '8:00 AM',
      '11:00 AM',
      '2:00 PM',
    ]);
  });

  test('returns no available times for today if none are available', () => {
    const today = new Date();
    const formDataToday = {
      day: today.getDate().toString(),
      month: today.toLocaleString('default', { month: 'short' }),
      year: today.getFullYear().toString(),
    };
    const emptyMap = new Map();
    const result = generateTimeSlots(emptyMap, formDataToday);
    expect(result[result.length - 1].props.children).toBe('None Available');
  });
});


// tests for generate months utility
describe('generateMonths', () => {
  test('generates 4 months starting from the current month', () => {
    const result = generateMonths();
    expect(result).toHaveLength(4);

    const today = new Date();
    const firstMonth = today.toLocaleString('default', { month: 'short' });
    expect(result[0].name).toBe(firstMonth);
  });

  test('ensures correct year rolls over into next year', () => {
    const result = generateMonths();
    const today = new Date();
    const currentYear = today.getFullYear();

    // Check for roll-over into the next year
    const lastMonth = result[3];
    if (lastMonth.name === 'Jan') {
      expect(lastMonth.year).toBe((currentYear + 1).toString());
    }
  });
});


// test for days for month utility
describe('generateDaysForMonth', () => {
  test('generates days for a given month and year', () => {
    const result = generateDaysForMonth('Feb', '2025');
    expect(result).toHaveLength(28);
  });

  test('skips past days for the current month', () => {
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'short' });
    const currentYear = today.getFullYear().toString();
    const result = generateDaysForMonth(currentMonth, currentYear);

    const remainingDays = result.filter((day) => day >= today.getDate());
    expect(result).toEqual(remainingDays);
  });
});


// test for time utility
describe('generateTimeAvailability', () => {
  test('generates full time slots for a future day', () => {
    const result = generateTimeAvailability(8, 10);
    expect(result).toEqual(['8:00 AM', '9:00 AM', '10:00 AM']);
  });

  test('filters past times for today', () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    const result = generateTimeAvailability(8, 10, true);
    const expectedTimes = ['11:00 AM', '11:30 PM'].filter(
      (time) => parseInt(time) > currentHour
    );

    expect(result).toEqual(expectedTimes);
  });
});


// tests for unavailable dates
describe('generateUnavailableDates', () => {
  test('generates random unavailable slots without exceeding count', () => {
    const allDates = generateAvailability(1); // 1 month of availability
    const unavailableDates = generateUnavailableDates(allDates, 5);

    expect(unavailableDates.length).toBeLessThanOrEqual(5);
    expect(unavailableDates[0]).toHaveProperty('times');
  });

  test('adjusts count if it exceeds total slots', () => {
    const allDates = generateAvailability(1);
    const maxCount = allDates.reduce((sum, date) => sum + date.times.length, 0);
    const unavailableDates = generateUnavailableDates(allDates, maxCount + 1);

    expect(unavailableDates.length).toBeLessThanOrEqual(maxCount);
  });
});





