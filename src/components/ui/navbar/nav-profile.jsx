import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("admin");
    const bankToken = localStorage.getItem("bank_admin");

    if (adminToken) {
      setUser({
        name: "Admin",
        role: "admin",
        avatar: "https://i.pravatar.cc/150?img=2",
      });
    } else if (bankToken) {
      try {
        const bankData = JSON.parse(localStorage.getItem("bank_data"));
        if (bankData) {
          setUser({
            name: bankData.title,
            role: "bank",
            avatar: "https://i.pravatar.cc/151?img=5",
          });
        }
      } catch (e) {
        console.error("Invalid bank_data:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    if (user.role === "admin") {
      localStorage.removeItem("admin");
      navigate("/dashboard/login");
    } else {
      localStorage.removeItem("bank_admin");
      localStorage.removeItem("bank_data");
      navigate("/bank-dashboard/login");
    }
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name?.[0] || "?"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground capitalize">
            {user.role}
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
