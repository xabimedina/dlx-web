export type ConsentPreference = {
  version: number;
  updatedAt: string;
  analytics: boolean;
};

export type ConsentModeValue = 'granted' | 'denied';

export type ConsentModeState = {
  ad_storage: ConsentModeValue;
  ad_user_data: ConsentModeValue;
  ad_personalization: ConsentModeValue;
  analytics_storage: ConsentModeValue;
};

export type ConsentAction = 'accept' | 'reject' | 'save' | 'restore';
