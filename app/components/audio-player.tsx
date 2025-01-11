import { Pause, Play } from "lucide-react";
import { useState, useEffect, memo } from "react";
import { Button } from "~/components/ui/button";
import { AudioResource, usePlayerStore } from "~/lib/playerState";

export const AudioPlayer = memo(AudioPlayerComponent);

function AudioPlayerComponent() {
  const audio = usePlayerStore((store) => store.audio);
  if (!audio) {
    return (
      <PlayerWrapper>
        <div className="flex h-full items-center justify-center">
          <Button className="rounded-full" disabled>
            {"Play"}
          </Button>
        </div>
      </PlayerWrapper>
    );
  }
  return (
    <PlayerWrapper>
      <AudioPlayerWithSong key={audio.id} audio={audio} />
    </PlayerWrapper>
  );
}

function PlayerWrapper({ children }: { children: React.ReactNode }) {
  return <div className="h-20 bg-white/10">{children}</div>;
}

function AudioPlayerWithSong({ audio }: { audio: AudioResource }) {
  const store = usePlayerStore();
  const audioUrl = `http://localhost:10000/devstoreaccount1/songs/${audio.id}`; // TODO: move to config, prod url
  const { duration, time } = useAudio(audioUrl);

  return (
    <div className="flex h-full items-center justify-between px-4">
      <div className="basis-0">{audio.title}</div>
      <div className="flex flex-col items-center gap-1">
        <Button onClick={store.toggle} size={"icon"} className="rounded-full">
          {store.isPlaying ? <Pause /> : <Play />}
        </Button>
        <div className="flex items-center gap-1">
          <span className="text-xs">{formatTime(time)}</span>
          <div className="h-1 w-[300px] rounded bg-gray-600">
            <div className="h-1 bg-white" style={{ width: `${(100 * time) / duration}%` }} />
          </div>
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>
      <div />
    </div>
  );
}

function useAudio(url: string) {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);
  const [audio] = useState(() => {
    console.log("Creating audio element");
    return new Audio(url);
  });
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const controller = new AbortController();
    audio.addEventListener("ended", () => setIsPlaying(false), {
      signal: controller.signal,
    });
    audio.addEventListener("durationchange", () => setDuration(audio.duration), {
      signal: controller.signal,
    });
    audio.addEventListener("timeupdate", () => setTime(audio.currentTime), {
      signal: controller.signal,
    });
    return () => {
      controller.abort();
      audio.pause();
    };
  }, []);

  return {
    audio,
    duration,
    time,
    setTime,
  };
}

function formatTime(time: number) {
  time = Math.ceil(time);
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}
