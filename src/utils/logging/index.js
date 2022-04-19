
/**
 * Function to log general info to the console.
 */
export function logInfo(text) {
    console.log(`%c[INFO] %c${text}`, "color: blue; font-size: 36px", "color: black; font-size: 36px;");
}

/**
 * Function to log a mock table entry to the console.
 */
export function logEntry(key, value) {
    console.log(`%c\t[TABLE] ${key} - ${value}`, "color: #c400c7; font-size: 30px");
}
