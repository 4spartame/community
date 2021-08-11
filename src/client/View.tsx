import Router from "./pages/Router";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store } from "redux";
import { View } from "./model/Model";
import { Command } from "./commands/Command";
import initStore from "./viewModel/Store";

export class ViewImpl implements View {
  private store!: Store;
  constructor(private command: Command) {
    this.store = initStore(this);
  }

  public mount(root: HTMLElement,) {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={this.store}>
          <Router />
        </Provider>
      </React.StrictMode>,
      root,
    );
  }

  public redirect() {

  }

  public render(type: string, payload: any) {
    this.store.dispatch({ type, payload });
  }

  public trigger(type: string, payload: any) {
    this.command.trigger(type, payload);
  }
}