<img alt="Logo de Angular" src="./public/assets/images/angular-logo.svg" style="display: block; margin: 0 auto" height=200 width=600 />

# Angular Skeleton App

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 20.1.3.

## Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecute:

```
ng serve
```

Una vez que el servidor esté en ejecución, abra su navegador y navegue a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifique cualquier archivo fuente.

## Andamiaje del código

Angular CLI incluye potentes herramientas de andamiaje de código. Para generar un nuevo componente, ejecute:

```
ng generate component component-name
```

Para obtener una lista completa de los esquemas disponibles (tales como `components`, `directives`, o `pipes`), ejecute:

```
ng generate --help
```

## Compilación

Para compilar el proyecto, ejecute:

```
ng build
```

Esto compilará su proyecto y almacenará los artefactos de compilación en el directorio `dist/`. De forma predeterminada, la compilación de producción optimiza el rendimiento y la velocidad de su aplicación.

## Ejecución de pruebas unitarias

Para ejecutar pruebas unitarias con el ejecutor de pruebas [Jest](https://github.com/jestjs/jest/), use el siguiente comando:

```
npm run test
```

## ESLint

Ejecute el siguiente comando:

```
ng add angular-eslint
```

```
npm i prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev
```

Más información de [integración de Prettier con ESLint](https://prettier.io/docs/related-projects#eslint-integrations).
