import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { CiMail } from "react-icons/ci";

import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function Header() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed left-0 right-0 top-0 z-[50] m-4 flex justify-between">
      <motion.div variants={itemVariants}>
        <span className="hidden md:inline">Moko</span>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Link
          href="mailto:info@moko.com"
          rel="noopener noreferrer"
          target="_blank">
          <Button
            size="sm"
            variant="secondary"
            className="text-yellow-50 transition-all duration-150 ease-linear md:hover:text-yellow-200">
            <CiMail className="md:mr-1.5" />
            <span className="hidden md:inline">contact us</span>
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
