import React, {createContext, useState} from 'react';

const DialogBoxContext = createContext({
  visible: false,
  setVisible: (visible: boolean) => {
    visible;
  },
  content: <></>,
  setContent: (content: React.JSX.Element) => {
    content;
  },
});

/**
 * @example
 * ```
 * <DialogBoxProvider>
 *  <App />
 * </DialogBoxProvider>
 * ```
 */
export default function DialogBoxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(<></>);

  return (
    <DialogBoxContext.Provider
      value={{visible, setVisible, content, setContent}}>
      {children}
    </DialogBoxContext.Provider>
  );
}

export {DialogBoxContext};
