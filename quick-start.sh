#!/bin/bash

echo "🛒 MarketPlace MVP - Quick Start Setup"
echo "======================================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Backend setup
echo -e "\n${BLUE}Setting up Backend...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi
cp .env.example .env
echo -e "${GREEN}✓ Backend ready${NC}"
echo "  - Edit backend/.env with your Firebase credentials"
echo "  - Run: cd backend && npm run dev"

# Frontend setup
echo -e "\n${BLUE}Setting up Frontend...${NC}"
cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install
fi
cp .env.example .env.local
echo -e "${GREEN}✓ Frontend ready${NC}"
echo "  - Edit frontend/.env.local with your settings"
echo "  - Run: cd frontend && npm run dev"

echo -e "\n${GREEN}Setup Complete!${NC}"
echo -e "\n${BLUE}Next Steps:${NC}"
echo "1. Edit backend/.env with Firebase credentials"
echo "2. Edit frontend/.env.local with API URL and WhatsApp number"
echo "3. Setup Firestore database with sample products"
echo "4. Run backend: cd backend && npm run dev"
echo "5. Run frontend: cd frontend && npm run dev"
echo "6. Open: http://localhost:3000"
echo ""
