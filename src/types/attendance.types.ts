export interface Attendance {
    id: string;
    userId: string;
    date: string;
    checkIn: string;
    checkOut?: string;
    status: 'present' | 'absent' | 'late';
}
