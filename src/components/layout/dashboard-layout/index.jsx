import Navbar from "@/components/ui/navbar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import DashboardSidebar from "../../ui/sidebar/index";

export default function DashboardLayout() {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<SidebarInset className='h-[calc(100svh-16px)] overflow-hidden'>
				<Navbar />
				<main className='z-10 h-full w-full overflow-auto px-4 pt-6 pb-4'>
					<Outlet />
				</main>
				<footer className='my-2 text-center text-xs text-gray-500'>
					COPYRIGHT &copy; {new Date().getFullYear()} , All rights
					Reserved
				</footer>
			</SidebarInset>
		</SidebarProvider>
	);
}
