"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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
  // Basic info
  firstName: string;
  lastName: string;
  email: string;
  business: string;
  url: string;

  // Social URLs
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  linkedinPersonal?: string;
  linkedinBusiness?: string;

  // Metadata
  message: string;
  persona: string;
  customAudience?: string;
  brandValues: Record<string, number>;
  tagline: string;
  voiceTone: string;

  // Brand-Voice inputs
  topic: string;
  writingSample: string;

  // n8n interim report fields
  welcomeMessage?: string;
  htmlContent?: string;

  // Webhook-derived data
  core?: BrandCoreField[];
  brandCore?: {
    "Brand Statement"?: string;
    Audience?: string;
    ICP?: string;
  };

  // Flattened high-level fields
  icp?: string;
  audience?: string;
  brandStatement?: string;

  socials?: SocialDetail[];
  opportunities?: OpportunityDetail[];

  reportHtml?: string;

  // NEW: Cognito client ID
  clientId?: string | null;

  // Sliders
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
// Context interface
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
    // Basic defaults
    firstName: "",
    lastName: "",
    email: "",
    business: "",
    url: "",

    // Socials
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    linkedinPersonal: "",
    linkedinBusiness: "",

    // Metadata
    message: "",
    persona: "",
    customAudience: "",
    brandValues: {},
    tagline: "",
    voiceTone: "",

    // Inputs
    topic: "",
    writingSample: "",

    // n8n interim HTML
    welcomeMessage: "",
    htmlContent: "",

    // Brand data
    core: [],
    brandCore: {
      "Brand Statement": "",
      Audience: "",
      ICP: "",
    },

    icp: "",
    audience: "",
    brandStatement: "",

    socials: [],
    opportunities: [],

    reportHtml: "",

    // NEW default clientId
    clientId: null,

    // Sliders
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
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
