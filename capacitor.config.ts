import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eczemaease.app',
  appName: 'EczemaEase',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
