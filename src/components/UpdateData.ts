import { Post } from "./Post";

export interface UpdateData{
  items : Post[];
  sendItem : (id: string, content: string) => void;
}