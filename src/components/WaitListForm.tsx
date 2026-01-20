import type React from "react"

import { useState } from "react"
import { Mail, MessageCircle } from "lucide-react" 
import { addToWaitlist } from "../firebase"

export default function WaitlistForm() {
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage("")

    if (!email || !phone) {
      setMessage("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const result = await addToWaitlist(email, phone);

      if (!result.success) {
        throw new Error("Failed to submit form")
      }

      setSubmitted(true)
      setEmail("")
      setPhone("")
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setMessage("Something went wrong. Please try again.")
      console.error("[v0] Form submission error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-lg">  
      {/* Header Section */}
      <div className="text-center mb-12 space-y-4">
        <h1
          className="text-4xl sm:text-6xl font-bold tracking-tight text-balance text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Waitlist
        </h1> 
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">{message}</div>
        )}

        {/* Email Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <Mail className="w-5 h-5" />
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            className="w-full bg-card border border-border rounded-lg pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>

        {/* Phone Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <MessageCircle className="w-5 h-5" />
          </div>
          <input
            type="tel"
            placeholder="WhatsApp phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            required
            className="w-full bg-card border border-border rounded-lg pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitted ? "✓ Joined Waitlist" : loading ? "Joining..." : "Join Waitlist"}
        </button>
      </form>

      {/* Footer Note */}
      <p className="text-center text-xs text-muted-foreground mt-6">We'll never spam you. Unsubscribe anytime.</p>
    </div>
  )
}
