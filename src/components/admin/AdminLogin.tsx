import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import { verifyAdminPassword } from '../../lib/cmsStore';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onExit: () => void;
}

export default function AdminLogin({ onLoginSuccess, onExit }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime((prev) => {
          if (prev <= 1) {
            setAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime > 0) return;

    if (!password.trim()) {
      setError('Please enter the administrative master passcode.');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const isValid = verifyAdminPassword(password);
      if (isValid) {
        sessionStorage.setItem('mayavi_admin_session_auth', 'true');
        onLoginSuccess();
      } else {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        if (nextAttempts >= 5) {
          setLockoutTime(60);
          setError('Too many failed attempts. Security cooldown active for 60 seconds.');
        } else {
          setError(`Incorrect passcode. ${5 - nextAttempts} attempts remaining.`);
        }
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#06040A] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans selection:bg-[#EAB308] selection:text-black">
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Background Graticule Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Top Bar Navigation */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-20">
        <button
          onClick={onExit}
          className="flex items-center space-x-2 text-white/50 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase py-2 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Exit to Public Site</span>
        </button>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] tracking-widest text-[#EAB308]">
          <ShieldCheck size={12} />
          <span>MAYAVI STUDIO SECURITY PROTOCOL</span>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-neutral-950/80 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        
        {/* Filmstrip & Emblem Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#EAB308]/10 border border-[#EAB308]/30 flex items-center justify-center text-[#EAB308] shadow-[0_0_30px_rgba(234,179,8,0.15)]">
            <Lock size={28} />
          </div>
          <div>
            <div className="flex items-center justify-center space-x-2">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#EAB308] uppercase font-bold">SINGLE-USER PORTAL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-light font-serif italic text-white mt-1">
              Mayavi Executive Studio
            </h1>
            <p className="text-white/40 text-xs font-mono tracking-wider mt-1.5">
              Secure Dashboard // Content & Media Link Manager
            </p>
          </div>
        </div>

        {/* Lockout Warning */}
        {lockoutTime > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center space-x-3 text-red-300 text-xs">
            <AlertCircle size={18} className="shrink-0 text-red-400" />
            <div>
              <p className="font-bold">Security Lockout Active</p>
              <p className="text-[11px] text-red-300/80">Please wait {lockoutTime} seconds before attempting access.</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="block text-[10px] font-mono tracking-[0.2em] text-white/60 uppercase">
              Master Access Passcode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
                <KeyRound size={16} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                disabled={lockoutTime > 0 || isLoading}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter admin passcode..."
                className="w-full pl-10 pr-12 py-3.5 bg-neutral-900/80 border border-white/10 focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] rounded-xl text-white text-sm placeholder-white/20 outline-none transition-all font-mono"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-400 font-mono tracking-wide mt-1.5 flex items-center space-x-1.5">
                <span>•</span>
                <span>{error}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={lockoutTime > 0 || isLoading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#EAB308] to-amber-500 hover:from-amber-400 hover:to-yellow-400 text-black font-mono font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:shadow-[0_0_35px_rgba(234,179,8,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>VERIFYING CREDENTIALS...</span>
              </>
            ) : (
              <>
                <Lock size={14} />
                <span>UNLOCK ADMIN DASHBOARD</span>
              </>
            )}
          </button>
        </form>

        {/* Security Note & Default Passcode Helper for Client Demo */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/5 border border-amber-400/20 text-[#EAB308] font-mono text-[9px] tracking-wider">
            <span>DEFAULT KEY:</span>
            <code className="bg-black/50 px-1.5 py-0.5 rounded text-white font-bold select-all">mayavi2026</code>
          </div>
          <p className="text-[10px] text-white/30 font-sans">
            Can be changed anytime inside the Security & Settings tab.
          </p>
        </div>

      </div>

      {/* Footer System Telemetry */}
      <div className="absolute bottom-6 font-mono text-[8px] text-white/20 tracking-[0.3em] uppercase">
        MAYAVI CORE ENGINE // VERSION 2.6.4 // ARRI COLOR SCIENCE V4
      </div>
    </div>
  );
}
