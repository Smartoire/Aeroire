import DraggableWindow from "./DraggableWindow";
import { author } from "../config/author";

interface MapProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MapApp({ isOpen, onClose }: MapProps) {
  if (!isOpen) return null;

  return (
    <DraggableWindow
      title={`${author.nickname} address`}
      onClose={onClose}
      initialPosition={{
        x: Math.floor(window.innerWidth * 0.5),
        y: Math.floor(window.innerHeight * 0.2)
      }}
      initialSize={{ width: 500, height: 500 }}
      className="bg-white/90 backdrop-blur-sm"
    >
      <embed
        className="uagb-google-map__iframe"
        title={`Google Map for ${author.nickname}`}
        src={`https://maps.google.com/maps?q=${author.nickname}&z=18&hl=en&t=k&output=embed&iwloc=near`}
        width="500"
        height="452"
      ></embed>
    </DraggableWindow>
  );
}
