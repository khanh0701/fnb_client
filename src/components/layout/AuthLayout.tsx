import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from "@/components/common";

export default function AuthLayout() {
  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--surface-1)" }}
    >
      {/* Left panel - brand */}
      <div
        className="hidden lg:flex w-[45%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "var(--navbar-top)" }}
      >
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-10"
          style={{ background: "var(--brand)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10"
          style={{ background: "var(--brand)" }}
        />
        <Link to="/" className="flex items-center gap-3 z-10">
          <img
            src="/logo.png"
            alt="FNB HUB"
            className="h-12 w-12 rounded-xl object-cover shadow-lg"
          />
          <div>
            <p className="font-display font-black text-2xl text-white">
              FNB HUB
            </p>
            <p className="text-xs text-gray-400 mt-0.5 tracking-widest">
              PLATFORM
            </p>
          </div>
        </Link>
        <div className="z-10">
          <h2 className="font-display font-black text-4xl text-white leading-tight mb-4">
            Nền tảng F&B
            <br />
            <span style={{ color: "var(--brand)" }}>số 1</span> Việt Nam
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Kết nối sang nhượng, cho thuê và tuyển dụng trong ngành ẩm thực & đồ
            uống.
          </p>
          <div className="flex gap-8 mt-8">
            {[
              ["2,400+", "Sang nhượng"],
              ["8,900+", "Việc làm"],
              ["45K+", "Thành viên"],
            ].map(([n, l]) => (
              <div key={l}>
                <p
                  className="font-display font-black text-2xl"
                  style={{ color: "var(--brand)" }}
                >
                  {n}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-600 z-10">© 2026 FNB HUB</p>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex flex-col items-center gap-2">
              <img
                src="/logo.png"
                alt="FNB HUB"
                className="h-16 w-16 rounded-2xl object-cover shadow-lg"
              />
              <p
                className="font-display font-black text-2xl"
                style={{ color: "var(--brand)" }}
              >
                FNB HUB
              </p>
            </Link>
          </div>
          <div
            className="rounded-2xl border p-8"
            style={{
              background: "var(--surface-0)",
              borderColor: "var(--border-c)",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
