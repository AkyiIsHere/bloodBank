import { SidebarTrigger } from "@/components/ui/sidebar";
import NavProfile from "./nav-profile";
import ModeToggle from "@/components/ui/mode-toggle";

export default function Navbar() {
  return (
    <header className="bg-sidebar sticky m-4 h-16 rounded-lg">
      <nav className="flex w-full items-center justify-between px-4 py-2">
        <SidebarTrigger size="icon" />
        <div className="ml-auto flex items-center gap-2">
          {/* <ModeToggle /> */}
          <ModeToggle />
          {/* This is navbar */}
          <NavProfile />
        </div>
      </nav>
    </header>
  );
}
