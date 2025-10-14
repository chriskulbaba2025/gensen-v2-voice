// @ts-nocheck
// TEMP MOCK: disables Firebase during local testing.

export const app = {} as any;

export const auth = {
  onAuthStateChanged: (_cb: any) => () => {},
  currentUser: null,
} as any;

export const db = {} as any;
export const analytics = {} as any;
