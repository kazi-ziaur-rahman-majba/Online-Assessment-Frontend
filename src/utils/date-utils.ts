import moment from "moment";

type DateInput = string | Date;

const toMoment = (date: DateInput) => moment(date);

export const formatDate = (date: DateInput): string => {
    return toMoment(date).format("MM/DD/YYYY");
};

export const formatLongDate = (date: DateInput): string => {
    return toMoment(date).format("MMMM DD, YYYY");
};

export const formatTime = (date: DateInput): string => {
    return toMoment(date).format("hh:mm A");
};

export const formatDateTime = (date: DateInput): string => {
    return toMoment(date).format("MMM DD, YYYY • hh:mm A");
};