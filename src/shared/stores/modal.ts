import { create } from 'zustand';

interface ModalStore {
  isOpen: boolean;
  content: React.ReactNode | null;
  onClose: (() => void) | null;
  openModal: (content: React.ReactNode, options?: { onClose?: () => void }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  isOpen: false,
  content: null,
  onClose: null,
  openModal: (content, options) =>
    set({ isOpen: true, content, onClose: options?.onClose ?? null }),
  closeModal: () => {
    const { onClose } = get();

    set({ isOpen: false, content: null, onClose: null });
    onClose?.();
  },
}));
