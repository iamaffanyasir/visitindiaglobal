@echo off
start cmd /k "cd C:\Users\yasir\Desktop\VisitIndia\visitindia && npm run server"
timeout /t 5
start cmd /k "cd C:\Users\yasir\Desktop\VisitIndia\visitindia && set PORT=3000 && npm start"
