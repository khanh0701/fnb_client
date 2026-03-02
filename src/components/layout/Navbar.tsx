import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Bell,
  ShoppingCart,
  LogOut,
  UserCircle,
  Plus,
  Sun,
  Moon,
  Globe,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/hooks/useAuth";
import { useUIStore } from "@/store/uiStore";
import { can } from "@/utils/permissions";
import { getInitials } from "@/utils";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { label: "Tất cả", value: "" },
  { label: "Sang nhượng", value: "sang-nhuong" },
  { label: "Cho thuê", value: "cho-thue" },
  { label: "Việc làm", value: "viec-lam" },
  { label: "Nhượng quyền", value: "nhuong-quyen" },
];

const NAV_ITEMS = [
  { to: "/sang-nhuong", label: "Sang nhượng" },
  // { to: "/cho-thue", label: "Cho thuê" },
  { to: "/viec-lam", label: "Tìm việc" },
  // { to: "/nhuong-quyen", label: "Nhượng quyền" },
];

export default function Navbar() {
  const { isAuthenticated, user } = useAuthStore();
  const logout = useLogout();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useUIStore();

  const [search, setSearch] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [selCat, setSelCat] = useState(CATEGORIES[0]);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";

  // Close dropdowns on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node))
        setCatOpen(false);
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setDropOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleTheme = () => {
    setSpinning(true);
    toggleTheme();
  };
  useEffect(() => {
    if (!spinning) return;
    const t = setTimeout(() => setSpinning(false), 420);
    return () => clearTimeout(t);
  }, [spinning]);

  const handleSearch = () => {
    if (!search.trim()) return;
    const base = selCat.value || "sang-nhuong";
    navigate(`/${base}?q=${encodeURIComponent(search.trim())}`);
    setSearch("");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ══════ TOP BAR (dark) ══════ */}
      <div className="w-full" style={{ background: "var(--navbar-top)" }}>
        <div className="max-w-[1280px] mx-auto px-4 h-14 flex items-center gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group mr-4">
            <img
              src="/logo.png"
              alt="FNB HUB"
              className="h-9 w-9 rounded-lg object-cover"
            />
            <span className="font-display font-black text-lg text-white tracking-tight">
              FNB <span style={{ color: "var(--brand)" }}>HUB</span>
            </span>
          </Link>

          {/* Location pill */}
          {/* <div className="hidden sm:flex flex-col leading-none text-xs text-gray-400 shrink-0 mr-1">
            <span>Deliver to</span>
            <span className="text-white font-semibold flex items-center gap-0.5 mt-0.5">
              <Globe size={11} /> Vietnam
            </span>
          </div> */}

          {/* ── Search bar ── */}
          <div className="flex-1 mx-2">
            <div className=" max-w-[720px] mx-auto h-10">
              {/* Category dropdown */}
              {/* <div className="relative shrink-0" ref={catRef}>
                <button
                  onClick={() => setCatOpen((v) => !v)}
                  className="flex items-center gap-1 px-3 h-full text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border-r border-gray-200"
                  style={{ minWidth: 96 }}
                >
                  {selCat.label}{" "}
                  <ChevronDown
                    size={13}
                    className={cn(
                      "transition-transform",
                      catOpen && "rotate-180"
                    )}
                  />
                </button>
                {catOpen && (
                  <div className="absolute left-0 top-full mt-1 w-44 rounded-lg border border-gray-200 bg-white shadow-lg z-50 overflow-hidden animate-slide-down">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => {
                          setSelCat(c);
                          setCatOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors",
                          c.value === selCat.value &&
                            "bg-orange-50 text-orange-600 font-medium"
                        )}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div> */}

              {/* Input */}
              {/* <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Bạn đang tìm gì?"
                className="flex-1 px-4 text-sm bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
              /> */}

              {/* Search button */}
              {/* <button
                onClick={handleSearch}
                className="flex items-center justify-center w-12 h-full shrink-0 transition-opacity hover:opacity-90"
                style={{ background: "var(--brand)" }}
              >
                <Search size={17} className="text-white" />
              </button> */}
            </div>
          </div>

          {/* Right icons */}
          <div className="hidden md:flex items-center gap-1 shrink-0">
            {/* Theme */}
            <button
              onClick={handleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              {isDark ? (
                <Sun size={16} className={spinning ? "animate-spin" : ""} />
              ) : (
                <Moon size={16} className={spinning ? "animate-spin" : ""} />
              )}
            </button>

            {/* Lang */}
            {/* <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all">
              🇻🇳 VI <ChevronDown size={11} />
            </button> */}

            {isAuthenticated && user ? (
              <>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10">
                  <MessageSquare size={16} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 relative">
                  <Bell size={16} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10">
                  <ShoppingCart size={16} />
                </button>

                {/* User avatar dropdown */}
                <div className="relative ml-1" ref={dropRef}>
                  <button
                    onClick={() => setDropOpen((v) => !v)}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-white/10 transition-all"
                  >
                    <Avatar className="h-7 w-7 rounded-lg">
                      <AvatarFallback className="rounded-lg text-xs bg-orange-500 text-white font-bold">
                        {getInitials(user.fullName || user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown
                      size={12}
                      className={cn(
                        "text-gray-400 transition-transform",
                        dropOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {dropOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border bg-white shadow-xl z-50 overflow-hidden animate-slide-down">
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {user.fullName || user.username}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                        <Badge className="mt-1.5 text-xs bg-orange-100 text-orange-600 hover:bg-orange-100">
                          {user.roles?.[0]?.roleName ?? user.role}
                        </Badge>
                      </div>
                      <div className="p-1.5">
                        {can.createTransfer(user) && (
                          <DropLink
                            to="/sang-nhuong/tao-tin"
                            icon={<Plus size={14} />}
                            label="Đăng tin sang nhượng"
                            onClick={() => setDropOpen(false)}
                          />
                        )}
                        {can.createJob(user) && (
                          <DropLink
                            to="/viec-lam/dang-tuyen"
                            icon={<Plus size={14} />}
                            label="Đăng tuyển dụng"
                            onClick={() => setDropOpen(false)}
                          />
                        )}
                        <DropLink
                          to="/ho-so"
                          icon={<UserCircle size={14} />}
                          label="Hồ sơ cá nhân"
                          onClick={() => setDropOpen(false)}
                        />
                        <div className="my-1 h-px bg-gray-100" />
                        <button
                          onClick={() => {
                            setDropOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} /> Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 ml-1">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-sm font-semibold rounded-lg text-white transition-all hover:opacity-90"
                  style={{ background: "var(--brand)" }}
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-300 hover:bg-white/10"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ══════ SECONDARY NAV (white) ══════ */}
      <div
        className="hidden md:block w-full border-b"
        style={{
          background: "var(--navbar-bg)",
          borderColor: "var(--border-c)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4">
          <nav className="flex items-center gap-0 h-11">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "px-5 h-full flex items-center text-sm font-medium border-b-2 transition-all",
                    isActive
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent text-gray-600 hover:text-orange-500 hover:border-orange-200"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* ══════ MOBILE MENU ══════ */}
      {mobileOpen && (
        <div
          className="md:hidden w-full border-b shadow-lg animate-slide-down"
          style={{
            background: "var(--surface-0)",
            borderColor: "var(--border-c)",
          }}
        >
          {/* Mobile search */}
          <div
            className="px-4 py-3 border-b"
            style={{ borderColor: "var(--border-c)" }}
          >
            <div className="fnb-search h-10">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                    setMobileOpen(false);
                  }
                }}
                placeholder="Bạn đang tìm gì?"
                className="flex-1 px-4 text-sm bg-transparent outline-none"
              />
              <button
                onClick={() => {
                  handleSearch();
                  setMobileOpen(false);
                }}
                className="w-12 h-full flex items-center justify-center"
                style={{ background: "var(--brand)" }}
              >
                <Search size={16} className="text-white" />
              </button>
            </div>
          </div>

          <nav className="py-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex px-5 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "text-orange-500 bg-orange-50"
                      : "text-gray-700 hover:bg-gray-50"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div
            className="px-4 py-3 border-t flex items-center justify-between"
            style={{ borderColor: "var(--border-c)" }}
          >
            <button
              onClick={handleTheme}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
              {isDark ? "Chế độ sáng" : "Chế độ tối"}
            </button>
            {!isAuthenticated && (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-1.5 text-sm text-gray-600 border rounded-lg"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-1.5 text-sm font-semibold text-white rounded-lg"
                  style={{ background: "var(--brand)" }}
                >
                  Đăng ký
                </Link>
              </div>
            )}
            {isAuthenticated && user && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {user.firstName || user.username}
                </span>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  className="text-sm text-red-500"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function DropLink({
  to,
  icon,
  label,
  onClick,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
    >
      <span className="text-gray-400">{icon}</span>
      {label}
    </Link>
  );
}
