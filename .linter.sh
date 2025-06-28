#!/bin/bash
cd /home/kavia/workspace/code-generation/recipeexplorer-94647-11a41fc5/frontend_recipe_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

