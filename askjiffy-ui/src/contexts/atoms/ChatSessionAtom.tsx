import { atom } from "jotai";

export const activeChatSessionAtom = atom<ChatSession | null>(null);
