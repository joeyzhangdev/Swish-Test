import moment from "moment";
export const getFormattedDate = (date: string): string => {
  return moment(date).format("HH:MM A");
};

export const getLocalFormattedPhoneNumber = (phone: string): string => {
  return phone.replace(/^(\+\d{1,3}) (\d{3})-(\d{3})-(\d{4})$/, "($2) $3-$4");
};
