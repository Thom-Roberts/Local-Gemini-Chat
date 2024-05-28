import { createEffect, createResource } from "solid-js";
import { For } from "solid-js/web";
import { getHistory } from "../services/gemini"; // Replace with the actual Gemini service import

interface Props {
  disabled: boolean;
}

export const History = (props: Props) => {
  const [data, { refetch }] = createResource(getHistory);

  createEffect(() => {
    console.log("Running effect");
    if (!props.disabled) {
      refetch();
      console.log("Disabled, so refreshing history");
    }
  });

  return (
    <For each={data()}>
      {(message) => (
        <div
          style={{
            display: "flex",
            "justify-content":
              message.role === "model" ? "flex-start" : "flex-end",
            "margin-block-end": "10px",
          }}
        >
          <div
            style={{
              "background-color":
                message.role === "model" ? "lightblue" : "lightgreen",
              "border-radius": "10px",
              padding: "10px",
              "max-width": "40%",
              color: "black",
            }}
          >
            <For each={message.parts}>{(part) => <p>{part.text}</p>}</For>
          </div>
        </div>
      )}
    </For>
  );
};

export default History;
