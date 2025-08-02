'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type FormData = {
  name: string;
  email: string;
  business: string;
  url: string;
  message: string;
  persona: string;
  customAudience?: string;
  brandValues: Record<string, string>;
  tagline: string;
  voiceTone: string;
  topic: string;
  writingSample: string;
};

type FormContextType = {
  data: FormData;
  setData: (values: Partial<FormData>) => void;
};

const FormContext = createContext<FormContextType | null>(null);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<FormData>({
    name: '',
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
  });

  const setData = (values: Partial<FormData>) => {
    setDataState(prev => ({
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

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
