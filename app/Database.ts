import Database from 'better-sqlite3';

// Open the SQLite database
const db = new Database('library-xyz.db');

// Create a table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS bookings
    (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName        TEXT,
        nric            TEXT,
        podNo           INTEGER,
        bookingDate     TEXT,
        podLocation     TEXT,
        bookingDuration TEXT
    )
`);

export function insertData(formData: {
    fullName: string;
    nric: string;
    podNo: number;
    bookingDate: Date;
    podLocation: string;
    bookingDuration: string;
}): void {
    const {fullName, nric, podNo, bookingDate, podLocation, bookingDuration} = formData;
    const insertStmt = db.prepare(`
        INSERT INTO bookings (fullName, nric, podNo, bookingDate, podLocation, bookingDuration)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    insertStmt.run(fullName, nric.toUpperCase(), podNo, new Date(bookingDate).toLocaleString(), podLocation, bookingDuration);
    db.close();
}