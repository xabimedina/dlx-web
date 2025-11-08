export interface Calculator {
    'about-phrase': string;
    'about-subtitle': string;
    'about-title': string;
    'project-subtitle': string;
    'project-title': string;
    'results-description': string;
    'results-furniture': string;
    'results-phrase': string;
    'results-title': string;
    'start-subtitle': string;
    'start-title': string;
}

export interface Home {
    'contact-calculator-subtitle': string;
    'contact-calculator-title': string;
    'contact-consult-subtitle': string;
    'contact-consult-title': string;
    'contact-interior-subtitle': string;
    'contact-interior-title': string;
    'start-subtitle': string;
    'start-title': string;
    'project-start-title': string;
    'project-start-subtitle': string;
    'project-start-description': string;
}

export type HomeStart = Pick<Home, 'start-subtitle' | 'start-title'>;
export type HomeContact = Pick<Home, 
  'contact-calculator-subtitle' | 'contact-calculator-title' |
  'contact-consult-subtitle' | 'contact-consult-title' |
  'contact-interior-subtitle' | 'contact-interior-title'>;
export type HomeProjectStart = Pick<Home,
  'project-start-title' | 'project-start-subtitle' | 'project-start-description'>;

export interface Services {
    'arch-description': string;
    'arch-subtitle': string;
    'arch-title': string;
    'consult-description': string;
    'consult-subtitle': string;
    'consult-title': string;
    'int-description': string;
    'int-subtitle': string;
    'int-title': string;
}

export interface FirebaseWebTextsDocument {
    calculator: Calculator;
    home: Home;
    services: Services;
}