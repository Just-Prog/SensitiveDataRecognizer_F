import UAParser from "ua-parser-js";

const result = UAParser(navigator.userAgent);

export { result };
