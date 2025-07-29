export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface InvitationData {
  title: string;
  location: string;
  hosts: string[];
  requirements: string;
  schedule: ScheduleItem[];
  additionalInfo: string;
}
