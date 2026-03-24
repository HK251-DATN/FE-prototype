import { useState } from "react";

const COUNTRIES = [
  { value: "vn", label: "Vietnam" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "jp", label: "Japan" },
  { value: "sg", label: "Singapore" },
];

const STATES = {
  vn: [
    { value: "hn", label: "Hà Nội" },
    { value: "hcm", label: "TP. Hồ Chí Minh" },
    { value: "dn", label: "Đà Nẵng" },
  ],
  us: [
    { value: "ca", label: "California" },
    { value: "ny", label: "New York" },
    { value: "tx", label: "Texas" },
  ],
  uk: [
    { value: "eng", label: "England" },
    { value: "sco", label: "Scotland" },
    { value: "wal", label: "Wales" },
  ],
  jp: [
    { value: "tok", label: "Tokyo" },
    { value: "osa", label: "Osaka" },
  ],
  sg: [{ value: "sg", label: "Singapore" }],
};

// Mock initial data – replace with real API data when available

export default function BillingForm({ onFormChange }) {
  const [form, setForm] = useState({});

  const update = (key, value) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    onFormChange?.(updated);
  };

  const availableStates = form.country ? (STATES[form.country] ?? []) : [];

  return (
    <div className="font-[Poppins] w-full">
      {/* ── Billing Information ── */}
      <h2 className="text-2xl font-medium text-[#1A1A1A] mb-6">
        Thông tin thanh toán
      </h2>

      {/* Row 1: First / Last / Company */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#1A1A1A]">Họ</label>
          <input
            type="text"
            placeholder="Nhập họ của bạn"
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className="h-[49px] px-4 rounded-[6px] border border-[#E6E6E6] bg-white text-base text-[#1A1A1A] placeholder-[#999] outline-none focus:border-[#00B207] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#1A1A1A]">Tên</label>
          <input
            type="text"
            placeholder="Nhập tên của bạn"
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className="h-[49px] px-4 rounded-[6px] border border-[#E6E6E6] bg-white text-base text-[#1A1A1A] placeholder-[#999] outline-none focus:border-[#00B207] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            <span className="text-[#1A1A1A]">Công ty </span>
            <span className="text-[#808080]">(tùy chọn)</span>
          </label>
          <input
            type="text"
            placeholder="Nhập tên công ty"
            value={form.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            className="h-[49px] px-4 rounded-[6px] border border-[#E6E6E6] bg-white text-base text-[#1A1A1A] placeholder-[#999] outline-none focus:border-[#00B207] transition-colors"
          />
        </div>
      </div>

      {/* Row 2: Street Address */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm text-[#1A1A1A]">Địa chỉ</label>
        <input
          type="text"
          placeholder="Nhập địa chỉ của bạn"
          value={form.streetAddress}
          onChange={(e) => update("streetAddress", e.target.value)}
          className="h-[49px] px-4 rounded-[6px] border border-[#E6E6E6] bg-white text-base text-[#1A1A1A] placeholder-[#999] outline-none focus:border-[#00B207] transition-colors w-full"
        />
      </div>

      {/* Row 3: Country / States */}
      {/* <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
          <label className="text-sm text-[#1A1A1A]">Country / Region</label>
          <div className="relative">
            <select
              value={form.country}
              onChange={(e) => {
                update("country", e.target.value);
                update("state", "");
              }}
              className="h-[49px] w-full px-4 pr-10 rounded-[6px] border border-[#E6E6E6] bg-white text-base text-[#999] outline-none focus:border-[#00B207] transition-colors appearance-none cursor-pointer"
              style={{ color: form.country ? "#1A1A1A" : "#999" }}
            >
              <option value="" disabled>
                Select
              </option>
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3.33332 5.66666L7.99999 10.3333L12.6667 5.66666"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#1A1A1A]">States</label>
          <div className="relative">
            <select
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              disabled={!form.country}
              className="h-[49px] px-4 pr-10 rounded-[6px] border border-[#E6E6E6] bg-white text-base outline-none focus:border-[#00B207] transition-colors appearance-none cursor-pointer disabled:opacity-60"
              style={{ color: form.state ? "#1A1A1A" : "#999" }}
            >
              <option value="" disabled>
                Selects
              </option>
              {availableStates.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3.33332 5.66666L7.99999 10.3333L12.6667 5.66666"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div> */}

      {/* Row 4: Email / Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#1A1A1A]">Email</label>
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="h-[49px] px-4 rounded-[6px] border border-[#E6E6E6] bg-white text-base text-[#1A1A1A] placeholder-[#999] outline-none focus:border-[#00B207] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#1A1A1A]">Số điện thoại</label>
          <input
            type="tel"
            placeholder="Nhập số điện thoại"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="h-[49px] px-4 rounded-[6px] border border-[#E6E6E6] bg-white text-base text-[#1A1A1A] placeholder-[#999] outline-none focus:border-[#00B207] transition-colors"
          />
        </div>
      </div>

      {/* Ship to different address */}
      <label className="flex items-center gap-2 cursor-pointer mb-6">
        <div
          className={`w-5 h-5 rounded-[3px] border flex items-center justify-center transition-colors ${
            form.shipToDifferent
              ? "border-[#00B207] bg-[#00B207]"
              : "border-[#CCC] bg-white"
          }`}
          onClick={() => update("shipToDifferent", !form.shipToDifferent)}
        >
          {form.shipToDifferent && (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path
                d="M1 5L4.5 8.5L11 1.5"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        {/* <span className="text-sm text-[#4D4D4D]">
          Ship to a different address
        </span> */}
      </label>

      {/* Divider */}
      <div className="w-full h-px bg-[#E6E6E6] mb-6" />

      {/* ── Additional Info ── */}
      <h2 className="text-2xl font-medium text-[#1A1A1A] mb-5">
        Thông tin bổ sung
      </h2>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-[#1A1A1A]">
          Ghi chú đơn hàng (Tùy chọn)
        </label>
        <textarea
          placeholder="Ghi chú về đơn hàng của bạn, ví dụ: ghi chú đặc biệt cho giao hàng"
          value={form.orderNotes}
          onChange={(e) => update("orderNotes", e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-[6px] border border-[#E6E6E6] bg-white text-base text-[#1A1A1A] placeholder-[#999] outline-none focus:border-[#00B207] transition-colors resize-none"
        />
      </div>
    </div>
  );
}
