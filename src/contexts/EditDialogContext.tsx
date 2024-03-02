import React, {createContext, useState} from 'react';

const EditDialogContext = createContext({
  title: '',
  onEditCallback: (data: any) => {
    data;
  },
  setDialogTitle: (title: string) => {
    title;
  },
  setOnEditCallback: (callback: any) => {
    callback;
  },
});

/**
 * @example
 * ```
 * <EditDialogProvider>
 *  <App />
 * </EditDialogProvider>
 * ```
 */
export default function EditDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title, setDialogTitle] = useState('');
  const [onEditCallback, setOnEditCallback] = useState<any>(() => {});

  return (
    <EditDialogContext.Provider
      value={{title, setDialogTitle, onEditCallback, setOnEditCallback}}>
      {children}
    </EditDialogContext.Provider>
  );
}

export {EditDialogContext};
