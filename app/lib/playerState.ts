import { create } from "zustand";

export interface AudioResource {
  id: string;
  title: string;
}

interface PlayerState {
  audio?: AudioResource;
  isPlaying: boolean;
  setAudio: (audio: AudioResource) => void;
  toggle: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const usePlayerStore = create<PlayerState>()((set) => ({
  audio: undefined,
  isPlaying: false,
  setAudio: (audio) => set(() => ({ audio })),
  toggle: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (isPlaying) => set((state) => ({ isPlaying })),
}));
