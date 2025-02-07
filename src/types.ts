export interface ISeminar {
  id: number | null;
  title: string;
  description: string;
  date: string;
  time: string;
  photo?: string;
}

export interface ISeminarSlice {
  isLoading: boolean;
  errorMessage: string;
  seminarsList: ISeminar[];
}

export interface IModal {
  isOpen: boolean;
  deleteModal: boolean;
  editModal: boolean;
  id: number | null;
}

export interface IButtonProp {
  name: string;
  func: () => void;
}
export interface IModalProp {
  id: number | null;
}
export interface ISingleSeminarProp {
  seminar: ISeminar;
}

export type ISeminarExclude = Omit<ISeminar, 'id' | 'photo'>;
