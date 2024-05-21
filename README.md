### Clonar y Renombrar un Directorio en Angular

Proceso de clonar un directorio existente, renombrar los archivos y componentes, y realizar los ajustes necesarios para que el nuevo módulo funcione correctamente.

#### Paso 1: Clonar un Directorio

1. Navega al directorio donde se encuentra el módulo que deseas clonar. Por ejemplo, `pages/banks`.
2. Copia el directorio y pégalo en la misma ubicación, renombrándolo como `pages/nuevo-modulo`.

```bash
cp -r src/app/pages/banks src/app/pages/nuevo-modulo
```

(o bien hacerlo a mano)

#### Paso 2: Renombrar el Directorio y Archivos Internos

1. Renombra los archivos internos para que reflejen el nuevo nombre del módulo. Por ejemplo, cambia `banks.component.ts` a `nuevo-modulo.component.ts` y `banks-detail.component.ts` a `nuevo-modulo-detail.component.ts`.

```bash
mv src/app/pages/nuevo-modulo/banks.component.ts src/app/pages/nuevo-modulo/nuevo-modulo.component.ts
mv src/app/pages/nuevo-modulo/banks-detail.component.ts src/app/pages/nuevo-modulo/nuevo-modulo-detail.component.ts
```

#### Paso 3: Renombrar los Componentes Internos

1. Abre los archivos `nuevo-modulo.component.ts` y `nuevo-modulo-detail.component.ts` y cambia los nombres de los componentes.

```typescript
// nuevo-modulo.component.ts
@Component({
  selector: "app-nuevo-modulo",
  templateUrl: "./nuevo-modulo.component.html",
  styleUrls: ["./nuevo-modulo.component.scss"],
})
export class NuevoModuloComponent {
  // contenido del componente
}

// nuevo-modulo-detail.component.ts
@Component({
  selector: "app-nuevo-modulo-detail",
  templateUrl: "./nuevo-modulo-detail.component.html",
  styleUrls: ["./nuevo-modulo-detail.component.scss"],
})
export class NuevoModuloDetailComponent {
  // contenido del componente
}
```

#### Paso 4: Renombrar las Variables en el Archivo Config

1. Abre el archivo de configuración del módulo (e.g., `banks.config.ts`) y renombra las variables.

```typescript
export const NUEVO_MODULO_COLUMNS_CONFIG = [
  {
    key: "id",
    label: "ID",
    sortable: true,
    direction: "ASC",
    width: "10%",
    action: (row: any) => (row?.id ? this.viewDetails(row.id) : console.warn("Row is undefined or has no ID")),
  },
  // otras configuraciones
];

export const NUEVO_MODULO_SEARCH_CRITERIA = [
  {
    field: "name",
    operator: "contains",
    value: "",
    label: "Texto Literal",
    minLength: 1,
    type: "string" as "string",
  },
  // otros criterios
];
```

#### Paso 5: Refactorizar las Importaciones

1. Actualiza las importaciones de variables e interfaces en los componentes.

```typescript
import { NUEVO_MODULO_COLUMNS_CONFIG, NUEVO_MODULO_SEARCH_CRITERIA } from "./nuevo-modulo.config";
import { NuevoModulo, PaginatedResponse } from "../../interfaces/nuevo-modulo";
```

#### Paso 6: Cambiar el Icono, la Ruta Detalle y el Endpoint

1. Actualiza las propiedades en el componente principal (`nuevo-modulo.component.ts`).

```typescript
detailUrl: string = "nuevo-modulo";
sortField: string = "id";
icono: string = "nuevoModuloIcon"; // Asegúrate de que el icono esté definido en menu.constants.ts
ENDPOINT = `${this.endpoints.NUEVO_MODULO_ENDPOINT}`; // Define el endpoint en api-endpoints.constants.ts
```

#### Paso 7: Cambiar las Columnas de la Tabla y los Criterios de Búsqueda

1. Actualiza el archivo de configuración del módulo (`nuevo-modulo.config.ts`) con las nuevas columnas y criterios de búsqueda.

```typescript
export const NUEVO_MODULO_COLUMNS_CONFIG = [
  {
    key: "id",
    label: "ID",
    sortable: true,
    direction: "ASC",
    width: "10%",
  },
  {
    key: "nombre",
    label: "Nombre",
    sortable: true,
    direction: "ASC",
    width: "60%",
  },
  {
    key: "codigo",
    label: "Código",
    sortable: true,
    direction: "ASC",
    width: "20%",
  },
  {
    key: "acciones",
    label: "Acciones",
    sortable: false,
    type: "actions",
    direction: "ASC",
    width: "10%",
    action: (row: any) => (row?.id ? this.viewDetails(row.id) : console.warn("Row is undefined or has no ID")),
  },
];

export const NUEVO_MODULO_SEARCH_CRITERIA = [
  {
    field: "nombre",
    operator: "contains",
    value: "",
    label: "Texto Literal",
    minLength: 1,
    type: "string" as "string",
  },
  {
    field: "codigo",
    operator: "greater",
    value: "",
    label: "Código",
    minLength: 1,
    type: "number" as "number",
  },
];
```

#### Paso 8: Cambiar los Campos de Edición en el Componente Detalle

1. Actualiza los campos de edición en `nuevo-modulo-detail.component.ts`.

```typescript
editFields: Array<EditInterface> = [
  {
    field: "codigo",
    type: "string",
    captionKey: "codigo",
  },
  {
    field: "nombre",
    type: "string",
    captionKey: "nombre",
  },
  {
    field: "activo",
    type: "boolean",
    captionKey: "activo",
  },
];
```

#### Paso 9: Actualizar Literales en las Plantillas HTML

1. Asegúrate de que los títulos y textos están correctamente traducidos y referenciados en las plantillas HTML.

```html
<!-- nuevo-modulo.component.html -->
<h1>{{ translations["NUEVOMODULO"].TITLE }}</h1>

<!-- nuevo-modulo-detail.component.html -->
<h2>{{ translations["NUEVOMODULODETAIL"].TITLE }}</h2>
```

2. Actualiza los archivos de traducción (`es.json`, `ca.json`, `en.json`) en `shared-lib/assets/i18n`.

```json
{
  "NUEVOMODULO": {
    "TITLE": "Nuevo Módulo",
    "SUBTITLE": "Your translation for the subtitle goes here"
  },
  "NUEVOMODULODETAIL": {
    "TITLE": "Detalle del Nuevo Módulo"
  }
}
```

#### Paso 10: Realizar `npm run build` y `npm run start:all`

1. Ejecuta los siguientes comandos para construir y ejecutar el proyecto.

```bash
npm run build
npm run start:all
```

2. Abre la ventana "SHELL" y navega a "Auxiliars" para probar el nuevo módulo.

### Conclusión

Siguiendo estos pasos, puedes clonar y renombrar un módulo en Angular, asegurándote de que todas las referencias e importaciones se actualicen correctamente. Esto permite mantener un código limpio y organizado siguiendo los principios SOLID.
