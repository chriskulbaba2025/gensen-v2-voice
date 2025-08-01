// src/context/FormContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type FormData = {
  name: string;
  email: string;
  message: string;
  persona: string;
  customAudience: string;
  voiceTone: string;
  brandValues: Record<string, number>;
  tagline: string;
  topic: string;
  writingSample: string;      // ← added field
};

type FormContextType = {
  data: FormData;
  setData: (update: Partial<FormData>) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    persona: '',
    customAudience: '',
    voiceTone: '',
    brandValues: {},
    tagline: '',
    topic: '',
    writingSample: '',       // ← initialize it here
  });

  const setData = (update: Partial<FormData>) => {
    setDataState(prev => ({ ...prev, ...update }));
  };

  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm(): FormContextType {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a <FormProvider>');
  }
  return context;
}
