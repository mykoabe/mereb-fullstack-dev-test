import { format } from "date-fns";

const generateInputOutputFilename = (suffix = "output") => {
  const timestamp = format(new Date(), "yyyyMMddHHmmss");
  return `${timestamp}-${suffix}.csv`;
};

const CSV_HEADERS = ["Department", "Date", "Sales"];

export { CSV_HEADERS, generateInputOutputFilename };
