import { useEffect, useState } from "react";

import desktopBg from "../assets/desktopBg.webp";
import mobileBg from "../assets/mobileBg.webp";
import AboutUs from "../components/AboutUs";
import DesktopDock from "../components/DesktopDock";
import MapApp from "../components/MapApp";
import MobileDock from "../components/MobileDock";
import Terminal from "../components/Terminal";

export default function Desktop() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const [activeApps, setActiveApps] = useState({
    terminal: false,
    about: false,
    map: false,
    help: false,
  });

  const handleAppOpen = (app: keyof typeof activeApps) => {
    setActiveApps((prev) => ({
      ...prev,
      [app]: true,
    }));
  };

  const handleAppClose = (app: keyof typeof activeApps) => {
    setActiveApps((prev) => ({
      ...prev,
      [app]: false,
    }));
  };

  // Open terminal after page load (delay so layout stabilizes and avoid scroll jump)
  useEffect(() => {
    // setShowTerminal(true);
    // handleAppOpen("terminal");
    // setShowMap(true);
    // handleAppOpen("map");
    setShowAbout(true);
    handleAppOpen("about");
    // ensure no unexpected scroll (optional)
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Mobile background */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${mobileBg.src})` }}
      />

      {/* Desktop background */}
      <div
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: `url(${desktopBg.src})` }}
      />

      <div className="relative z-0 flex items-center justify-center h-[calc(100vh-10rem)] md:h-[calc(100vh-1.5rem)] pt-6"></div>

      <MobileDock
        onAboutClick={() => {
          setShowAbout(true);
          handleAppOpen("about");
        }}
        onMapClick={() => {
          setShowMap(true);
          handleAppOpen("map");
        }}
      />
      <DesktopDock
        onTerminalClick={() => {
          setShowTerminal(true);
          handleAppOpen("terminal");
        }}
        onAboutClick={() => {
          setShowAbout(true);
          handleAppOpen("about");
        }}
        onMapClick={() => {
          setShowMap(true);
          handleAppOpen("map");
        }}
        activeApps={activeApps}
      />

      <AboutUs
        isOpen={showAbout}
        onClose={() => {
          setShowAbout(false);
          handleAppClose("about");
        }}
      />
      <Terminal
        isOpen={showTerminal}
        onClose={() => {
          setShowTerminal(false);
          handleAppClose("terminal");
        }}
      />
      <MapApp
        isOpen={showMap}
        onClose={() => {
          setShowMap(false);
          handleAppClose("map");
        }}
      />
    </div>
  );
}
