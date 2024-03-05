import React, {createContext, useState} from 'react';
import DialogBox from '../components/Common/DialogBox';

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
      {visible && <DialogBox />}
    </DialogBoxContext.Provider>
  );
}

export {DialogBoxContext};
