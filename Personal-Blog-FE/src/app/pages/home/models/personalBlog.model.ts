export interface BlogRequest {
  name: string;
  date: Date;
  description: string;
}
export interface Blog extends BlogRequest {
  id: number;
}
