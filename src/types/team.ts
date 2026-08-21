export interface Member {
  name: string;
  role: string;
}

export interface Team {
  id: string;
  name: string;
  members: Member[];
}
