'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [feedback, setFeedback] = useState('')
  const handleNext = ()=>{
    router.push("/hospital-steps-track")
  }
  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center text-[#1D4045]">
        Anything else we should know?
      </h1>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full h-64 p-4 border-2 border-gray-200 rounded focus:border-[#1D4045] outline-none resize-none"
        placeholder="Tell us more..."
      />

      <button 
            onClick={handleNext}

        className="w-full p-4 bg-[#1D4045] text-white hover:opacity-90 transition-opacity"
      >
        NEXT
      </button>
    </div>
  )
}