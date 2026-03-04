import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "./ui/text-blur";

const logos = [
  { src: "/linear.svg", alt: "Linear Logo" },
  { src: "/github.svg", alt: "GitHub Logo" },
  { src: "/confluence-blue.svg", alt: "Confluence Logo" },
  { src: "/sharepoint.svg", alt: "SharePoint Logo" },
  { src: "/office365.svg", alt: "Office 365 Logo" },
  { src: "/zendesk.svg", alt: "Zendesk Logo" }
  // { src: "/upstash.svg", alt: "Upstash Logo" },
  // { src: "/shadcn.svg", alt: "shadcn Logo" },
  // { src: "/vercel.svg", alt: "Vercel Logo" },
];

export default function Logos() {
  return (
    <motion.div
      className="flex h-full w-full flex-col gap-2 pb-12 pt-12 md:pb-24 md:pt-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-200 md:text-3xl"
          text="Works with"
        />
      </motion.div>

      {/* <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-base text-zinc-300 sm:text-lg"
          text="Simple and powerful tools that help you build faster"
          duration={0.8}
        />
      </motion.div> */}

      <motion.div
        variants={itemVariants}
        className="mt-4 grid w-full max-w-3xl grid-cols-2 items-center justify-center justify-items-center gap-4 md:mt-6 md:max-w-4xl md:grid-cols-3 md:gap-6 mx-auto">
        {logos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={100}
              height={100}
              className="h-auto w-32 opacity-85"
            />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
