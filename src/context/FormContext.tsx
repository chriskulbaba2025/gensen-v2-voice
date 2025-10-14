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

// Global FormData structure
export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  business: string;
  url: string;
  message: string;
  persona: string;
  customAudience?: string;
  brandValues: Record<string, number>;
  tagline: string;
  voiceTone: string;
  topic: string;
  writingSample: string;

  // Raw data array from webhook (Brand Statement, Audience, ICP)
  core?: BrandCoreField[];

  // Structured summary used in later steps
  brandCore?: {
    'Brand Statement'?: string;
    'Audience'?: string;
    'ICP'?: string;
  };

  // ✅ Persisted socials data (from webhook)
  socials?: SocialDetail[];

  // ✅ Local-only opportunity map (not persisted across pages)
  opportunities?: OpportunityDetail[];

  // Tone sliders (Step 2)
  sliderScores?: {
    emotional: number;
    expressive: number;
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

// Create context
const FormContext = createContext<FormContextType | null>(null);

// ──────────────────────────────────────────────
// Provider
// ──────────────────────────────────────────────

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<FormData>({
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

    // Initialize placeholders for webhook and refined brand core
    core: [],
    brandCore: {
      'Brand Statement': '',
      'Audience': '',
      'ICP': '',
    },
    socials: [],
    opportunities: [],

    sliderScores: {
      emotional: 5,
      expressive: 5,
      overall: 5,
    },
  });

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
