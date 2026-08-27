@echo off
echo Atualizando site no GitHub...

:: Inicia o Git caso ele ainda nao exista nesta pasta
if not exist .git (
    git init
)

:: Configura o seu nome e email para sumir com o aviso amarelo
git config user.name "Ana Elisa Fernandes Narcisio"
git config user.email "anaelisafernandesn06@gmail.com"

:: Configura o seu repositorio correto
git remote add origin https://github.com/ananarcisio/Portf-lio.git 2>nul
git branch -M main

:: Adiciona os arquivos e cria o ponto de atualizacao
git add .
git commit -m "Atualizacao do site" 2>nul

:: Envia os arquivos forcando a sobreposicao para eliminar o conflito
git push -u origin main --force

echo.
echo Site atualizado com sucesso!
pause
