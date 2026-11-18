export type Language = 'en' | 'es';

export type AppView =
  | 'home'
  | 'roofing-insurance'
  | 'windows'
  | 'hvac'
  | 'about-us'
  | 'privacy-policy';

export type ServiceOption =
  | 'roof_repair'
  | 'roof_replacement'
  | 'insurance_claim'
  | 'windows_installation'
  | 'hvac_system';

export interface InspectionFormData {
  fullName: string;
  phone: string;
  propertyAddress: string;
  email: string;
  service: ServiceOption;
  privacyConsent: boolean;
  notes?: string;
}
