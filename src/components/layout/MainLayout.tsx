import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer } from "@/components/common";

export default function MainLayout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--surface-1)" }}
    >
      <Navbar />
      <main className="flex-1">
        <div className="max-w-[1280px] mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

function Footer() {
  const BG = "#1f2133";
  const DIV = "#2c3050";
  const TH = "#8892b0";
  const TB = "#ccd6f6";
  const TM = "#5a6494";

  return (
    <footer style={{ background: BG, marginTop: 48 }}>
      {/* 3 cột */}
      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* ── Cột 1: Chính sách + social ── */}
          <div>
            <p
              className="mb-4 text-[11px] font-bold uppercase tracking-widest"
              style={{ color: TH }}
            >
              Chính sách &amp; Điều khoản dịch vụ
            </p>
            <ul className="space-y-2">
              {[
                "Hướng dẫn mua hàng",
                "Chính sách thanh toán",
                "Chính sách giao, nhận & vận chuyển",
                "Chính sách đổi, trả hàng & Hoàn tiền",
                "Chính sách bảo mật",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-sm hover:text-orange-400 transition-colors"
                    style={{ color: TB }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 mt-6">
              {/* Facebook */}
              <a
                href="#"
                className="w-8 h-8 rounded flex items-center justify-center hover:text-white transition-colors"
                style={{ color: TB }}
              >
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                className="w-8 h-8 rounded flex items-center justify-center hover:text-white transition-colors"
                style={{ color: TB }}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* X */}
              <a
                href="#"
                className="w-8 h-8 rounded flex items-center justify-center hover:text-white transition-colors"
                style={{ color: TB }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Zalo */}
              <a
                href="#"
                className="h-8 px-2.5 rounded text-xs font-bold flex items-center hover:text-white transition-colors"
                style={{ color: TB, border: `1px solid ${DIV}` }}
              >
                Zalo
              </a>
            </div>
          </div>

          {/* ── Cột 2: Thông tin công ty ── */}
          <div>
            <p
              className="mb-4 text-[11px] font-bold uppercase tracking-widest"
              style={{ color: TH }}
            >
              Công ty TNHH Simba F&amp;B Solutions
            </p>
            <ul className="space-y-3">
              {[
                {
                  svg: (
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  ),
                  text: "Giới thiệu về Sim Ba F&B Solutions",
                },
                {
                  svg: (
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.1A16 16 0 0 0 13 15l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16v.92z" />
                    </svg>
                  ),
                  text: "Hotline: 028 7770 4567",
                },
                {
                  svg: (
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 7L2 7" />
                    </svg>
                  ),
                  text: "Email: binh.nguyen@simba.com.vn",
                },
                {
                  svg: (
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  ),
                  text: "Mã số thuế: 0315453821",
                },
              ].map(({ svg, text }, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-relaxed"
                  style={{ color: TB }}
                >
                  <span className="shrink-0 mt-0.5" style={{ color: TH }}>
                    {svg}
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Cột 3: Địa chỉ + Map ── */}
          <div>
            <p
              className="mb-4 text-[11px] font-bold uppercase tracking-widest"
              style={{ color: TH }}
            >
              Trụ sở Hồ Chí Minh
            </p>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: TB }}>
              Khu dịch vụ số 05 tầng 6 tháp R1 Cao Ốc Everrich, số 968 đường Ba
              Tháng Hai, Phường 15, Quận 11, Tp. Hồ Chí Minh, Việt Nam
            </p>
            <div
              className="relative w-full overflow-hidden rounded-xl"
              style={{ height: 148, border: `1px solid ${DIV}` }}
            >
              <iframe
                title="FNB HUB Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.547203744566!2d106.65506897573766!3d10.757360089389514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3b3d4b%3A0xabc123!2zQ2FvIOG7kGMgRXZlcnJpY2g!5e0!3m2!1svi!2s!4v1709999999999!5m2!1svi!2s"
                width="100%"
                height="148"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://maps.google.com/?q=Cao+Oc+Everrich+Quan+11+Ho+Chi+Minh"
                target="_blank"
                rel="noreferrer"
                className="absolute top-2 left-2 text-xs font-medium bg-white rounded px-2 py-0.5 shadow"
                style={{ color: "#1a73e8" }}
              >
                Xem bản đồ lớn hơn ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: `1px solid ${DIV}` }}>
        <div className="max-w-[1280px] mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-2">
          <div
            className="flex items-center gap-3 text-xs"
            style={{ color: TM }}
          >
            <span>Phim tắt</span>
            <span>·</span>
            <span>Dữ liệu bản đồ © 2026</span>
            <span>·</span>
            <a href="#" className="hover:underline" style={{ color: TM }}>
              Điều khoản
            </a>
          </div>
          <p className="text-xs" style={{ color: TM }}>
            © 2026 FNB HUB — Nền tảng F&amp;B số 1 Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
