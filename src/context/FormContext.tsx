'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// ──────────────────────────────────────────────
// Type definitions
// ──────────────────────────────────────────────

export type BrandCoreField = {
  field: string;
  value: string;
};

export type SocialDetail = {
  platform: string;
  icon: string;
  insight: string;
  stat: string;
};

export type OpportunityDetail = {
  platform: string;
  icon: string;
  opportunity: string;
};

// ──────────────────────────────────────────────
// Global FormData structure
// ──────────────────────────────────────────────

export type FormData = {
  // ── Basic info
  firstName: string;
  lastName: string;
  email: string;
  business: string;
  url: string;

  // ── Additional metadata
  message: string;
  persona: string;
  customAudience?: string;
  brandValues: Record<string, number>;
  tagline: string;
  voiceTone: string;

  // ── Brand-Voice inputs
  topic: string;
  writingSample: string;

  // ── Webhook-derived data
  core?: BrandCoreField[];
  brandCore?: {
    'Brand Statement'?: string;
    'Audience'?: string;
    'ICP'?: string;
  };

  // ── Social + Opportunity maps
  socials?: SocialDetail[];
  opportunities?: OpportunityDetail[];

  // ── Tone sliders (7-field model)
  sliderScores: {
    warmthAuthority: number;
    authorityEnergy: number;
    warmthEnergy: number;
    clarityCreativity: number;
    creativityEmpathy: number;
    clarityEmpathy: number;
    overall: number;
  };
};

// ──────────────────────────────────────────────
// Context definition
// ──────────────────────────────────────────────

type FormContextType = {
  data: FormData;
  setData: (values: Partial<FormData>) => void;
};

// ──────────────────────────────────────────────
// Create context
// ──────────────────────────────────────────────

const FormContext = createContext<FormContextType | null>(null);

// ──────────────────────────────────────────────
// Provider
// ──────────────────────────────────────────────

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<FormData>({
    // ── Defaults for basic fields
    firstName: '',
    lastName: '',
    email: '',
    business: '',
    url: '',
    message: '',
    persona: '',
    customAudience: '',
    brandValues: {},
    tagline: '',
    voiceTone: '',
    topic: '',
    writingSample: '',

    // ── Webhook and brand data
    core: [],
    brandCore: {
      'Brand Statement': '',
      'Audience': '',
      'ICP': '',
    },

    // ── Social and opportunity maps
    socials: [],
    opportunities: [],

    // ── Tone sliders (initialize mid-scale)
    sliderScores: {
      warmthAuthority: 5,
      authorityEnergy: 5,
      warmthEnergy: 5,
      clarityCreativity: 5,
      creativityEmpathy: 5,
      clarityEmpathy: 5,
      overall: 5,
    },
  });

  // Global setter for merging new data
  const setData = (values: Partial<FormData>) => {
    setDataState((prev) => ({
      ...prev,
      ...values,
    }));
  };

  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
};

// ──────────────────────────────────────────────
// Hook for components to access context
// ──────────────────────────────────────────────

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
