import smartoire from "../assets/logo.png";
import { author } from "../config/author";
import DraggableWindow from "./DraggableWindow";

interface AboutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutUs({ isOpen, onClose }: AboutProps) {
  if (!isOpen) return null;

  const partnerLogos = [
    {
      src: "/logos/AWS.webp",
      name: "Amazon Web Services",
      url: "https://aws.amazon.com/",
    },
    {
      src: "/logos/Azure.webp",
      name: "Microsoft Azure",
      url: "https://azure.microsoft.com/",
    },
    {
      src: "/logos/Catalyte.webp",
      name: "Catalyte",
      url: "https://www.catalyte.io/",
    },
    {
      src: "/logos/GCP.webp",
      name: "Google Cloud Platform",
      url: "https://cloud.google.com/",
    },
    {
      src: "/logos/Interac.webp",
      name: "Interac",
      url: "https://www.interac.ca/",
    },
    {
      src: "/logos/EInspection.webp",
      name: "Energy Inspection",
      url: "https://einspection.ca/",
    },
    { src: "/logos/Udemy.webp", name: "Udemy", url: "https://www.udemy.com/" },
    { src: "/logos/Metrc.webp", name: "Metrc", url: "https://www.metrc.com/" },
    {
      src: "/logos/DCPayments.webp",
      name: "Digital Commerce Payments",
      url: "https://www.dc-payments.ca/",
    },
    {
      src: "/logos/Cloudflare.webp",
      name: "Cloudflare",
      url: "https://www.cloudflare.com/",
    },
    {
      src: "/logos/Muse.webp",
      name: "Muse",
      url: "https://www.choosemuse.com/",
    },
    {
      src: "/logos/Brotherhood.webp",
      name: "Brotherhood Mutual",
      url: "https://www.brotherhoodmutual.com/",
    },
    {
      src: "/logos/Payments.webp",
      name: "Payments Canada",
      url: "https://www.payments.ca/",
    },
    {
      src: "/logos/Moneyway.webp",
      name: "Moneyway Financial Group",
      url: "https://www.moneyway.com/",
    },
    {
      src: "/logos/myOrthos.webp",
      name: "myOrthos",
      url: "https://myorthos.com/",
    },
    {
      src: "/logos/Peoples.webp",
      name: "Peoples Group",
      url: "https://www.peoplesgroup.com/",
    },
  ]
    .map((value) => ({ value, sort: Math.random() })) // attach random sort key
    .sort((a, b) => a.sort - b.sort) // sort randomly
    .map(({ value }) => value); // return shuffled array

  return (
    <DraggableWindow
      title={`About ${author.nickname}`}
      onClose={onClose}
      initialPosition={{
        x: Math.floor(window.innerWidth * 0.1),
        y: Math.floor(window.innerHeight * 0.1),
      }}
      initialSize={{
        width: Math.floor(window.innerWidth * 0.75), // 75% width
        height: Math.floor(window.innerHeight * 0.7), // 70% height
      }}
      className="bg-black/40 backdrop-blur-sm"
    >
      <div className="max-h-full overflow-y-auto space-y-12 p-6 text-white">
        <img src={smartoire.src} alt="Smartoire" className="w-3/4 mx-auto" />

        {/* Intro */}
        <section className="flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0 p-6 bg-gray-800 rounded-lg">
          <div className="space-y-4 mt-4 md:mt-0">
            <h1 className="text-3xl font-bold">
              We simplifying complexity with tailored technology and automation
            </h1>
            <p>
              Smartoire helps businesses streamline operations, improve
              efficiency, and achieve meaningful growth in complex environments.
            </p>
            <p>
              We design technology solutions that simplify workflows and enhance
              scalability. By implementing Microsoft Dynamics 365 and Power
              Platform, we enable organizations to optimize processes and focus
              on innovation and expansion.
            </p>
            <p>
              Our solutions empower clients to reduce complexity, improve
              performance, and unlock new opportunities for growth.
            </p>
          </div>
        </section>

        {/* Commitment */}
        <section className="flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0 p-6 bg-white rounded-lg">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 text-yellow-800">
            <div className="md:w-1/2 space-y-2">
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p>
                We empower organizations through smart, scalable technology that
                simplifies operations and drives growth. Our solutions increase
                agility, improve efficiency, and help businesses thrive.
              </p>
            </div>
            <div className="md:w-1/2 space-y-2">
              <h3 className="text-xl font-semibold">Our Values</h3>
              <p>
                We value integrity, innovation, and collaboration. We build
                lasting partnerships by delivering solutions that adapt to
                clients' changing needs and ensure long-term success.
              </p>
            </div>
          </div>
        </section>
        {/* Our Journey */}
        <section className="flex flex-col md:flex-row-reverse items-center md:space-x-8 md:space-x-reverse space-y-4 md:space-y-0 p-6 bg-gray-700 rounded-lg">
          <div className="md:w-4/5 space-y-3 mt-4 md:mt-0">
            <h2 className="text-2xl font-semibold">Our Journey</h2>
            <p className="italic">
              The Evolution of Smartoire as a Cloud Solutions Partner
            </p>
            <p>
              Founded by a team of industry experts, Smartoire was created to
              solve modern business challenges. From day one, we've focused on
              simplifying workflows and delivering real value through scalable
              technology.
            </p>
            <p>
              Partnering with Microsoft Dynamics 365 and Power Platform allows
              us to create custom systems that grow with our clients' needs,
              supporting long-term success across industries.
            </p>
          </div>
        </section>

        {/* Partner Logos */}
        <section className="p-6 bg-black rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-400 text-center mb-8">
            Proudly cooperating with industry leaders
          </h2>
          <div className="columns-1 md:columns-3">
            {partnerLogos.map((logo, index) => (
              <a
                key={index}
                href={logo.url} // link to logo URL
                target="_blank" // open in new tab
                rel="noopener noreferrer" // security for external links
                className="block m-8" // ensure spacing works with columns
              >
                <img
                  src={logo.src}
                  alt={logo.name} // accessible alt text
                  title={logo.name} // optional tooltip
                  className="w-full rounded-lg shadow-lg"
                />
              </a>
            ))}
          </div>
        </section>

        {/* Fun Fact */}
        <section className="flex flex-col md:flex-row-reverse items-center md:space-x-8 md:space-x-reverse p-6 bg-yellow-200 rounded-lg">
          <div className="md:w-3/4 bg-white/10 p-4 rounded-lg space-y-2 mt-4 md:mt-0 text-black">
            <h3 className="text-lg font-semibold">Fun Fact</h3>
            <p>
              The suffix <span className="font-mono">-oire</span> is used to
              form words for objects or tools used to do something, or places
              where something is done.
            </p>
          </div>
        </section>
      </div>
    </DraggableWindow>
  );
}
