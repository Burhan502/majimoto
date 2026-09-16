import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label && <span className="mb-2 block">{label}</span>}
      <input
        className={`w-full rounded-xl border px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
          error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
        } ${className}`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}
