"use client"

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-teal-200 rounded-full opacity-20 animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-emerald-300 rounded-full opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-20 right-40 w-24 h-24 bg-teal-100 rounded-full opacity-20 animate-bounce"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-10 blur-xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full opacity-10 blur-xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  )
}
