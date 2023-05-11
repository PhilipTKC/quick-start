export class Missing {
    public static parameters = ['id'];
    public missingComponent: string;
  
    public loading(parameters: {id: string}): void {
      this.missingComponent = parameters.id;
    }
  }