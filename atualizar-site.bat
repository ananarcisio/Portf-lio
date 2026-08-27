@echo off
echo Atualizando site no GitHub...

:: Inicia o Git caso ele ainda nao exista nesta pasta
if not exist .git (
    git init
)

:: Configura o seu repositorio correto da Ana Elisa
git remote add origin https://github.com/ananarcisio/Portf-lio.git 2>nul
git branch -M main

git add .
git commit -m "Atualizacao do site" 2>nul

:: Tenta atualizar trazendo os arquivos do GitHub e juntando os historicos
git pull origin main --allow-unrelated-histories --no-edit

:: Envia os arquivos atualizados de volta para o GitHub
git push -u origin main

echo.
echo Processo concluido! Verifique as mensagens acima.
pause
