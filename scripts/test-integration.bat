@echo off
setlocal

if not "%APPVEYOR%" == "" (
	set ELECTRON_RUN_AS_NODE=
)

:: Integration Tests
.\scripts\code.bat %~dp0\..\extensions\Sbox-api-tests\testWorkspace --extensionDevelopmentPath=%~dp0\..\extensions\Sbox-api-tests --extensionTestsPath=%~dp0\..\extensions\Sbox-api-tests\out
.\scripts\code.bat %~dp0\..\extensions\Sbox-colorize-tests\test --extensionDevelopmentPath=%~dp0\..\extensions\Sbox-colorize-tests --extensionTestsPath=%~dp0\..\extensions\Sbox-colorize-tests\out

endlocal