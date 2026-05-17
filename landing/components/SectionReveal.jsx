import { motion } from "framer-motion";
import { viewportOnce } from "../animations";

export default function SectionReveal({
  children,
  className = "",
  variants,
  delay = 0,
  as = "section",
  ...rest
}) {
  const Component = motion[as] || motion.section;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
