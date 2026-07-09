import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheck, FiUser, FiMail, FiMessageSquare, FiBriefcase, FiAlertCircle } from 'react-icons/fi'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'

// ─────────────────────────────────────────────────────────────────────────────
//  Web3Forms — free form-to-email service. No backend needed.
//  Submissions POST to their API and land directly in harshsorathiya01@gmail.com.
//
//  HOW TO GET YOUR ACCESS KEY (takes 60 seconds, free forever):
//  1. Go to https://web3forms.com
//  2. Click "Create Access Key"
//  3. Enter harshsorathiya01@gmail.com
//  4. Check your inbox → copy the key
//  5. Replace VITE_WEB3FORMS_KEY in your .env file:
//     VITE_WEB3FORMS_KEY=your-key-here
//
//  The key is safe to commit — it's a public identifier, not a secret.
// ─────────────────────────────────────────────────────────────────────────────
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_KEY_HERE'
const WEB3_ENDPOINT = 'https://api.web3forms.com/submit'

const TOPICS = [
  'Freelance project',
  'Full-time role',
  'Internship / collaboration',
  'Just saying hello',
]

function Field({ label, icon, error, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
        <span className="text-[var(--color-accent)]">{icon}</span>
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
          >
            <FiAlertCircle size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputClass = cn(
  'w-full bg-[rgba(255,255,255,0.05)] border border-[var(--color-border)]',
  'rounded-xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)]',
  'backdrop-blur-sm outline-none transition-all duration-200',
  'focus:border-[var(--color-accent)] focus:bg-[rgba(255,255,255,0.07)]',
  'focus:shadow-[0_0_0_3px_rgba(110,114,255,0.12)]',
)

export default function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', topic: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }))

  function validate() {
    const e = {}
    if (!fields.name.trim())    e.name = 'Name is required'
    if (!fields.email.trim())   e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = 'Enter a valid email'
    if (!fields.message.trim()) e.message = 'Message is required'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')

    try {
      const subject = fields.topic
        ? `[Portfolio] ${fields.topic} — from ${fields.name}`
        : `[Portfolio] Message from ${fields.name}`

      const res = await fetch(WEB3_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject,
          from_name: fields.name,
          email: fields.email,
          topic: fields.topic || 'Not specified',
          message: fields.message,
          // Botcheck honeypot — leave empty to pass spam filter
          botcheck: '',
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('sent')
        setFields({ name: '', email: '', topic: '', message: '' })
      } else {
        // Web3Forms returns specific error messages — surface them directly
        setErrorMsg(data.message || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch (err) {
      setErrorMsg('Network error — check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <div
      className="relative rounded-3xl border overflow-hidden"
      style={{
        background: 'linear-gradient(155deg, rgba(255,255,255,0.065), rgba(255,255,255,0.02))',
        borderColor: 'var(--color-border)',
        backdropFilter: 'blur(24px)',
      }}
    >
      {/* Top shine */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="p-7 md:p-9">
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">Send a message</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-7">
          Fill this out — your message goes straight to my inbox. I reply within 24 hours.
        </p>

        <AnimatePresence mode="wait">

          {/* ── SUCCESS STATE ── */}
          {status === 'sent' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-14 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-[var(--color-accent-3)]/15 border border-[var(--color-accent-3)]/30 flex items-center justify-center mb-5"
              >
                <FiCheck size={28} className="text-[var(--color-accent-3)]" />
              </motion.div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Message delivered!</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-xs leading-relaxed">
                Your message landed in my inbox. I'll reply to{' '}
                <span className="text-[var(--color-accent)] font-medium">{fields.email || 'your email'}</span>{' '}
                within 24 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors underline underline-offset-2"
                data-cursor="hover"
              >
                Send another message
              </button>
            </motion.div>
          )}

          {/* ── ERROR STATE ── */}
          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-14 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-5">
                <FiAlertCircle size={28} className="text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Delivery failed</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-2 max-w-xs">{errorMsg}</p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-xs">
                Or email me directly at{' '}
                <a
                  href="mailto:harshsorathiya01@gmail.com"
                  className="text-[var(--color-accent)] hover:underline"
                >
                  harshsorathiya01@gmail.com
                </a>
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors underline underline-offset-2"
                data-cursor="hover"
              >
                Try again
              </button>
            </motion.div>
          )}

          {/* ── FORM ── */}
          {(status === 'idle' || status === 'sending') && (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Honeypot — must stay hidden, Web3Forms uses it for spam filtering */}
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} defaultChecked={false} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Your name" icon={<FiUser size={11} />} error={errors.name}>
                  <input
                    name="name"
                    className={cn(inputClass, errors.name && 'border-red-500/50')}
                    placeholder="Ravi Mehta"
                    value={fields.name}
                    onChange={set('name')}
                  />
                </Field>
                <Field label="Your email" icon={<FiMail size={11} />} error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    className={cn(inputClass, errors.email && 'border-red-500/50')}
                    placeholder="ravi@company.com"
                    value={fields.email}
                    onChange={set('email')}
                  />
                </Field>
              </div>

              <Field label="Topic" icon={<FiBriefcase size={11} />}>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      data-cursor="hover"
                      onClick={() => setFields((f) => ({ ...f, topic: f.topic === t ? '' : t }))}
                      className={cn(
                        'px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200',
                        fields.topic === t
                          ? 'bg-[var(--color-accent)]/20 border-[var(--color-accent)]/50 text-[var(--color-accent)]'
                          : 'bg-[rgba(255,255,255,0.04)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-hover)]',
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Message" icon={<FiMessageSquare size={11} />} error={errors.message}>
                <textarea
                  name="message"
                  rows={5}
                  className={cn(inputClass, 'resize-none', errors.message && 'border-red-500/50')}
                  placeholder="Tell me about your project, role, or just say hello..."
                  value={fields.message}
                  onChange={set('message')}
                />
              </Field>

              <Button
                type="submit"
                size="lg"
                variant="primary"
                magnetic={false}
                className="w-full justify-center"
                disabled={status === 'sending'}
                icon={status === 'sending'
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <FiSend size={15} />
                }
                iconPosition="right"
              >
                <span>{status === 'sending' ? 'Sending...' : 'Send message'}</span>
              </Button>

              <p className="text-xs text-[var(--color-text-faint)] text-center">
                Message goes directly to my inbox. No email client opens.
              </p>
            </motion.form>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
