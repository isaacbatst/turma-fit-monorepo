'use client';
import React from 'react';
import { SWRConfig } from 'swr';

type Props<T extends Record<string, unknown>> = {
  value: T,
  children: React.ReactNode
}

export const SWRProvider = <T extends Record<string, unknown>,>({ children, value }: Props<T>) => {
  return <SWRConfig value={{
    fallback: value
  }}>{children}</SWRConfig>
};