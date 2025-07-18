"use client";

export function FooterMobile() {
  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full bg-gray-200 backdrop-blur-md md:hidden">
      {/* Brand Strip */}
      <div className="bg-gray-900 p-4 text-white">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            © 2025 DCB - Distribuidora Cirúrgica Brasileira
          </p>
          <div className="flex items-center space-x-1.5">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-400">Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
