"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ──────────────────────────────────────────────
// Types
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

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  business: string;
  url: string;

  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  linkedinPersonal?: string;
  linkedinBusiness?: string;

  message: string;
  persona: string;
  customAudience?: string;
  brandValues: Record<string, number>;
  tagline: string;
  voiceTone: string;

  topic: string;
  writingSample: string;

  welcomeMessage?: string;
  htmlContent?: string;

  core?: BrandCoreField[];
  brandCore?: {
    "Brand Statement"?: string;
    Audience?: string;
    ICP?: string;
  };

  icp?: string;
  audience?: string;
  brandStatement?: string;

  socials?: SocialDetail[];
  opportunities?: OpportunityDetail[];

  reportHtml?: string;
  clientId?: string | null;

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
// Default State
// ──────────────────────────────────────────────

const defaultState: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  business: "",
  url: "",

  facebook: "",
  instagram: "",
  linkedin: "",
  youtube: "",
  linkedinPersonal: "",
  linkedinBusiness: "",

  message: "",
  persona: "",
  customAudience: "",
  brandValues: {},
  tagline: "",
  voiceTone: "",

  topic: "",
  writingSample: "",
  welcomeMessage: "",
  htmlContent: "",

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
  clientId: null,  // default to null

  sliderScores: {
    warmthAuthority: 5,
    authorityEnergy: 5,
    warmthEnergy: 5,
    clarityCreativity: 5,
    creativityEmpathy: 5,
    clarityEmpathy: 5,
    overall: 5,
  },
};

// ──────────────────────────────────────────────
// Context
// ──────────────────────────────────────────────

type FormContextType = {
  data: FormData;
  setData: (values: Partial<FormData>) => void;
  clearData: () => void;  // Function to clear all data
};

const FormContext = createContext<FormContextType | null>(null);

// ──────────────────────────────────────────────
// Provider
// ──────────────────────────────────────────────

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<FormData>(defaultState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("gensen_user");
    if (stored) {
      setDataState((prev) => ({
        ...prev,
        ...JSON.parse(stored),
      }));
    }
  }, []);

  const setData = (values: Partial<FormData>) => {
    setDataState((prev) => {
      const updated = { ...prev, ...values };
      localStorage.setItem("gensen_user", JSON.stringify(updated));
      return updated;
    });
  };

  const clearData = () => {
    setDataState(defaultState); // Reset the form data to the default state
    localStorage.removeItem("gensen_user");  // Optionally clear localStorage as well
  };

  return (
    <FormContext.Provider value={{ data, setData, clearData }}>
      {children}
    </FormContext.Provider>
  );
};

// ──────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
