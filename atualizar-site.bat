@echo off
echo Atualizando site no GitHub...

:: Inicia o Git caso ele ainda nao exista nesta pasta
if not exist .git (
    git init
)

:: Configura o repositorio (mude para a URL do seu projeto)
git remote add origin https://github.com/ananarcisio/Portf-lio.git 2>nul
git branch -M main

git add .
git commit -m "Atualizacao do site"
git push -u origin main

echo Site atualizado com sucesso!
pause
