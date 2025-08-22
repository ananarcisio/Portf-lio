@echo off
echo Atualizando site no GitHub...
git add .
git commit -m "Atualizacao do site"
git push
echo Site atualizado com sucesso!
pause