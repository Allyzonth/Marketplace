@echo off
echo 🛒 MarketPlace MVP - Quick Start Setup
echo ======================================

echo.
echo Setting up Backend...
cd backend
if not exist "node_modules" (
    call npm install
)
if not exist ".env" (
    copy .env.example .env
)
echo ✓ Backend ready
echo   - Edit backend\.env with your Firebase credentials
echo   - Run: cd backend ^&^& npm run dev

echo.
echo Setting up Frontend...
cd ..\frontend
if not exist "node_modules" (
    call npm install
)
if not exist ".env.local" (
    copy .env.example .env.local
)
echo ✓ Frontend ready
echo   - Edit frontend\.env.local with your settings
echo   - Run: cd frontend ^&^& npm run dev

echo.
echo Setup Complete!
echo.
echo Next Steps:
echo 1. Edit backend\.env with Firebase credentials
echo 2. Edit frontend\.env.local with API URL and WhatsApp number
echo 3. Setup Firestore database with sample products
echo 4. Run backend: cd backend ^&^& npm run dev
echo 5. Run frontend: cd frontend ^&^& npm run dev
echo 6. Open: http://localhost:3000
echo.
