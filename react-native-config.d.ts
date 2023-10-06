declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL: string;
    LAST_FM_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
