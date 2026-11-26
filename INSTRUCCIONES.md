# Parte de Grover · HU-15 Registro de ciudadano (Sprint 1)

Esta es tu parte del Sprint 1, tal como está asignada en Jira:

| Jira | Qué es | Carpeta de este paquete |
|---|---|---|
| CITA-10 | HU-15 · Registro de ciudadano (3 SP) | — |
| CITA-11 | T15.1 Backend: registro de ciudadano (`auth.api.ts`) | `1_CITA-11` |
| CITA-12 | T15.2 Frontend: «Crear cuenta» y «Política de privacidad» | `2_CITA-12` |
| CITA-13 | T15.3 Pruebas del registro | `3_CITA-13` |

Las ramas `John`, `Stibhen-V.I` y `Joan` ya están unidas en `main`. Tu rama `Grover` va al final, así que primero traes lo que hay en `main` y encima pones tu parte.

Se hacen **3 commits, uno por subtarea**, cada uno con su clave de Jira.

## Pasos (en PowerShell o en la terminal de VS Code)

**1. Ir al repositorio y a tu rama**

Si todavía no lo tienes en tu PC:
```
git clone https://github.com/JohnMoralesDurand/RENIEC-MODERNO-SPRINT1.git
cd RENIEC-MODERNO-SPRINT1
```
Luego (o si ya lo tenías, desde la carpeta del repositorio):
```
git fetch origin
git checkout Grover
git pull origin Grover
git merge origin/main
```

**2. Revisar que tu nombre y correo estén bien**
```
git config user.name
git config user.email
```
El correo debe ser `2022210232@udh.edu.pe`. Si no, corrígelo:
```
git config user.name "Grover Chavez Figueredo"
git config user.email "2022210232@udh.edu.pe"
```

**3. Commit 1 · CITA-11 (backend)**

Cambia `C:\ruta\PARTE-GROVER-HU15` por la carpeta donde descomprimiste este paquete:
```
Copy-Item -Recurse -Force "C:\ruta\PARTE-GROVER-HU15\1_CITA-11\*" .
git add -A
git commit -m "CITA-11 feat(HU-15): registro de ciudadano con validación de DNI, celular y correo únicos"
```

**4. Commit 2 · CITA-12 (frontend)**
```
Copy-Item -Recurse -Force "C:\ruta\PARTE-GROVER-HU15\2_CITA-12\*" .
git add -A
git commit -m "CITA-12 feat(HU-15): pantallas Crear cuenta y Política de privacidad"
```

**5. Commit 3 · CITA-13 (pruebas)**
```
Copy-Item -Recurse -Force "C:\ruta\PARTE-GROVER-HU15\3_CITA-13\*" .
git add -A
git commit -m "CITA-13 test(HU-15): pruebas del registro de ciudadano"
```

**6. Subir tu rama**
```
git push origin Grover
```

**7. Unir a `main`**

En GitHub: **Pull requests → New pull request** → base `main` ← compare `Grover` → **Create pull request**.
Jhon (Scrum Master) lo revisa y lo une con **Merge pull request**.

## Para verlo funcionando (opcional)
```
cd web
npm install
npm start
```
Abre http://localhost:4200 → **Crear cuenta**. Los casos que debes comprobar están en `docs/pruebas/HU-15.md`.
