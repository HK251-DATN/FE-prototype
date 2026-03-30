import { useState } from "react";

export default function Index() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contact Section */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-[1380px] mx-auto">
          {/* Contact Info Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-[0_0_56px_0_rgba(0,38,3,0.08)] p-5 h-full">
              {/* Address */}
              <div className="flex flex-col items-center gap-4 py-6">
                <svg
                  className="w-[51px] h-[51px]"
                  width="51"
                  height="51"
                  viewBox="0 0 51 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1562 46.2188H39.8438"
                    stroke="#2C742F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M25.5 27.0938C27.1908 27.0938 28.8123 26.4221 30.0078 25.2266C31.2033 24.031 31.875 22.4095 31.875 20.7188C31.875 19.028 31.2033 17.4065 30.0078 16.2109C28.8123 15.0154 27.1908 14.3438 25.5 14.3438C23.8092 14.3438 22.1877 15.0154 20.9922 16.2109C19.7966 17.4065 19.125 19.028 19.125 20.7188C19.125 22.4095 19.7966 24.031 20.9922 25.2266C22.1877 26.4221 23.8092 27.0938 25.5 27.0938V27.0938Z"
                    stroke="#2C742F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M41.4375 20.7188C41.4375 35.0625 25.5 46.2188 25.5 46.2188C25.5 46.2188 9.5625 35.0625 9.5625 20.7188C9.5625 16.4919 11.2416 12.4381 14.2305 9.44924C17.2193 6.46037 21.2731 4.78125 25.5 4.78125C29.7269 4.78125 33.7807 6.46037 36.7695 9.44924C39.7584 12.4381 41.4375 16.4919 41.4375 20.7188V20.7188Z"
                    stroke="#2C742F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-gray-800 text-center text-base leading-[170%]">
                  2715 Ash Dr. San Jose, South Dakota 83475
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100"></div>

              {/* Email */}
              <div className="flex flex-col items-center gap-4 py-6">
                <svg
                  className="w-[51px] h-[51px]"
                  width="51"
                  height="51"
                  viewBox="0 0 51 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_362_33708)">
                    <path
                      d="M48.45 5.9502H2.55C1.14172 5.9502 0 7.09182 0 8.5002V42.5002C0 43.9084 1.14162 45.0502 2.55 45.0502H48.45C49.8583 45.0502 51 43.9085 51 42.5002V8.5002C51 7.09192 49.8584 5.9502 48.45 5.9502ZM49.3 42.5003C49.3 42.9697 48.9195 43.3502 48.45 43.3502H2.55C2.08054 43.3502 1.70003 42.9697 1.70003 42.5003V8.5002C1.70003 8.03074 2.08054 7.65023 2.55 7.65023H48.45C48.9195 7.65023 49.3 8.03074 49.3 8.5002V42.5003Z"
                      fill="#2C742F"
                    />
                    <path
                      d="M46.824 9.35387C46.5994 9.33424 46.3762 9.40467 46.2036 9.5497L26.594 26.0226C25.9616 26.5542 25.0385 26.5542 24.4061 26.0226L4.79666 9.5496C4.56407 9.35437 4.24492 9.29799 3.95954 9.40178C3.67416 9.50557 3.46578 9.7538 3.41299 10.0529C3.36019 10.3521 3.47096 10.6566 3.70355 10.8518L23.313 27.3239C24.5769 28.388 26.4233 28.388 27.6872 27.3239L47.2966 10.8519C47.4693 10.707 47.5773 10.4994 47.5969 10.2748C47.6165 10.0501 47.5461 9.82691 47.4011 9.65429C47.2563 9.48147 47.0487 9.37349 46.824 9.35387Z"
                      fill="#2C742F"
                    />
                    <path
                      d="M16.3483 27.206C16.0474 27.1388 15.7338 27.2398 15.5286 27.4699L3.62856 40.2199C3.41321 40.4405 3.33412 40.7604 3.42197 41.0559C3.50983 41.3514 3.75079 41.5761 4.05161 41.6433C4.35253 41.7104 4.6661 41.6094 4.87129 41.3793L16.7713 28.6293C16.9867 28.4088 17.0658 28.0888 16.9779 27.7934C16.8901 27.4979 16.6492 27.2731 16.3483 27.206Z"
                      fill="#2C742F"
                    />
                    <path
                      d="M35.4714 27.4699C35.2663 27.2398 34.9526 27.1388 34.6517 27.206C34.3508 27.2731 34.1099 27.4979 34.0221 27.7934C33.9342 28.0889 34.0133 28.4088 34.2287 28.6293L46.1287 41.3793C46.4514 41.7098 46.979 41.7221 47.3167 41.407C47.6545 41.0918 47.6788 40.5647 47.3714 40.2198L35.4714 27.4699Z"
                      fill="#2C742F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_362_33708">
                      <rect width="51" height="51" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="text-gray-800 text-center text-base leading-[170%] whitespace-pre-line">
                  Proxy@gmail.com{"\n"}Help.proxy@gmail.com
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100"></div>

              {/* Phone */}
              <div className="flex flex-col items-center gap-4 py-6">
                <svg
                  className="w-[51px] h-[51px]"
                  width="51"
                  height="51"
                  viewBox="0 0 51 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.4827 7.24219C34.4247 8.03345 37.1071 9.58385 39.2614 11.7381C41.4156 13.8923 42.966 16.5748 43.7573 19.5168"
                    stroke="#2C742F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M29.6866 13.9502C31.4515 14.425 33.0606 15.3551 34.3529 16.6474C35.6451 17.9396 36.5752 19.5488 37.05 21.3136"
                    stroke="#2C742F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.9625 25.6416C18.7621 29.322 21.7449 32.292 25.433 34.0757C25.7031 34.2036 26.0018 34.2589 26.2998 34.2361C26.5977 34.2133 26.8846 34.1131 27.132 33.9456L32.5639 30.3255C32.8038 30.1653 33.0799 30.0674 33.3671 30.0408C33.6544 30.0141 33.9437 30.0595 34.209 30.1728L44.3699 34.5287C44.715 34.6753 45.0032 34.9301 45.191 35.2546C45.3788 35.5792 45.4561 35.956 45.4112 36.3283C45.0895 38.8411 43.8631 41.1506 41.9616 42.8244C40.06 44.4983 37.6135 45.4217 35.0802 45.4219C27.2558 45.4219 19.7518 42.3136 14.2191 36.7809C8.68637 31.2482 5.57813 23.7442 5.57812 15.9198C5.57836 13.3866 6.50185 10.9404 8.17571 9.03914C9.84957 7.13784 12.159 5.91181 14.6717 5.59057C15.044 5.54568 15.4208 5.62294 15.7454 5.81074C16.0699 5.99853 16.3247 6.28669 16.4713 6.63182L20.8307 16.8014C20.9428 17.0641 20.9883 17.3505 20.9632 17.6351C20.9381 17.9196 20.8431 18.1936 20.6867 18.4327L17.077 23.9478C16.9132 24.1962 16.8165 24.4828 16.7964 24.7796C16.7764 25.0765 16.8336 25.3734 16.9625 25.6416V25.6416Z"
                    stroke="#2C742F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-gray-800 text-center text-base leading-[170%] whitespace-pre-line">
                  (219) 555-0114{"\n"}(164) 333-0487
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-[0_0_56px_0_rgba(0,38,3,0.08)] p-8 lg:p-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Chỉ Cần Chào Hỏi!
              </h2>
              <p className="text-gray-500 text-sm leading-[150%] mb-8 max-w-[486px]">
                Bạn có muốn chào hỏi tôi hay bạn muốn bắt đầu dự án của mình và
                cần sự giúp đỡ của tôi? Hãy thoải mái liên hệ với tôi.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Mẫu Cookie"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-[49px] px-4 rounded-md border border-gray-100 bg-white text-base text-gray-600 placeholder:text-gray-600 focus:outline-none focus:border-brand-success focus:ring-1 focus:ring-brand-success"
                  />
                  <input
                    type="email"
                    placeholder="zakirsoft@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-[49px] px-4 rounded-md border border-gray-100 bg-white text-base text-gray-600 placeholder:text-gray-600 focus:outline-none focus:border-brand-success focus:ring-1 focus:ring-brand-success"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Xin chào"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full h-[49px] px-4 rounded-md border border-brand-success bg-white text-base text-gray-900 placeholder:text-gray-900 focus:outline-none focus:border-brand-success focus:ring-1 focus:ring-brand-success"
                />

                <textarea
                  placeholder="Chủ đề"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-md border border-gray-100 bg-white text-base text-gray-400 placeholder:text-gray-400 focus:outline-none focus:border-brand-success focus:ring-1 focus:ring-brand-success resize-none"
                />

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-4 h-[51px] px-10 rounded-[43px] bg-brand-success text-white text-base font-semibold hover:bg-brand-success/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-success focus:ring-offset-2"
                >
                  Gửi Tin Nhắn
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px] bg-gray-100">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/3d2ec670843542274f0f0e9999baf4bea6b4b6b8?width=2880"
          alt="Bản đồ vị trí"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
