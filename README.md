# Angular Training

## Current Branch Description
- ProductService provides a list of products
- CartService provides products added to cart, total quantity and price
- CartService handles adding a specific quantity of a product to cart
- CartService handles changing the amount of the product, removing the product
- CartService re-counts the totals on every update
- CartService handles clearing the cart
- WindowRefService abstract the global window object out by wrapping it
- LocalStorageService uses WindowRefService to access localStorage
- LocalStorageService handles setItem, getItem and removeItem operations
- ConfigOptionsService accepts the config options object in its constructor
- ConfigOptionsService instance is provided using useValue
- ConstantsService is provided using InjectionToken and useValue
- GeneratorService generates random passwords of the configurable length
- GeneratorService is provided using useFactory to pass the length parameter
- GeneratorService is injected as @Optional(), default password is used
- Product buy button click is handled by Highlight directive
- Highlight directive is using a timeout seconds @Input() and Renderer2

## Branches
 - Task1. Introduction
 - Task2. Components
 - Task3. Services and DI
 - Task4. Pipes
 - Task5. Routing
 - Task6. HTTP
 - Task7. NgRX
 - Task8. Forms

## Run
```js
ng serve -o
```

## Powered by Angular CLI
This project was generated with [Angular CLI](https://github.com/angular/angular-cli).
