import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, AlertCircle, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-[#07050C] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans selection:bg-[#EAB308] selection:text-black">
      {/* #16 Surreal Cosmic Depth & Ambient Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Imperial Violet Celestial Nebula */}
        <div className="absolute -top-[15%] left-[20%] w-[750px] h-[550px] rounded-full bg-[#410682]/25 blur-[140px]" />
        {/* Solar Gold Ambient Glow */}
        <div className="absolute -bottom-[20%] right-[15%] w-[650px] h-[500px] rounded-full bg-[#EAB308]/10 blur-[150px]" />

        {/* Sacred Geometry Mandala - Majestic Slow Celestial Rotation */}
        <motion.img 
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          src="/patterns/pattern-2.svg" 
          alt="Mayavi Sacred Geometry"
          className="absolute -top-32 -right-32 w-[650px] h-[650px] opacity-[0.06] invert pointer-events-none select-none drop-shadow-[0_0_50px_rgba(234,179,8,0.25)]"
        />

        {/* Harmonic Counter-Rotating Lattice */}
        <motion.img 
          animate={{ rotate: -360 }}
          transition={{ duration: 220, repeat: Infinity, ease: "linear" }}
          src="/patterns/pattern-5.svg" 
          alt="Mayavi Sacred Lattice"
          className="absolute -bottom-44 -left-44 w-[600px] h-[600px] opacity-[0.045] invert pointer-events-none select-none drop-shadow-[0_0_50px_rgba(65,6,130,0.35)]"
        />

        {/* Center Optical Crosshair Reticle */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
          <div className="w-52 h-52 border border-white/10 rounded-full flex items-center justify-center">
            <div className="w-12 h-[1px] bg-amber-400/50" />
            <div className="h-12 w-[1px] bg-amber-400/50 absolute" />
            <div className="w-2.5 h-2.5 rounded-full border border-amber-400/70" />
          </div>
        </div>
      </div>

      {/* #3 Futuristic HUD: Optical Viewfinder Corner Framing Lines */}
      <div className="fixed top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-amber-400/60 pointer-events-none z-50" />
      <div className="fixed top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-amber-400/60 pointer-events-none z-50" />
      <div className="fixed bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-amber-400/60 pointer-events-none z-50" />
      <div className="fixed bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-amber-400/60 pointer-events-none z-50" />

      {/* Top Bar Navigation */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-20">
        <button
          onClick={onExit}
          className="flex items-center space-x-2 text-white/60 hover:text-amber-400 transition-colors text-xs font-mono tracking-widest uppercase py-2 cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Exit to Public Site</span>
        </button>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-amber-400/30 font-mono text-[9px] tracking-widest text-[#EAB308] shadow-[0_0_15px_rgba(234,179,8,0.15)]">
          <ShieldCheck size={12} />
          <span>MAYAVI STUDIO SECURITY PROTOCOL // MMXXVI</span>
        </div>
      </div>

      {/* #22 Liquid Glass Login Card */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-3xl bg-gradient-to-br from-white/[0.06] via-[#0D091B]/85 to-[#07050C]/95 border border-amber-400/30 rounded-3xl p-8 md:p-10 shadow-[0_0_60px_rgba(65,6,130,0.35),0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden group">
        
        {/* Liquid Glass Specular Gleam Sweep */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

        {/* Filmstrip & Emblem Header */}
        <div className="text-center space-y-4 mb-8 relative z-10">
          <div className="flex justify-center">
            <img 
              src="/official-mayavi-logo.png" 
              alt="Mayavi Media Creations" 
              className="h-16 w-auto object-contain drop-shadow-[0_0_25px_rgba(234,179,8,0.5)] hover:scale-105 transition-transform" 
            />
          </div>
          <div>
            <div className="flex items-center justify-center space-x-2">
              <span className="font-mono text-[9px] tracking-[0.35em] text-[#EAB308] uppercase font-bold">EXECUTIVE VAULT ACCESS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#EAB308]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light italic text-white mt-1.5 tracking-tight">
              Mayavi Master Deck
            </h1>
            <p className="text-white/50 text-xs font-mono tracking-wider mt-1.5">
              Secure Director Console // Media Link & Cloud Manager
            </p>
          </div>
        </div>

        {/* Lockout Warning */}
        {lockoutTime > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center space-x-3 text-red-300 text-xs backdrop-blur-md">
            <AlertCircle size={18} className="shrink-0 text-red-400" />
            <div>
              <p className="font-bold">Security Lockout Active</p>
              <p className="text-[11px] text-red-300/80">Please wait {lockoutTime} seconds before attempting access.</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2 text-left">
            <label className="block text-[10px] font-mono tracking-[0.25em] text-white/70 uppercase">
              Master Access Passcode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
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
                className="w-full pl-10 pr-12 py-3.5 bg-white/[0.04] backdrop-blur-md border border-white/15 focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] rounded-xl text-white text-sm placeholder-white/25 outline-none transition-all font-mono shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/50 hover:text-white transition-colors cursor-pointer"
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
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#EAB308] via-amber-400 to-[#EAB308] hover:from-amber-300 hover:to-yellow-300 text-black font-mono font-bold text-xs tracking-[0.22em] uppercase transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.35)] hover:shadow-[0_0_40px_rgba(234,179,8,0.55)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>VERIFYING CREDENTIALS...</span>
              </>
            ) : (
              <>
                <Lock size={14} />
                <span>UNLOCK DIRECTOR DECK</span>
              </>
            )}
          </button>
        </form>

        {/* Security Note & Default Passcode Helper for Client Demo */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[#EAB308] font-mono text-[9px] tracking-wider">
            <span>DEFAULT KEY:</span>
            <code className="bg-black/60 px-2 py-0.5 rounded text-white font-bold select-all">mayavi2026</code>
          </div>
          <p className="text-[10.5px] text-white/40 font-sans">
            Configurable anytime inside the Cloud DB & Security tab.
          </p>
        </div>

      </div>

      {/* Footer System Telemetry */}
      <div className="absolute bottom-6 font-mono text-[8.5px] text-white/30 tracking-[0.3em] uppercase flex items-center gap-3">
        <span>MAYAVI CORE ENGINE // VERSION 2.6.4</span>
        <span className="text-white/20">|</span>
        <span className="text-amber-400/60">ARRI ALEXA LF // 24 FPS</span>
      </div>
    </div>
  );
}
