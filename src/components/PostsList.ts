import { Post } from "./Post";

export interface PostsList{
  items : Post[];
  deleteItem : React.MouseEventHandler<HTMLElement>;
}