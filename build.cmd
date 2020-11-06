@ECHO OFF

SET verb=locate
WHERE /Q npm
IF %ERRORLEVEL% NEQ 0 (
	SET target=the npm tool
	GOTO failure
)
WHERE /Q npx
IF %ERRORLEVEL% NEQ 0 (
	SET target=the npx tool
	GOTO failure
)

IF NOT EXIST node_modules (
	CALL npm install --save-dev || (
		SET verb=install
		SET target=dependencies
		GOTO failure
	)
)
IF NOT EXIST dist ( mkdir dist )
DEL /Q dist

SET verb=transpile and minify
CALL npx sass styles.scss | node daniela.mjs - || (
	SET target=styles.scss
	GOTO failure
)

SET verb=transpile
CALL npx tsc --build && (
	CALL node daniela.mjs || (
		SET verb=minify
		SET target=index.js
		GOTO failure
	)
) || (
	SET target=index.ts
	GOTO failure
)

GOTO success

:failure
ECHO.
ECHO   [1;31mfailed to %verb% %target%[0m
SET target=
SET verb=
EXIT /B 1

:success
SET target=
SET verb=
