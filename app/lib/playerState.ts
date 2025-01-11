import { create } from "zustand";

export interface AudioResource {
  id: string;
  title: string;
}

interface PlayerState {
  audio?: AudioResource;
  isPlaying: boolean;
  playAudio: (audio: AudioResource) => void;
  setAudio: (audio: AudioResource) => void;
  toggle: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const usePlayerStore = create<PlayerState>()((set) => ({
  audio: undefined,
  isPlaying: false,
  playAudio: (audio) => {
    set(() => ({ audio, isPlaying: true }));
  },
  setAudio: (audio) => set(() => ({ audio })),
  toggle: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (isPlaying) => set((state) => ({ isPlaying })),
}));
