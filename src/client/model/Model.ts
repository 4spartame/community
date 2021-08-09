export interface View {
  render(eventName: string, payload?: any): void;
}

export class Model {
  private views: View[] = [];

  public subscribe(view: View) {
    this.views.push(view);
  }
  public trigger(event: string, payload?: any) {
    this.views.forEach((view) => view.render(event, payload));
  }
}
