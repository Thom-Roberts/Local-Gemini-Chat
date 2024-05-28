import { createSignal } from "solid-js";
import { History } from "./components/History";
import { Chat } from "./components/Chat";

import { sendMessage } from "./services/gemini";

import "./App.css";

function App() {
  const [disabled, setDisabled] = createSignal(false);

  const submitChat = async (text: string) => {
    setDisabled(true);
    const message = await sendMessage(text);
    console.log(message);
    setDisabled(false);
  };

  return (
    <>
      <History disabled={disabled()} />
      <Chat disabled={disabled()} submitChat={submitChat} />
    </>
  );
}

export default App;
