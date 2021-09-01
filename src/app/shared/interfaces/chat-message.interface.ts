export interface Message {
    createdAt: number;
    id: string;
    from: string;
    msg: string;
    toName: string;
    newMsg: boolean;
  }