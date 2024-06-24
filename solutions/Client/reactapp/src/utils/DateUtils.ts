import moment from "moment";

export const isLeapYear = (year: number) => {
  return year % 400 === 0 || (year !== 100 && year % 4 === 0);
};
export const getMaxDayinMonth = (month: number, year: number) => {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 2:
      return 28 + (isLeapYear(year) ? 1 : 0);
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
  }
  return 0;
};
//For getting current time in js and formatt like this: 2023-10-30T17:15:22.234Z
export const getCurrentDateTimeInISO8601 = () => {
  const now = new Date();

  // Extract date and time components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  // Build the ISO 8601 date-time string
  const iso8601DateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  return iso8601DateTime;
};
export const formatDateWithSeparator = (dobDate: Date, seperator: string) => {
  return dobDate
    .toLocaleDateString("pt-br")
    .split("/")
    .reverse()
    .join(seperator);
};
export const convertISODateToVietnameseFormat = (dateTime?: string) => {
  if (!dateTime) {
    return;
  }
  const date = new Date(dateTime);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Note that months are zero-based (0-11)
  const day = date.getDate();

  return `${day} tháng ${month}, ${year}`;
};

export const formatRelativeTime = (createdAt: string | Date): string => {
  const now = moment();
  const tz = moment.tz.guess();
  const createdMoment = moment(new Date(createdAt)).tz(tz);
  const duration = moment.duration(now.diff(createdMoment));

  if (duration.asSeconds() < 60) {
    return `${Math.floor(duration.asSeconds())}s`;
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())}m`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())}h`;
  } else if (duration.asDays() < 7) {
    return `${Math.floor(duration.asDays())}d`;
  } else if (duration.asWeeks() < 4) {
    return `${Math.floor(duration.asWeeks())}w`;
  } else if (duration.asMonths() < 12) {
    return `${Math.floor(duration.asMonths())}mo`;
  } else {
    return `${Math.floor(duration.asYears())}y`;
  }
};
