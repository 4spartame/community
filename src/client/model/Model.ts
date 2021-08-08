export interface View {
  render(eventName: string, payload?: any): void;
}

export class Model {
  private views: View[] = [];
  protected trigger(event: string, payload?: any) {
    this.views.forEach((view) => view.render(event, payload));
  }
}
