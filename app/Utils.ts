/**
 * Checks if a given National Registration Identity Card (NRIC) or Foreign Identification Number (FIN) is valid.
 * @param ic - The NRIC or FIN to be validated.
 * @returns A boolean indicating whether the provided NRIC or FIN is valid.
 */
export function isValidNricFin(ic: string): boolean {
    if (ic.length != 9) return false;
    ic = ic.toUpperCase();

    // Define weights for each digit position in the NRIC or FIN
    const weights = [2, 7, 6, 5, 4, 3, 2];

    // Determine the offset based on the starting letter of the NRIC or FIN
    const offset = ic.startsWith('T') || ic.startsWith('G') ? 4 : ic.startsWith('M') ? 3 : 0;

    // Calculate the weighted sum of the relevant digits
    const weight = ic.slice(1, 8).split('').reduce((acc, digit, i) => acc + parseInt(digit, 10) * weights[i], 0);

    // Calculate a temporary value based on the offset and weighted sum
    let temp = (offset + weight) % 11;

    // Adjust the temporary value for NRICs starting with 'M'
    if (ic.startsWith('M')) temp = 10 - temp;

    // Determine the check digit based on the NRIC or FIN prefix
    let checkDigit: string;
    if (ic.startsWith('S') || ic.startsWith('T')) {
        checkDigit = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'][temp];
    } else if (ic.startsWith('F') || ic.startsWith('G')) {
        checkDigit = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'][temp];
    } else {
        checkDigit = ['K', 'L', 'J', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X'][temp];
    }

    // Compare the calculated check digit with the last digit of the NRIC or FIN
    return ic[8] === checkDigit;
}


// Round up date to the nearest 30 minutes
export function roundDate(date: Date): Date {
    const minutes = date.getMinutes();
    const remainder = minutes % 30;
    const roundedMinutes = remainder === 0 ? minutes : minutes + (30 - remainder);
    date.setMinutes(roundedMinutes);
    date.setSeconds(0);
    return date;
}
