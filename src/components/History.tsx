import { createEffect, createResource } from "solid-js";
import { For, Switch, Match, template } from "solid-js/web";
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

  createEffect(() => {
    console.log("data length from component", data()?.length);
  });

  const createEl = (text: string) => {
    const elem = template(`<md-block>${text}</md-block>`);

    return elem;
  };

  return (
    <Switch>
      <Match when={data.loading === true}>Loading...</Match>
      <Match when={data()!.length > 0}>
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
                <For each={message.parts}>
                  {(part) => <div>{createEl(part.text!)()}</div>}
                </For>
              </div>
            </div>
          )}
        </For>
      </Match>
    </Switch>
  );
};

export default History;
