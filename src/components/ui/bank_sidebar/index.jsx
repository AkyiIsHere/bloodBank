import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import MainSection from "./main-section";
import SettingSection from "./setting-section";
import { record } from "zod";

const DashboardSidebar = () => {
  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <MainSection />
        <Separator />
        {/* <SettingSection /> */}
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
