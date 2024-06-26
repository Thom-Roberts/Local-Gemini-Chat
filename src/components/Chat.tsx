import { createEffect, createSignal } from "solid-js";

interface Props {
  submitChat: (text: string) => void;
  disabled: boolean;
}

export const Chat = (props: Props) => {
  const [chatBoxText, setChatBoxText] = createSignal("");

  createEffect(() => {
    if (!props.disabled) {
      console.log("Chat box is enabled");
      setChatBoxText("");
    }
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.submitChat(chatBoxText());
      }}
    >
      <input
        onInput={(e) => setChatBoxText(e.target.value)}
        value={chatBoxText()}
      />
      <button type="submit" disabled={props.disabled}>
        Send
      </button>
    </form>
  );
};
