export {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  COOKIE_POLICY_PATH,
} from './constants';
export {
  applyConsentPreference,
  clearConsentPreference,
  getConsentModeState,
  readConsentPreference,
  saveConsentPreference,
} from './storage';
export type {
  ConsentAction,
  ConsentModeState,
  ConsentModeValue,
  ConsentPreference,
} from './types';
