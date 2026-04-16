import { useEffect, useRef, useState } from "react";
import {
  BsBatteryHalf,
  BsBuilding,
  BsBuildings,
  BsCalendarWeek,
  BsCloudSunFill,
  BsEnvelopeAtFill,
  BsFillPatchQuestionFill,
  BsFillPinMapFill,
  BsFillTelephoneInboundFill,
  BsFillVolumeUpFill,
  BsGithub,
  BsInstagram,
  BsLink45Deg,
  BsLinkedin,
  BsPeople,
  BsTwitterX,
  BsWifi,
  BsYoutube,
} from "react-icons/bs";
import SLogo from "../assets/S.png";
import { author } from "../config/author";
import HelpModal from "./HelpModal";

interface DesktopDockProps {
  onTerminalClick: () => void;
  onAboutClick: () => void;
  onMapClick: () => void;
  activeApps: {
    terminal: boolean;
    about: boolean;
    map: boolean;
    help: boolean;
  };
}

const DesktopDock = ({
  onTerminalClick,
  onAboutClick,
  onMapClick,
  activeApps,
}: DesktopDockProps) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [showLinksPopup, setShowLinksPopup] = useState(false);
  const linksPopupRef = useRef<HTMLDivElement>(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showHelp, setShowHelp] = useState(false);

  const handleLinksClick = () => {
    setShowLinksPopup(!showLinksPopup);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();

    return `${month} ${day}`;
  };
  const formatTime = (date: Date) => {
    const hour = date.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    });
    const minute = date.getMinutes().toString().padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";

    return `${hour.replace(/\s?[AP]M/, "")}:${minute} ${period}`;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        linksPopupRef.current &&
        !linksPopupRef.current.contains(event.target as Node)
      ) {
        setShowLinksPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Tooltip = ({ text }: { text: string }) => (
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
      {text}
    </div>
  );

  const LinksPopup = () => (
    <div
      ref={linksPopupRef}
      className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800/90 w-35 backdrop-blur-sm rounded-lg p-4 shadow-xl"
    >
      <div className="grid grid-cols-1 gap-y-2">
        <a
          href={author.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsLinkedin size={20} />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://smartoire.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsBuildings size={20} />
          <span>Group</span>
        </a>
        <a
          href={author.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsGithub size={20} />
          <span>GitHub</span>
        </a>
        <a
          href={author.social.youtube}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsYoutube size={20} />
          <span>Youtube</span>
        </a>
        <a
          href={author.social.instagram}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsInstagram size={20} />
          <span>Instagram</span>
        </a>
        <a
          href={author.social.X}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsTwitterX size={20} />
          <span>X (Twitter)</span>
        </a>
        <a
          href={`mailto:${author.contact.email}`}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsEnvelopeAtFill size={20} />
          <span>Email</span>
        </a>
        <a
          href={`tel:${author.contact.phone}`}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <BsFillTelephoneInboundFill size={20} />
          <span>Call</span>
        </a>
      </div>
    </div>
  );

  return (
    <>
      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        onTerminalClick={onTerminalClick}
      />
      <div className="fixed bottom-0 left-0 right-0 hidden md:flex justify-center pb-4 z-100">
        {/* icons */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-xl flex mr-auto my-2 mx-4">
          <div className="flex items-center gap-2">
            <BsCloudSunFill size={30} />
            Vancouver
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-xl w-[50%]">
          <div className="flex space-x-2">
            {/* Terminal */}
            <button
              onClick={onTerminalClick}
              onMouseEnter={() => setHoveredIcon("terminal")}
              onMouseLeave={() => setHoveredIcon(null)}
              className="relative m-1"
            >
              <div
                className={`w-12 h-12 bg-yellow-500/15 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
                  activeApps.terminal ? "ring-2 ring-yellow-500/50" : ""
                }`}
              >
                <img
                  src={SLogo.src} // important: use .src in Astro
                  alt="Terminal"
                />
              </div>
              {hoveredIcon === "terminal" && <Tooltip text="Terminal" />}
            </button>
            {/* About Us */}
            <button
              onClick={onAboutClick}
              onMouseEnter={() => setHoveredIcon("about")}
              onMouseLeave={() => setHoveredIcon(null)}
              className="relative m-1"
            >
              <div
                className={`w-12 h-12 bg-black/15 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
                  activeApps.about ? "ring-2 ring-black/50" : ""
                }`}
              >
                <BsPeople size={35} className="text-black" />
              </div>
              {hoveredIcon === "about" && <Tooltip text="About Us" />}
            </button>
            {/* Calendly */}
            <button
              onClick={() => window.open(author.contact.calendly, "_blank")}
              onMouseEnter={() => setHoveredIcon("calendly")}
              onMouseLeave={() => setHoveredIcon(null)}
              className="relative m-1"
            >
              <div
                className={`w-12 h-12 bg-blue-500/15 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
                  activeApps.map ? "ring-2 ring-blue-500/50" : ""
                }`}
              >
                <BsCalendarWeek size={30} className="text-blue-600" />
              </div>
              {hoveredIcon === "map" && <Tooltip text="Location" />}
            </button>
            {/* Map */}
            <button
              onClick={onMapClick}
              onMouseEnter={() => setHoveredIcon("map")}
              onMouseLeave={() => setHoveredIcon(null)}
              className="relative m-1"
            >
              <div
                className={`w-12 h-12 bg-lime-500/15 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
                  activeApps.map ? "ring-2 ring-lime-500/50" : ""
                }`}
              >
                <BsFillPinMapFill size={30} className="text-lime-600" />
              </div>
              {hoveredIcon === "map" && <Tooltip text="Location" />}
            </button>
            {/* Links */}
            <button
              onClick={handleLinksClick}
              onMouseEnter={() => setHoveredIcon("links")}
              onMouseLeave={() => setHoveredIcon(null)}
              className="relative m-1"
            >
              <div className="w-12 h-12 bg-pink-500/15 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95">
                <BsLink45Deg size={35} className="text-pink-600" />
              </div>
              {hoveredIcon === "links" && <Tooltip text="Contact Links" />}
              {showLinksPopup && <LinksPopup />}
            </button>
            {/* Help */}
            <button
              onClick={() => setShowHelp(true)}
              onMouseEnter={() => setHoveredIcon("help")}
              onMouseLeave={() => setHoveredIcon(null)}
              className="relative ml-auto"
            >
              <div
                className={`w-12 h-12 bg-blue-600/15 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
                  activeApps.help ? "ring-2 ring-blue-600/50" : ""
                }`}
              >
                <BsFillPatchQuestionFill size={30} className="text-blue-600" />
              </div>
              {hoveredIcon === "help" && <Tooltip text="Help" />}
            </button>{" "}
          </div>{" "}
        </div>
        {/* icons */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-xl flex ml-auto my-2 mx-4">
          <div className="flex items-center gap-2">
            <BsFillVolumeUpFill size={25} />
            <BsWifi size={25} />
            <BsBatteryHalf size={25} />
          </div>
        </div>
        {/* DateTime */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-xl flex items-center my-2 mx-4">
          <div className="cursor-default text-sm text-left">
            {formatTime(currentDateTime)}
            <br />
            {formatDate(currentDateTime)}
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopDock;
