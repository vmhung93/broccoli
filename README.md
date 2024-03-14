# Broccoli

Microservices Sample

# How to set up TypeScript with Node.js and Express

### 1. Initial folder and `package.json`

```
npm init
```

### 2. Installing TypeScript & other dependencies

```
npm install express
```

```
npm install -D typescript @types/express @types/node
```

### 3. Generating tsconfig.json

```
npx tsc --init
```

Example for tsconfig.json

```
{

	"exclude": ["node_modules"],
	"compilerOptions": {
        /* Visit https://aka.ms/tsconfig to read more about this file */

		/* Language and Environment */
		"target": "es2016",

		/* Modules */
		"module": "commonjs",
		"outDir": "./dist",
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,

		/* Emit */
		"sourceMap": true,

		/* Type Checking */
		"strict": true,

		/* Completeness */
		"skipLibCheck": true
	}
}
```

### 4. Update the `scripts` in the `package.json`

```
{
	"scripts":
	{
		"build": "npx tsc",
		"start": "node dist/app.js",
	}
}
```

# Debugging TypeScript

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": ["<node_internals>/**"],
            "program": "${workspaceFolder}/src/app.ts",
            "outFiles": ["${workspaceFolder}/dist/**/*.js"],
            "preLaunchTask": "tsc: build - tsconfig.json"
        }
    ]
}
```