import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Building,
  ChevronsUpDown,
  Component,
  DoorOpen,
  Layers,
  Layers2,
  LayoutDashboardIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";

const items = [
  //   {
  //     title: "Home",
  //     url: "/bank-dashboard",
  //     icon: LayoutDashboardIcon,
  //   },
  // {
  // 	title: "Admins",
  // 	url: "/dashboard/admins",
  // 	icon: UserPlusIcon,
  // },
  {
    title: "Appointments",
    url: "appointments",
    icon: Layers,
  },
  {
    title: "Donors",
    url: "donors",
    icon: UsersIcon,
  },
  {
    title: "Request Forms",
    url: "request-forms",
    icon: Layers,
  },
  //   {
  //     title: "Appointments",
  //     url: "appointments",
  //     icon: Layers,
  // children: [
  // 	{
  // 		title: "Buildings",
  // 		url: "/dashboard/property/buildings",
  // 		icon: Building,
  // 	},
  // 	// {
  // 	// 	title: "Floors",
  // 	// 	url: "/dashboard/property/floors",
  // 	// 	icon: Layers2,
  // 	// },
  // 	// {
  // 	// 	title: "Rooms",
  // 	// 	url: "/dashboard/property/rooms",
  // 	// 	icon: DoorOpen,
  // 	// },
  // 	// {
  // 	// 	title: "Room Types",
  // 	// 	url: "/dashboard/property/room-types",
  // 	// 	icon: Component,
  // 	// },
  // ],
  //   },
];

const MainSection = () => {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Apps</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            if (item.children) {
              return (
                <Collapsible className="group/collapsible" key={item.title}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className="flex cursor-pointer items-center justify-between"
                        isActive={pathname.includes(item.url)}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="size-4" /> {item.title}
                        </div>
                        <ChevronsUpDown />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child.title}>
                          <SidebarMenuButton
                            asChild
                            tooltip={child.title}
                            isActive={pathname.includes(child.url)}
                          >
                            <Link to={child.url}>
                              <child.icon /> {child.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              );
            }
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={
                    item.url === "/dashboard"
                      ? pathname.endsWith(item.url)
                      : pathname.includes(item.url)
                  }
                >
                  <Link to={item.url}>
                    <item.icon /> {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default MainSection;
