export interface CustomError {
  type: string;
  details?: ResponseDetail[];
}

export interface ResponseDetail {
  message: string;
}

export interface CustomError {
  type: string;
  details?: ResponseDetail[];
}

export interface Body {
  status: boolean;
  content: any;
  details?: ResponseDetail[];
}

export interface DomLoad {
  id: number;
  value: number;
  createdAt: string;
  updatedAt: string;
}

export interface Fcp {
  id: number;
  value: number;
  createdAt: string;
  updatedAt: string;
}

export interface File {
  id: number;
  name: string;
  type: string;
  value: number;
  createdAt: string;
  updatedAt: string;
}

export interface Ttfb {
  id: number;
  value: number;
  createdAt: string;
  updatedAt: string;
}

export interface WindowLoad {
  id: number;
  value: number;
  createdAt: string;
  updatedAt: string;
}
