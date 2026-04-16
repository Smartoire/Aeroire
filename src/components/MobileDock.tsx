import { useEffect, useRef, useState } from "react";
import {
  BsEnvelopeAtFill,
  BsFillPinMapFill,
  BsFillTelephoneInboundFill,
  BsGithub,
  BsInstagram,
  BsLink45Deg,
  BsLinkedin,
  BsPeople,
  BsTwitterX,
  BsYoutube,
} from "react-icons/bs";
import { author } from "../config/author";
interface MobileDockProps {
  onAboutClick: () => void;
  onMapClick: () => void;
}

export default function MobileDock({
  onAboutClick,
  onMapClick,
}: MobileDockProps) {
  const [showLinksPopup, setShowLinksPopup] = useState(false);
  const linksPopupRef = useRef<HTMLDivElement>(null);
  const handleLinksClick = () => {
    setShowLinksPopup(!showLinksPopup);
  };
  useEffect(() => {
    function handleTouchOutside(event: TouchEvent) {
      if (
        linksPopupRef.current &&
        !linksPopupRef.current.contains(event.target as Node)
      ) {
        setShowLinksPopup(false);
      }
    }

    document.addEventListener("touchstart", handleTouchOutside);
    return () => {
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, []);

  const LinksPopup = () => (
    <div
      ref={linksPopupRef}
      className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800/90 
    backdrop-blur-sm rounded-lg p-4 shadow-xl mx-0 max-w-[400px] w-full"
    >
      <div className="grid grid-cols-1 gap-y-6">
        <a
          href={author.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsLinkedin size={40} />
          <span className="text-[40px]">LinkedIn</span>
        </a>
        <a
          href={author.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsGithub size={40} />
          <span className="text-[40px]">GitHub</span>
        </a>
        <a
          href={author.social.youtube}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsYoutube size={40} />
          <span className="text-[40px]">Youtube</span>
        </a>
        <a
          href={author.social.instagram}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsInstagram size={40} />
          <span className="text-[40px]">Instagram</span>
        </a>
        <a
          href={author.social.X}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsTwitterX size={40} />
          <span className="text-[40px]">X (Twitter)</span>
        </a>
        <a
          href={`mailto:${author.contact.email}`}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsEnvelopeAtFill size={40} />
          <span className="text-[40px]">Email</span>
        </a>
        <a
          href={`tel:${author.contact.phone}`}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsFillTelephoneInboundFill size={40} />
          <span className="text-[40px]">Call</span>
        </a>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden flex flex-col items-center z-10 space-y-2">
      {/* Bottom row: contact shortcuts */}
      <div className="mx-4 mb-4 p-3 bg-white/70 backdrop-blur-xl rounded-3xl space-x-4 flex justify-around items-center max-w-[400px] mx-auto">
        <button
          onClick={onAboutClick}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="w-18 h-18 bg-black/15 shadow-lg rounded-xl flex items-center justify-center">
            <BsPeople size={55} className="text-white" />
          </div>
        </button>
        <button
          onClick={onMapClick}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="w-18 h-18 bg-lime-500/15 shadow-lg rounded-xl flex items-center justify-center">
            <BsFillPinMapFill size={55} className="text-lime-600" />
          </div>
        </button>
        <button
          onClick={handleLinksClick}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="w-18 h-18 bg-pink-500/15 shadow-lg rounded-xl flex items-center justify-center">
            <BsLink45Deg size={55} className="text-pink-600" />
          </div>
          {showLinksPopup && <LinksPopup />}
        </button>
      </div>
    </div>
  );
}
