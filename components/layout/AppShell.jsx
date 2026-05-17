import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/cn";
import Sidebar from "./sidebar/Sidebar";
import AppTopbar from "./AppTopbar";
import { SidebarProvider, useSidebar } from "./SidebarContext";

function AppShellInner() {
  const { pathname } = useLocation();
  const { collapsed, mobileOpen, closeMobile } = useSidebar();

  return (
    <div className="app-shell min-h-screen bg-luxury-bg text-luxury-ink">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-luxury-ink/25 backdrop-blur-[2px] lg:hidden"
          onClick={closeMobile}
        />
      )}

      <Sidebar />

      <div
        className={cn(
          "app-shell-main min-h-screen transition-[padding-left] duration-300 ease-luxury max-lg:pl-0",
          collapsed ? "lg:pl-[68px]" : "lg:pl-[240px]"
        )}
      >
        <AppTopbar />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="px-3 py-4 sm:px-4 lg:px-5 lg:py-5"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function AppShell() {
  return (
    <SidebarProvider>
      <AppShellInner />
    </SidebarProvider>
  );
}
