'use client';

import { Separator } from "@/components/ui/separator";
import * as Collapsible from "@radix-ui/react-collapsible";
import {  BarChart3, BookOpen, ChevronDown, ChevronLeft, Edit, LayoutGrid, Menu, PaletteIcon, Settings, Store, User, UserPlus, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import {easeInOut, motion} from "motion/react"
import { ReactNode, useState } from "react"
import { Button } from "@/components/ui/button";
import Link from "next/link";

type RouteGroupType = {
    group: string;
    items: {
        href: string;
        label: string;
        icon: ReactNode;
    }[];
};

const ROUTE_GROUPS: RouteGroupType[] = [
    {
    group: "Dashboard",
    items: [
      {
        href: "/admin",
        label: "Overview", 
        icon: <Store size={18} />,
      },
      {
        href: "/admin/analytics",
        label: "Analytics",
        icon: <BarChart3 size={18} />,
      }
    ]
  },
    {
    group: "Appearance",
    items: [
      {
        href: "/admin/themes",
        label: "Themes",
        icon: <PaletteIcon size={18} />,
      },
      {
        href: "/admin/menus",
        label: "Menus",
        icon: <Menu size={18} />,
      },
      {
        href: "/admin/widgets",
        label: "Widgets",
        icon: <LayoutGrid size={18} />,
      }
    ]
  },
    {
    group: "Users",
    items: [
      {
        href: "/admin/users",
        label: "All Users",
        icon: <Users size={18} />,
      },
      {
        href: "/admin/users/new",
        label: "Add New User",
        icon: <UserPlus size={18} />,
      },
      {
        href: "/admin/profile",
        label: "Your Profile",
        icon: <User size={18} />,
      }
    ]
  },
    {
    group: "Settings",
    items: [
      {
        href: "/admin/settings/general",
        label: "General Settings",
        icon: <Settings size={18} />,
      },
      {
        href: "/admin/settings/writing",
        label: "Writing Settings",
        icon: <Edit size={18} />,
      },
      {
        href: "/admin/settings/reading",
        label: "Reading Settings", 
        icon: <BookOpen size={18} />,
      }
    ]
  }
]

type RouteGroupProps = RouteGroupType;

const RouteGroup = ({group, items}: RouteGroupProps) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Collapsible.Root open={open} onOpenChange={setOpen}>
            <Collapsible.Trigger asChild>
                <button
                  className="flex justify-between w-full font-normal text-foreground/80"
                >
                    {group}
                    <div className={`transition-transform ${open ? 'rotate-180' : ""}`}>
                        <ChevronDown/>
                    </div>
                </button>
            </Collapsible.Trigger>
            <Collapsible.Content forceMount>
                <motion.div
                className={`flex flex-col gap-2 ${!open ? "pointer-events-none" : ""}`}
                initial={{height: 0, opacity: 0}}
                animate={{height: open ?"auto" : 0, opacity: open ? 1 : 0}}
                transition={{duration: 0.2, ease: easeInOut}}
                >
                    {
                      items.map((item)=>(
                        <Button
                        className="justify-start w-full font-medium"
                        variant='link'
                        asChild
                        key={item.href}
                        >
                           <Link
                           className={`flex items-center rounded-md px-5 py-1 transition-all ${pathname === item.href? "bg-foreground/10 hover:bg-foreground/5" : "hover:bg-foreground/10"}`}
                           href={item.href}
                           >
                            {item.icon}
                            <span className="text-sm">{item.label}</span>
                           </Link>
                        </Button>
                      ))
                    }
                </motion.div>
            </Collapsible.Content>
        </Collapsible.Root>
    )

}

type DashboardLayoutProps = {
  children: ReactNode
}

const DashboardLayout  = ({children}:DashboardLayoutProps) => {
    const [open ,setOpen] = useState(false)
  
  
    return (
        <div className="flex">
            <Collapsible.Root  open={open} onOpenChange={setOpen}>
                <Collapsible.Trigger asChild>
                    <Menu/>
                </Collapsible.Trigger>
            </Collapsible.Root>

            <Collapsible.Root  open={open} onOpenChange={setOpen}>
                 <Collapsible.Content forceMount>
                    <div className={`top-0 left-0 fixed bg-background p-4 border w-64 h-screen transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="flex justify-between items-center">
                            <h1>Admin Dashboard</h1>
                            <Collapsible.Trigger asChild>
                                <Button 
                                size="icon"
                                variant="outline"
                                >
                                  <ChevronLeft/>
                                </Button>
                            </Collapsible.Trigger>
                        </div>
                        <Separator className="my-2"/>

                        <div>
                           {ROUTE_GROUPS.map((routeGoupe)=>(
                             <RouteGroup {...routeGoupe} key={routeGoupe.group}/>
                           ))}
                            
                        </div>
                    </div>
                </Collapsible.Content>
            </Collapsible.Root>
            <main
                className={`transition-margin mt-13 flex-1 p-4 duration-300 ${open ? 'ml-64' : 'ml-0'}`}
            >
                {children}
            </main>
        </div>
    )
}


export {DashboardLayout};