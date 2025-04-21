"use client"

import { useState, useEffect } from "react"

function EmailForgotPassword({ onClose }) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      setMessage("Please enter your email address")
      return
    }
    setIsSubmitting(true)
    setMessage("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setMessage("Password reset link has been sent to your email")
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative w-[755px] h-[509px] bg-[#215273] border border-black shadow-lg"
        onClick={handleModalClick}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute w-6 h-6 top-[8px] left-[721px] z-10"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Heading */}
        <h2 className="absolute text-[39px] font-bold text-white top-[54px] left-[0px] w-[445px] text-center leading-[47px]">
          Reset Password
        </h2>

        {/* Description */}
        <p className="absolute w-[458px] h-[19px] text-[16px] text-white text-center top-[115px] left-[72px]">
          Kita akan memeberikan link ke E-mail untuk resset password
        </p>

        {/* Label */}
        <label
          htmlFor="email"
          className="absolute text-white text-[16px] top-[193px] left-[172px] w-[115px] text-center"
        >
          E-mail Address
        </label>

        {/* Input Field */}
        <form onSubmit={handleSubmit}>
          <div className="absolute w-[352px] h-[52px] top-[217.46px] left-[202.5px]">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukan Email"
              className="w-full h-full px-4 text-[20px] text-black bg-white"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="absolute w-[352px] h-[52px] top-[294px] left-[203px] bg-[#ECE2D0] rounded-md text-[20px] text-black shadow-md hover:bg-[#e5d9c2] transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div className="absolute top-[370px] left-[202.5px] w-[352px] text-white text-center p-3 rounded bg-white/10 animate-fadeIn">
            {message}
          </div>
        )}

        {/* Background decorations */}
        <div className="absolute w-[350px] h-[350px] left-[-91px] top-[260px] rounded-full bg-gradient-to-br from-[#215273] to-[#607B81] opacity-50" />
        <div className="absolute w-[350px] h-[350px] left-[47px] top-[358px] rounded-full bg-gradient-to-br from-[#ACDCE7] to-[#607B81] opacity-50" />
      </div>
    </div>
  )
}

export default EmailForgotPassword
