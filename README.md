# CountriesApp

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.12.

## Características principales
- Búsqueda de países por nombre con autocompletado y validación
- Filtro por región
- Listado virtualizado para alto rendimiento
- Gestión de favoritos persistente
- Diseño responsivo y moderno
- Accesibilidad básica (a11y): roles, labels, navegación por teclado
- Manejo de estados de carga y error
- Lazy loading de vistas
- Uso de signals para estado reactivo
- Componentes standalone y reutilizables
- Optimización de imágenes con NgOptimizedImage

## Estructura del proyecto
```
├── src/
│   ├── app/
│   │   ├── core/                # Servicios y lógica central
│   │   ├── features/            # Funcionalidades principales (listado, detalle, administración)
│   │   ├── shared/              # Componentes y utilidades compartidas
│   │   └── layout/              # Layout principal y navegación
│   ├── assets/                  # Recursos estáticos
│   └── environments/            # Configuración de entornos
├── angular.json                 # Configuración Angular
├── package.json                 # Dependencias y scripts
└── README.md                    # Documentación
```

## Instalación y ejecución
1. Clona el repositorio:
   ```bash
   git clone <repo-url>
   cd countries-app
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```
4. Abre [http://localhost:4200](http://localhost:4200) en tu navegador.

## Patrones y buenas prácticas
- **Componentes standalone** para modularidad y reutilización
- **Signals** para manejo reactivo del estado
- **Inyección directa con `inject`** en servicios/componentes
- **Estructura de carpetas por feature**
- **Nombres de archivos en kebab-case**
- **Tipado estricto con interfaces**
- **Accesibilidad básica (a11y)**: roles, labels, navegación por teclado
- **Optimización de rendimiento**: virtual scroll, trackBy, NgOptimizedImage
- **Lazy loading** de vistas

## Versiones
- Angular: 19.2.12
- Node: >=18.x
- RxJS: ^7.x

## Testing
- Ejecuta pruebas unitarias:
  ```bash
  ng test
  ```
- Ejecuta pruebas end-to-end:
  ```bash
  ng e2e
  ```

## Recursos adicionales
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)

## Integración Continua (CI)

Este proyecto utiliza **GitHub Actions** para asegurar la calidad y confiabilidad del código en cada push o pull request a las ramas `main` o `master`.

El pipeline ejecuta automáticamente:
- `ng lint` para análisis de estilo y buenas prácticas.
- `ng test --watch=false --code-coverage` para ejecutar pruebas unitarias y generar reporte de cobertura.
- `ng build --configuration=production` para compilar la aplicación en modo producción.

El workflow se encuentra en `.github/workflows/ci.yml` y luce así:

```yaml
name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout código
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18.x
          cache: 'npm'

      - name: Instalar dependencias
        run: npm ci

      - name: Lint
        run: npm run lint || ng lint

      - name: Test (con cobertura)
        run: npm run test -- --watch=false --code-coverage || ng test --watch=false --code-coverage

      - name: Build producción
        run: npm run build -- --configuration=production || ng build --configuration=production
```

Esto garantiza que solo se integren cambios que pasan las validaciones de calidad, pruebas y build.
