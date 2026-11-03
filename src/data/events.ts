export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  place: string;
  seats: number;
};

export const events: CampusEvent[] = [
  { id: 1, title: 'React study night', date: '2026-10-22', place: 'Room 302', seats: 20 },
  { id: 2, title: 'React study day', date: '2026-10-23', place: 'Room 301', seats: 3 },
  { id: 3, title: 'React study midnight', date: '2026-10-24', place: 'Room 345', seats: 13 },
  { id: 4, title: 'React study morning', date: '2026-10-25', place: 'Room 333', seats: 7 }
];