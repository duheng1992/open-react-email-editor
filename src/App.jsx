import { useState, useRef } from 'react'
import Easymail from "easy-mail-editor"
import mjml2html from 'mjml-browser'

export function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result;
      resolve(result);
    };
  });
}

const App = () => {
  const [lang, setLang] = useState("zh_CN");
  const [skin, setSkin] = useState("light");

  const [mjmlJson, setValue] = useState();

  const ref = useRef(null);
  const rejectRef = useRef(null);

  const getEditorMjmlJson = () => {
    console.log(ref.current?.getData())
    console.log(mjml2html(ref.current?.getData()?.mjml))
    return ref.current?.getData();
  };

  return <>
    <button onClick={getEditorMjmlJson}>保存</button>

    <hr />

    <Easymail
      lang={lang}
      width="100vw"
      height="100vh"
      skin={skin}
      colorPrimary={"blue"}
      ref={ref}
      value={mjmlJson}
      // tinymceLink={tinymceLink}
      onUpload={(file) => {
        return new Promise((resolve, reject) => {
          rejectRef.current = reject;
          setTimeout(async () => {
            try {
              const url = await fileToBase64(file);
              resolve({ url });
            } catch (error) {
              console.log(error)
              reject("upload error");
            }
          });
        });
      }}
      onUploadFocusChange={() => {
        rejectRef.current("error");
        rejectRef.current = null;
      }}
    />
  </>
}
export default App;
