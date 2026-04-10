"use client"

import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { menu } from "@/navigation/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { MotionDiv } from "@/utils/framer.motion";
import { FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const MenuItem = ({
    icon,
    text,
    className = "",
    onClick
}: {
    icon: React.ReactNode;
    text: string;
    className?: string;
    onClick?: () => void;
}) => (
    <div className={`flex items-center gap-3 p-2 hover:bg-[var(--color-primary-light)] cursor-pointer ${className}`} onClick={onClick}>
        {icon}
        <span>{text}</span>
    </div>
);

const Header = ({ sidebarClick }: { sidebarClick: boolean }) => {
    const pathname = usePathname();
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showMenuDropdown, setShowMenuDropdown] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const userImageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                userImageRef.current &&
                !userImageRef.current.contains(event.target as Node)
            ) {
                setShowUserDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleSubMenu = (id: number) => {
        setOpenSubMenu(openSubMenu === id ? null : id);
    };

    const closeSidebarWithTransition = () => {
        // Add a small delay to allow the transition to complete smoothly
        setTimeout(() => {
            setShowSidebarMenu(false);
        }, 100);
    };

    const handleLogout = () => {
        alert("Logged Out!")
    };

    return (
        <div className={`w-full fixed z-50 ${sidebarClick
            ? "lg:w-[calc(100%-90px)]"
            : "lg:w-[calc(100%-252px)]"
            }`}>
            <div className="flex lg:hidden items-center justify-between px-4 py-3 bg-white transition-all ease-in-out duration-300">
                {showSidebarMenu ? (
                    <IoClose
                        size={26}
                        className="text-[var(--color-primary)] cursor-pointer"
                        onClick={() => setShowSidebarMenu(false)}
                    />
                ) : (
                    <GiHamburgerMenu
                        size={22}
                        className="text-[var(--color-primary)] cursor-pointer"
                        onClick={() => setShowSidebarMenu(true)}
                    />
                )}

                <div className="flex items-center gap-3 pl-4 pt-1">
                    <div ref={userImageRef} className="flex items-center rounded-full">
                        <Image
                            src="/logo.svg"
                            alt="company logo"
                            width={40}
                            height={40}
                            className="w-44 h-10 object-contain"
                        />
                    </div>

                </div>

                <div className="relative inline-block">
                    <BsThreeDotsVertical
                        size={20}
                        className="text-[var(--color-primary)] cursor-pointer"
                        onClick={() => setShowMenuDropdown(!showMenuDropdown)}
                    />

                    {showMenuDropdown && (
                        <MotionDiv>
                            <div className="absolute top-6 right-0 w-48 bg-white shadow-xl rounded-lg border border-gray-100 z-50 dropdown-menu p-2">
                                <div className="flex items-center gap-1 bg-gray-100 border-b border-gray-100 p-2 rounded-md mb-2">
                                    <img
                                        src="/avatar.png"
                                        alt="user"
                                        className="w-[45px] h-[45px] rounded-full border border-gray-200"
                                    />
                                    <div>
                                        <p className="text-[15px] font-semibold text-gray-800">
                                            Zubayer Farazi
                                        </p>
                                        <p className="text-[12px] text-gray-500 capitalize">
                                            Super Admin
                                        </p>
                                    </div>
                                </div>
                                <div className="border-b border-gray-300 pb-2 mb-2">
                                    <MenuItem
                                        icon={<FaUserCircle size={15} />}
                                        text="My Profile"
                                        className="text-[13px] text-gray-700 font-medium rounded-md hover:text-[var(--color-primary)]"
                                    />
                                    <MenuItem
                                        icon={<FaCog size={15} />}
                                        text="Settings"
                                        className="text-[13px] text-gray-700 font-medium rounded-md hover:text-[var(--color-primary)]"
                                    />
                                </div>

                                <MenuItem
                                    icon={<FaSignOutAlt size={15} />}
                                    text="Logout"
                                    className="text-red-500 text-[13px] font-medium rounded-md hover:bg-[var(--color-primary)]"
                                    onClick={handleLogout}
                                />
                            </div>
                        </MotionDiv>
                    )}
                </div>


                {showSidebarMenu && (
                    <div
                        className={`fixed top-17 left-0 w-full h-[calc(100vh-68px)] border-t border-gray-200 overflow-auto bg-white shadow-lg transform transition-all duration-300 ease-in-out ${showSidebarMenu ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                            }`}
                    >
                        <div className="p-4">
                            {menu.map((section) => (
                                <div key={section.sectionName} className="p-2 mb-2">
                                    <p className="text-[12px] text-[#092c4c] font-bold mb-2">
                                        {section.sectionName}
                                    </p>

                                    {section.items.map((item) => {
                                        const isParentActive = item.subItems.some(
                                            (subItem) => subItem.path === pathname
                                        );
                                        const isOpen = openSubMenu === item.id;
                                        const Icon = item.icon;

                                        return (
                                            <div key={item.id}>
                                                {item.subItems.length > 0 ? (
                                                    <div
                                                        onClick={() => toggleSubMenu(item.id)}
                                                        className={`w-full group px-[12px] py-[8px] flex items-center justify-between cursor-pointer rounded-md transition-all mb-[2px] ${isOpen || isParentActive
                                                            ? "bg-[#FFF7F0] text-[var(--color-primary)]"
                                                            : "hover:bg-gray-100"
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <span
                                                                className={`text-[18px] transition-all ${isOpen || isParentActive
                                                                    ? "text-[var(--color-primary)]"
                                                                    : "text-[#5b6670] group-hover:text-[var(--color-primary)]"
                                                                    }`}
                                                            >
                                                                <Icon />
                                                            </span>
                                                            <span
                                                                className={`text-[14px] font-medium transition-all ${isOpen || isParentActive
                                                                    ? "text-[var(--color-primary)]"
                                                                    : "text-[#5b6670] group-hover:text-[var(--color-primary)]"
                                                                    }`}
                                                            >
                                                                {item.name}
                                                            </span>
                                                        </div>

                                                        <span className="text-xl bg-gray-100 rounded-full">
                                                            {isOpen ? (
                                                                <RiArrowDropDownLine className="text-[var(--color-primary)]" />
                                                            ) : (
                                                                <RiArrowDropRightLine className="text-gray-600" />
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={item.path}
                                                        onClick={closeSidebarWithTransition}
                                                        className={`w-full group px-[12px] py-[8px] flex items-center justify-between cursor-pointer rounded-md transition-all mb-[2px] ${pathname === item.path
                                                            ? "bg-[#FFF7F0] text-[var(--color-primary)]"
                                                            : "hover:bg-gray-100"
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <span
                                                                className={`text-[18px] transition-all ${pathname === item.path
                                                                    ? "text-[var(--color-primary)]"
                                                                    : "text-[#5b6670] group-hover:text-[var(--color-primary)]"
                                                                    }`}
                                                            >
                                                                <Icon />
                                                            </span>
                                                            <span
                                                                className={`text-[14px] font-medium transition-all ${pathname === item.path
                                                                    ? "text-[var(--color-primary)]"
                                                                    : "text-[#5b6670] group-hover:text-[var(--color-primary)]"
                                                                    }`}
                                                            >
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                )}

                                                {item.subItems.length > 0 && isOpen && (
                                                    <ul>
                                                        {item.subItems.map((subItem) => {
                                                            const isActive = pathname === subItem.path;
                                                            return (
                                                                <li
                                                                    key={subItem.id}>
                                                                    <Link
                                                                        href={subItem.path}
                                                                        onClick={closeSidebarWithTransition}
                                                                        className={`block w-full rounded-md pl-6 py-2.5 p-2 text-[13px] transition-all 
                                                                            hover:bg-gray-100 hover:text-[var(--color-primary)] 
                                                                            ${isActive ? "text-[var(--color-primary)] font-medium" : "text-[#646b72]"}`}
                                                                    >
                                                                        <span className="flex justify-start items-center gap-2">
                                                                            <GoDotFill className="text-[10px]" />
                                                                            {subItem.name}
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {showSidebar && (
                <div className="" onClick={() => setShowSidebar(true)}></div>
            )}

            <div className="flex justify-end items-center px-4 lg:py-1.5 bg-white border-b border-gray-200">
                <div className="flex gap-4 items-center">
                    <div
                        ref={userImageRef}
                        className="hidden lg:flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors relative"
                        onClick={() => setShowUserDropdown(!showUserDropdown)}>
                        <MotionDiv className="flex item-center gap-1">
                            <img
                                src="/avatar.png"
                                alt="user"
                                className="w-[40px] h-[40px] rounded-lg"
                            />
                            <div>
                                <p className="text-[15px] font-semibold text-gray-800">Zubayer Farazi</p>
                                <p className="text-[12px] text-gray-500 capitalize">Super Admin</p>
                            </div>
                        </MotionDiv>
                    </div>

                    <div
                        ref={dropdownRef}
                        aria-hidden={!showUserDropdown}
                        className={[
                            "absolute top-[66px] right-4 bg-white shadow-xl rounded-xl border border-gray-100 p-2",
                            "origin-top-right transition-all duration-300 ease-out transform",
                            showUserDropdown
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 translate-y-4 scale-95 pointer-events-none",
                        ].join(" ")}
                    >
                        <div className="flex items-center gap-1 bg-gray-100 border-b border-gray-100 p-2 rounded-md mb-2">
                            <img
                                src="/avatar.png"
                                alt="user"
                                className="w-[45px] h-[45px] rounded-full border border-gray-200"
                            />
                            <div>
                                <p className="text-[15px] font-semibold text-gray-800">Zubayer Farazi</p>
                                <p className="text-[12px] text-gray-500 capitalize">Super Admin</p>
                            </div>
                        </div>

                        <div className="border-b border-gray-300 pb-2 mb-2">
                            <MenuItem
                                icon={<FaUserCircle size={15} />}
                                text="My Profile"
                                className="text-[13px] text-gray-700 font-medium rounded-md hover:text-[var(--color-primary)]"
                            />
                            <MenuItem
                                icon={<FaCog size={15} />}
                                text="Settings"
                                className="text-[13px] text-gray-700 font-medium rounded-md hover:text-[var(--color-primary)]"
                            />
                        </div>

                        <MenuItem
                            icon={<FaSignOutAlt size={15} />}
                            text="Logout"
                            className="text-red-500 text-[13px] font-medium rounded-md hover:bg-[var(--color-primary)]"
                            onClick={handleLogout}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
