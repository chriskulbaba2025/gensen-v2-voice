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
  topic: string;           // Step 7
};

type FormContextType = {
  data: FormData;
  setData: (updater: Partial<FormData>) => void;
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
  });

  const setData = (update: Partial<FormData>) =>
    setDataState(prev => ({ ...prev, ...update }));

  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useForm must be used within FormProvider');
  return ctx;
}
