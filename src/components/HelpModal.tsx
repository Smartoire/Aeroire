import { useEffect, useState } from "react";
import {
  BsTerminal,
  BsLink45Deg,
  BsPeople,
  BsFillPinMapFill,
  BsCalendarWeek,
  BsBuildings
} from "react-icons/bs";
import { VscClose } from "react-icons/vsc";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTerminalClick?: () => void;
}

export default function HelpModal({
  isOpen,
  onClose,
  onTerminalClick
}: HelpModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setActiveStep(0);
    }
  }, [isOpen]);

  const steps = [
    {
      title: "Welcome to Smartoire Solutions!",
      content:
        "This is a website with interactive features. Let me show you around!",
      animation: "animate-fade-in",
      button: null
    },
    {
      title: "The Terminal",
      content:
        "The Terminal is your AI-powered assistant. Ask it anything about us, our projects, or our experience!",
      animation: "animate-slide-in-right",
      button: {
        text: "Open Terminal",
        icon: <BsTerminal size={20} />,
        onClick: () => {
          if (onTerminalClick) {
            onTerminalClick();
            handleClose();
          }
        }
      }
    },
    {
      title: "Desktop Dock",
      content:
        "The dock at the bottom contains all the main features of the website. Each icon represents a different section:",
      animation: "animate-slide-in-left",
      button: null,
      features: [
        { icon: <BsPeople size={20} />, text: "About us" },
        { icon: <BsCalendarWeek size={20} />, text: "Schedule an appointment" },
        { icon: <BsFillPinMapFill size={20} />, text: "Headquarter address" },
        { icon: <BsLink45Deg size={20} />, text: "Contact links" }
      ]
    },
    {
      title: "Corporation",
      content:
        "© 2025 Smartoire Solutions, under the umbrella of Smartoire Holding. Shaping Skills, Shaping Futures.",
      animation: "animate-slide-in-left",
      button: {
        text: "Group",
        icon: <BsBuildings size={20} />,
        onClick: () => {
          window.open('https://smartoire.org', '_blank')
        }
      }
    }

  ];

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
        onClick={handleClose}
      />
      <div
        className={`relative bg-gray-900/95 rounded-lg p-6 max-w-md w-full mx-4 transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <VscClose size={24} />
        </button>

        <div className={`${steps[activeStep].animation} mb-4`}>
          <h2 className="text-2xl font-bold text-white mb-2">
            {steps[activeStep].title}
          </h2>
          <p className="text-gray-300 mb-4">{steps[activeStep].content}</p>

          {steps[activeStep].features && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {steps[activeStep].features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <div className="text-white">{feature.icon}</div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeStep ? "bg-white" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {steps[activeStep].button && (
              <button
                onClick={steps[activeStep].button?.onClick}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                {steps[activeStep].button?.icon}
                {steps[activeStep].button?.text}
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {activeStep === steps.length - 1 ? "Got it!" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
