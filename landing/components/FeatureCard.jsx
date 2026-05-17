import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { hoverLift } from "../animations";

export default function FeatureCard({ icon: Icon, title, desc, link }) {
  return (
    <motion.article
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      className="group h-full"
    >
      <div className="surface-card rounded-xl p-6 h-full flex flex-col transition-shadow duration-300 group-hover:shadow-elevated">
        <div className="w-10 h-10 rounded-lg border border-luxury-border bg-luxury-muted/50 flex items-center justify-center mb-5">
          <Icon className="w-[18px] h-[18px] text-luxury-accent" strokeWidth={1.5} />
        </div>

        <h3 className="text-[17px] font-semibold tracking-luxury text-luxury-ink mb-2">
          {title}
        </h3>

        <p className="text-sm text-luxury-body leading-relaxed flex-1 mb-6">{desc}</p>

        <Link
          to={link}
          className="inline-flex items-center gap-2 text-sm font-medium text-luxury-accent hover:opacity-80 transition-opacity duration-300"
          aria-label={`Learn more about ${title}`}
        >
          Explore
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
        </Link>
      </div>
    </motion.article>
  );
}
