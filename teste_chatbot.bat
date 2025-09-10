@echo off
echo ========================================
echo 🚀 INICIANDO CHATBOT VIRTUAL
echo ========================================
echo.

echo 📡 Iniciando Backend (porta 3001)...
start "Backend" cmd /k "cd /d C:\Users\Grupo Lidon T.I\Desktop\ChangeEdition_Logs && node server-http.js"

timeout /t 2 /nobreak > nul

echo 🌐 Iniciando Frontend (porta 4321)...
start "Frontend" cmd /k "cd /d C:\Users\Grupo Lidon T.I\Desktop\ChangeEdition_Logs && npx astro dev --port 4321"

echo.
echo ========================================
echo ✅ AMBOS SERVIDORES INICIADOS!
echo ========================================
echo.
echo 🔗 Backend: http://localhost:3001
echo 🎨 Frontend: http://localhost:4321
echo.
echo 💡 Como testar:
echo    1. Abra http://localhost:4321
echo    2. Clique no chat widget
echo    3. Digite "ola" ou "horario"
echo.
echo 🛑 Para parar: Feche as janelas dos terminais
echo.
pause
