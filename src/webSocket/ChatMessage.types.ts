export interface ChatMessage {
  id: string | number;
  role: "user" | "assistant";
  content: string;
  isUserMessage?: boolean;
  timestamp?: string;
  stamp?: string | number;
  date?: string;
  picture?: string;
  avatar?: string;
  userName?: string;
  streaming?: boolean;
}