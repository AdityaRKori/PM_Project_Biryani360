import React, { useState } from 'react';
import { Phone, ArrowRight, Loader2, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  onComplete: () => void;
}

type AuthMethod = 'PHONE' | 'EMAIL';

export const Auth: React.FC<Props> = ({ onComplete }) => {
  const [method, setMethod] = useState<AuthMethod>('PHONE');
  const [step, setStep] = useState<'INPUT' | 'OTP'>('INPUT');
  
  // Form State
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (method === 'PHONE' && phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (method === 'EMAIL' && !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    // Simulate Network Request
    setTimeout(() => {
      setLoading(false);
      // Randomly simulate network error (10% chance) for realism
      if (Math.random() > 0.9) {
          setError('Network error. Please try again.');
          return;
      }
      setStep('OTP');
      setSuccessMsg(`OTP sent to ${method === 'PHONE' ? '+91 ' + phone : email}`);
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const code = otp.join('');
    
    if (code.length !== 4) return;

    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        if (code === '123456' || code === '1234') { // Allow simple codes for prototype
            onComplete();
        } else {
            setError('Invalid OTP. Try 1234.');
            setOtp(['','','','']);
        }
    }, 1500);
  };

  const handleGoogleLogin = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          onComplete();
      }, 2000);
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col md:flex-row text-cream-50">
      {/* Left Panel - Visuals */}
      <div className="hidden md:block w-1/2 bg-saffron-900 relative overflow-hidden border-r border-white/5">
         <img 
            src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1000&auto=format&fit=crop" 
            alt="Biryani Texture" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-saffron-900/60 to-transparent"></div>
         <div className="absolute bottom-12 left-12 right-12 text-white">
            <Logo size="lg" variant="light" className="mb-6" />
            <h2 className="text-4xl font-serif font-bold leading-tight mb-4 text-cream-50">
                Unlock the secret world of Dum.
            </h2>
            <p className="text-saffron-200 text-lg">
                Join 50,000+ connoisseurs discovering authentic kitchens nearby.
            </p>
         </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center p-6 md:p-12 relative bg-charcoal-950">
         <div className="max-w-md mx-auto w-full space-y-8">
            
            {/* Mobile Header */}
            <div className="md:hidden text-center mb-8">
                <Logo size="xl" variant="light" className="mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            </div>

            {/* Google Sign In */}
            {step === 'INPUT' && (
                <button 
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-3.5 border border-white/10 rounded-xl flex items-center justify-center gap-3 font-semibold text-gray-300 hover:bg-white/5 transition-colors shadow-sm active:scale-95 bg-charcoal-900"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    Continue with Google
                </button>
            )}

            {step === 'INPUT' && (
                <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                    <span className="relative bg-charcoal-950 px-4 text-sm text-gray-500">or continue with</span>
                </div>
            )}

            {/* Error / Success Messages */}
            {error && (
                <div className="bg-red-900/20 text-red-400 border border-red-500/30 p-3 rounded-lg text-sm flex items-center gap-2 animate-fade-in">
                    <AlertCircle className="w-4 h-4" /> {error}
                </div>
            )}
            {successMsg && !error && (
                <div className="bg-green-900/20 text-green-400 border border-green-500/30 p-3 rounded-lg text-sm flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4" /> {successMsg}
                </div>
            )}

            <form onSubmit={step === 'INPUT' ? handleSendOtp : handleVerifyOtp} className="space-y-6">
                
                {step === 'INPUT' && (
                    <>
                        {/* Method Tabs */}
                        <div className="flex bg-charcoal-900 p-1 rounded-xl border border-white/5">
                            <button
                                type="button" 
                                onClick={() => { setMethod('PHONE'); setError(''); }}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${method === 'PHONE' ? 'bg-charcoal-800 shadow text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Phone
                            </button>
                            <button 
                                type="button"
                                onClick={() => { setMethod('EMAIL'); setError(''); }}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${method === 'EMAIL' ? 'bg-charcoal-800 shadow text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                Email
                            </button>
                        </div>

                        {method === 'PHONE' ? (
                            <div className="space-y-4">
                                <div className="relative group pt-4">
                                    <input 
                                        type="tel" 
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        className="input-premium peer pt-6 pb-2 pl-12"
                                        placeholder=" "
                                        autoFocus
                                    />
                                    <span className="absolute top-[26px] left-4 text-white/50 text-lg font-medium select-none pointer-events-none">+91</span>
                                    <label 
                                        htmlFor="phone"
                                        className="absolute left-4 top-4 text-xs font-bold text-saffron-500 transition-all duration-200 
                                                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white/70 peer-placeholder-shown:text-base peer-placeholder-shown:left-12
                                                   peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-saffron-500 peer-focus:text-xs peer-focus:left-4
                                                   pointer-events-none"
                                    >
                                        Mobile Number
                                    </label>
                                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="relative group pt-4">
                                    <input 
                                        type="email" 
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-premium peer pt-6 pb-2"
                                        placeholder=" "
                                        autoFocus
                                    />
                                    <label 
                                        htmlFor="email"
                                        className="absolute left-4 top-4 text-xs font-bold text-saffron-500 transition-all duration-200 
                                                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white/70 peer-placeholder-shown:text-base 
                                                   peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-saffron-500 peer-focus:text-xs
                                                   pointer-events-none"
                                    >
                                        Email Address
                                    </label>
                                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                                </div>
                            </div>
                        )}
                    </>
                )}

                {step === 'OTP' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-6">Enter the 4-digit code sent to you</p>
                            <div className="flex justify-center gap-4">
                                {otp.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        id={`otp-${idx}`}
                                        type="tel"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '');
                                            const newOtp = [...otp];
                                            newOtp[idx] = val;
                                            setOtp(newOtp);
                                            if (val && idx < 3) document.getElementById(`otp-${idx + 1}`)?.focus();
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
                                                document.getElementById(`otp-${idx - 1}`)?.focus();
                                            }
                                        }}
                                        className="input-premium w-[44px] h-[44px] text-center p-0 text-xl font-bold"
                                        autoFocus={idx === 0}
                                    />
                                ))}
                            </div>
                        </div>
                        <button 
                            type="button" 
                            onClick={() => { setStep('INPUT'); setOtp(['','','','']); setError(''); }}
                            className="w-full text-sm text-saffron-500 font-bold hover:text-saffron-400 transition-colors"
                        >
                            Change {method === 'PHONE' ? 'Number' : 'Email'}
                        </button>
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-saffron-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-saffron-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed btn-gold border-none"
                >
                    {loading ? <Loader2 className="animate-spin" /> : (
                        step === 'INPUT' ? <>Get OTP <ArrowRight className="w-5 h-5" /></> : 'Verify & Continue'
                    )}
                </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-8">
                By continuing, you agree to our Terms of Service & Privacy Policy.
            </p>
         </div>
      </div>
    </div>
  );
};