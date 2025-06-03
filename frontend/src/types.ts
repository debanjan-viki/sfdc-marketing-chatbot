type Sender = "User" | "Bot";

export type Message = {
  sender: Sender;
  message: string;
};
