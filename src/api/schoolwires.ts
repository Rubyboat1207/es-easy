import axios from 'axios';
import moment from 'moment';
import { SchoolWiresCalendarEvent } from './definitions';

const FIRST_DAY_OF_SCHOOL = moment('9/9/2023');
const LAST_DAY_OF_SCHOOL = moment('5/24/2024');

async function getPISDApiKey() {
  return (
    await axios.post('https://titanschedule.com:8533/api', {
      url: 'https://www.pisd.edu/Generator/TokenGenerator.ashx/ProcessRequest',
      method: 'GET',
    })
  ).data;
}

export async function getInterestingCalendarEvents() {
  const tok_data = await getPISDApiKey();

  // ?StartDate=2024-02-01&EndDate=2024-05-24&ModuleInstanceFilter=&CategoryFilter=&IsDBStreamAndShowAll=true
  const url = new URL(`${tok_data.ApiServer}api/v4/CalendarEvents/GetEvents/8`);
  url.searchParams.set('StartDate', FIRST_DAY_OF_SCHOOL.format('YYYY-MM-DD'));
  url.searchParams.set('EndDate', LAST_DAY_OF_SCHOOL.format('YYYY-MM-DD'));
  url.searchParams.set('ModuleInstanceFilter', '')
  url.searchParams.set('CategoryFilter', '')
  url.searchParams.set('IsDBStreamAndShowAll', 'true');
  const res = (
    await axios.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${tok_data.Token}`,
      },
    })
  ).data as SchoolWiresCalendarEvent[];

  return res.filter((c) =>
    [
      'Student / Teacher Holiday',
      'Holiday',
      'Inclement Weather Day',
      'State Testing',
    ].includes(c.CategoryTitle)
  );
}
