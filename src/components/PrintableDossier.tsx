import React from 'react';
import { Check, Shield, Award, Camera, Film, Sparkles } from 'lucide-react';

export interface PrintableArchetype {
  title: string;
  badge: string;
  quote: string;
  track: string;
  rationale: string;
  strengths: string[];
  blindspot: string;
  lensProfile: string;
  castingRoles: string[];
}

export interface PrintableSceneOption {
  letter: string;
  title: string;
  desc: string;
  directorCritique: string;
  actingMethod: string;
}

export interface PrintableScene {
  actNum: number;
  actName: string;
  actHeader: string;
  eyebrow: string;
  headlinePrefix: string;
  headlineHighlight: string;
  scriptQuote: string;
  directorInsight: string;
  tags: string[];
  options: PrintableSceneOption[];
}

interface PrintableDossierProps {
  archetype: PrintableArchetype;
  dossierId: string;
  formattedDate: string;
  scorePercentages: {
    emotion: number;
    camera: number;
    improv: number;
    imag: number;
  };
  userChoices: number[];
  scenes: PrintableScene[];
}

export default function PrintableDossier({
  archetype,
  dossierId,
  formattedDate,
  scorePercentages,
  userChoices,
  scenes,
}: PrintableDossierProps) {
  return (
    <div id="printable-dossier" className="printable-dossier hidden print:block text-slate-900 bg-white font-sans antialiased w-full max-w-[210mm] mx-auto">
      {/* =================================================================== */}
      {/* PAGE 1: OFFICIAL EXECUTIVE AUDITION DOSSIER & CERTIFICATION         */}
      {/* =================================================================== */}
      <div className="print-page-1 min-h-[270mm] max-h-[285mm] p-6 sm:p-8 bg-white border-2 border-amber-600/50 rounded-xl relative flex flex-col justify-between print-avoid-break box-border">
        {/* Decorative Optical Framing Brackets in Corners */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-600/60 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-600/60 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-600/60 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-600/60 pointer-events-none" />

        {/* TOP HEADER */}
        <div>
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500 border border-amber-600 flex items-center justify-center font-display font-black text-black text-lg shadow-sm">
                M
              </div>
              <div className="leading-tight text-left">
                <div className="font-display font-bold text-sm tracking-[0.16em] text-slate-950 uppercase">
                  MAYAVI MEDIA CREATIONS
                </div>
                <div className="font-mono text-[8px] tracking-[0.2em] text-slate-500 uppercase mt-0.5">
                  DIRECTORATE OF TALENT & CINEMA CASTING
                </div>
                <div className="font-mono text-[7px] tracking-widest text-amber-800 font-bold uppercase">
                  VERTICAL CINEMA ACCREDITATION BOARD // SCREEN TEST DIVISION
                </div>
              </div>
            </div>

            <div className="text-right leading-tight font-mono text-[8px] space-y-1">
              <div>
                <span className="text-slate-400 uppercase">DOSSIER REF: </span>
                <strong className="text-slate-900 font-bold">{dossierId}</strong>
              </div>
              <div>
                <span className="text-slate-400 uppercase">EVALUATION DATE: </span>
                <span className="text-slate-800 font-medium">{formattedDate}</span>
              </div>
              <div>
                <span className="inline-block px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 font-bold text-[7.5px] uppercase">
                  CLASS A // INDUSTRY CERTIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Double Gold Line Divider */}
          <div className="w-full h-[2px] bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 mb-3" />

          {/* ARCHETYPE PROFILE HERO */}
          <div className="space-y-1.5 text-left mb-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] tracking-[0.25em] text-amber-800 uppercase font-bold">
                // OFFICIAL SCREEN ACTING ARCHETYPE IDENTIFIER
              </span>
              <span className="font-mono text-[8px] text-slate-500 uppercase font-semibold">
                {archetype.badge}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-950 tracking-tight leading-none">
                {archetype.title}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 font-mono text-[8px] font-bold uppercase">
                DIRECTORATE VERIFIED ✓
              </span>
            </div>

            <p className="font-serif italic text-sm text-amber-900/90 leading-snug pt-0.5">
              "{archetype.quote.replace(/[“”"]/g, '')}"
            </p>
          </div>

          {/* TRAIT SCORE GAUGES (4 METRIC BOXES) */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <div className="font-mono text-[7px] tracking-wider text-slate-500 uppercase font-semibold">EMOTIONAL DEPTH</div>
              <div className="font-display font-black text-lg text-slate-950 my-0.5">{scorePercentages.emotion}%</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: `${scorePercentages.emotion}%` }} />
              </div>
            </div>

            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <div className="font-mono text-[7px] tracking-wider text-slate-500 uppercase font-semibold">CAMERA MAGNETISM</div>
              <div className="font-display font-black text-lg text-slate-950 my-0.5">{scorePercentages.camera}%</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: `${scorePercentages.camera}%` }} />
              </div>
            </div>

            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <div className="font-mono text-[7px] tracking-wider text-slate-500 uppercase font-semibold">IMPROV REFLEX</div>
              <div className="font-display font-black text-lg text-slate-950 my-0.5">{scorePercentages.improv}%</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: `${scorePercentages.improv}%` }} />
              </div>
            </div>

            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <div className="font-mono text-[7px] tracking-wider text-slate-500 uppercase font-semibold">NARRATIVE IMAGINATION</div>
              <div className="font-display font-black text-lg text-slate-950 my-0.5">{scorePercentages.imag}%</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: `${scorePercentages.imag}%` }} />
              </div>
            </div>
          </div>

          {/* DIRECTOR'S DIAGNOSTIC EVALUATION (2-COLUMN GRID) */}
          <div className="grid grid-cols-12 gap-3 mb-3 text-left">
            {/* Left Column: Why You Received This Archetype */}
            <div className="col-span-7 p-3 rounded-lg bg-slate-50/80 border border-slate-200/90 space-y-1.5">
              <div className="font-mono text-[8px] tracking-widest text-amber-800 uppercase font-bold flex items-center gap-1.5">
                <Award size={10} className="text-amber-600" />
                <span>DIRECTOR'S DIAGNOSTIC RATIONALE</span>
              </div>
              <p className="font-sans text-[9.5px] text-slate-700 leading-relaxed font-normal">
                {archetype.rationale}
              </p>
            </div>

            {/* Right Column: Strengths & Advisory */}
            <div className="col-span-5 space-y-2">
              <div className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/90 space-y-1">
                <div className="font-mono text-[7.5px] tracking-widest text-slate-600 uppercase font-bold">
                  KEY ON-SCREEN STRENGTHS:
                </div>
                <div className="space-y-0.5">
                  {archetype.strengths.slice(0, 4).map((str, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1.5 text-[8.5px] font-sans text-slate-800">
                      <Check size={9} className="text-amber-600 shrink-0 font-bold" />
                      <span className="font-medium">{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-2 rounded-lg bg-amber-500/[0.08] border border-amber-400/40 text-[8.5px] text-slate-800">
                <span className="text-amber-800 font-mono font-bold text-[7.5px] block uppercase">
                  [ DIRECTOR'S BLINDSPOT ADVISORY ]:
                </span>
                <span className="leading-tight block mt-0.5 text-slate-700">{archetype.blindspot}</span>
              </div>
            </div>
          </div>

          {/* CINEMATOGRAPHY & OPTICAL CALIBRATION */}
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-left mb-3">
            <div className="font-mono text-[8px] tracking-widest text-amber-800 uppercase font-bold mb-1.5 flex items-center gap-1.5">
              <Camera size={10} className="text-amber-600" />
              <span>TECHNICAL CINEMATOGRAPHY & OPTICAL CALIBRATION</span>
            </div>
            <div className="grid grid-cols-3 gap-2 font-mono text-[8px]">
              <div className="p-1.5 rounded bg-white border border-slate-200">
                <span className="text-slate-400 block uppercase text-[6.5px]">PRESCRIBED LENS & RIG</span>
                <strong className="text-slate-900 block font-sans font-semibold text-[8px] leading-tight mt-0.5">
                  {archetype.lensProfile}
                </strong>
              </div>
              <div className="p-1.5 rounded bg-white border border-slate-200">
                <span className="text-slate-400 block uppercase text-[6.5px]">FRAMING COMPOSITION</span>
                <strong className="text-slate-900 block font-sans font-semibold text-[8px] leading-tight mt-0.5">
                  9:16 Vertical // Controlled micro-ocular stillness
                </strong>
              </div>
              <div className="p-1.5 rounded bg-white border border-slate-200">
                <span className="text-slate-400 block uppercase text-[6.5px]">COLOR SCIENCE LUT</span>
                <strong className="text-slate-900 block font-sans font-semibold text-[8px] leading-tight mt-0.5">
                  LOG-C to REC2020 // Kodak 5207 Skin Tones
                </strong>
              </div>
            </div>
          </div>

          {/* CASTING MATCHES & RECOMMENDED COHORT */}
          <div className="grid grid-cols-12 gap-3 text-left mb-2">
            <div className="col-span-7 p-2 rounded-lg bg-slate-50 border border-slate-200">
              <div className="font-mono text-[7.5px] tracking-widest text-slate-600 uppercase font-bold mb-1 flex items-center gap-1">
                <Film size={9} className="text-amber-600" />
                <span>PRIME SCRIPT CASTING MATCHES</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {archetype.castingRoles.map((role) => (
                  <span
                    key={role}
                    className="px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-800 text-[8px] font-sans font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-5 p-2 rounded-lg bg-amber-50 border border-amber-200 text-left">
              <span className="font-mono text-[7.5px] tracking-widest text-amber-800 uppercase font-bold block mb-0.5">
                RECOMMENDED ACADEMY COHORT:
              </span>
              <strong className="font-sans font-bold text-[9px] text-slate-950 block leading-tight">
                {archetype.track}
              </strong>
            </div>
          </div>
        </div>

        {/* BOTTOM OFFICIAL DIRECTORATE SIGN-OFF & VERIFICATION STAMP */}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between font-mono text-[7.5px]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-amber-600 flex items-center justify-center text-amber-700 font-serif font-black text-xs">
                ★
              </div>
              <div className="leading-tight text-left">
                <div className="font-bold text-slate-900 uppercase">OFFICIAL MAYAVI MEDIA CREATIONS AUDITION DOSSIER</div>
                <div className="text-slate-400">CERTIFICATE HASH: MMC-2026-AUD-{dossierId.replace(/[^0-9]/g, '')}-VERIFIED</div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif italic text-slate-800 text-xs leading-none">Venkatesh & Directorial Board</div>
              <div className="text-slate-400 uppercase text-[7px] mt-0.5">EXECUTIVE CASTING DIRECTORS // MAYAVI MEDIA CREATIONS</div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* PAGE 2: COMPLETE 12-TAKE DIRECTOR'S AUDIT LOG                       */}
      {/* =================================================================== */}
      <div className="print-page-break p-6 sm:p-8 bg-white border-2 border-slate-300 rounded-xl flex flex-col justify-between mt-8 print:mt-0 print-avoid-break box-border min-h-[270mm]">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="text-left leading-tight">
              <div className="font-display font-bold text-xs tracking-widest text-slate-950 uppercase">
                MAYAVI MEDIA CREATIONS // 12-SCENE DIRECTOR'S AUDIT LOG
              </div>
              <div className="font-mono text-[7.5px] text-slate-500 uppercase mt-0.5">
                CANDIDATE ARCHETYPE: <strong className="text-amber-800">{archetype.title}</strong> // DOSSIER NO: {dossierId}
              </div>
            </div>
            <div className="font-mono text-[7.5px] text-slate-400 uppercase">
              PAGE 2 OF 2 // FULL SCREEN TEST RECORD
            </div>
          </div>

          {/* 12-Take Grid (2 Columns of 6 Takes) */}
          <div className="grid grid-cols-2 gap-2.5 pt-3 text-left">
            {scenes.map((scene, sIdx) => {
              const chosenIdx = userChoices[sIdx] ?? 0;
              const chosenOpt = scene.options[chosenIdx] || scene.options[0];
              return (
                <div
                  key={scene.actHeader}
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 space-y-1 print-avoid-break"
                >
                  <div className="flex items-center justify-between font-mono text-[7px]">
                    <span className="text-amber-800 font-bold uppercase">{scene.actHeader}</span>
                    <span className="text-slate-400 uppercase">METHOD: {chosenOpt.actingMethod}</span>
                  </div>

                  <div className="font-sans font-semibold text-[8.5px] text-slate-900 leading-tight">
                    Choice: "{chosenOpt.title}"
                  </div>

                  <div className="pt-0.5 text-[7.5px] font-sans text-slate-600 leading-tight">
                    <span className="text-amber-700 font-mono font-bold mr-1">[ CRITIQUE ]:</span>
                    {chosenOpt.directorCritique}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Page 2 Footer */}
        <div className="pt-3 border-t border-slate-200 mt-4">
          <div className="flex items-center justify-between font-mono text-[7px] text-slate-400">
            <span>© 2026 MAYAVI MEDIA CREATIONS. ALL ARCHITECTURAL RIGHTS RESERVED.</span>
            <span>END OF OFFICIAL AUDITION DOSSIER // SECURE TRANSCRIPT VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
