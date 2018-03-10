# Angular Training

## Task 7. NgRX
- One-way data flow thanks to @ngrx/store
- App initialization performed via store, still using AppSettingsService and APP_INITIALIZER
- Combined root reducers used in StoreModule.forRoot(): AppSettingsReducer and RouterReducer
- Router connected to Store using @ngrx/router-store, navigation performed using router actions
- Products sorting performed via store. Reducer CRUD operations performed using @ngrx/entity
- No direct interactions with ProductsService, server communications initialized by @ngrx/effects
- Redux DevTools chrome extension used thanks to @ngrx/store-devtools, logOnly in production
- AutoUnsubscribe decorator used for unsbscription, multiple subscriptions using sub.add()
- AppInitializerGuard implemented but not currently used

## Branches
 - Task1. Introduction
 - Task2. Components
 - Task3. Services and DI
 - Task4. Pipes
 - Task5. Routing
 - Task6. HTTP
 - Task7. NgRX
 - Task8. Forms
 - Task9. Unit Tests

## Run Development Server
```
npm run dev
```

## Run Production Build
```
npm run prod
```

## Powered by Angular CLI
This project was generated with [Angular CLI](https://github.com/angular/angular-cli).
