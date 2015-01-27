import * as ng from 'angular/angular';

@ng.Component({
    selector: 'hello-app',
    componentServices: [GreetingService],
    template: new ng.TemplateConfig({
      inline: `
      <div class="greeting">
    {{greeting}}
    <span red>world</span>!
    </div>
    <button class="changeButton" (click)="changeGreeting()">change greeting</button>
    `,
    directives: [RedDec]
  })
})
class HelloCmp {
  greeting: string;
  constructor(service: GreetingService) {
    this.greeting = service.greeting;
  }
  changeGreeting() {
    this.greeting = 'howdy';
  }
}

@ng.Decorator({
  selector: '[red]'
})
class RedDec {
  constructor(el: ng.NgElement) {
    el.domElement.style.color = 'red';
  }
}

// A service used by the HelloCmp component.
class GreetingService {
  greeting:string;
  constructor() {
    this.greeting = 'hello';
  }
}

export function main() {
  ng.bootstrap(HelloCmp);
}
