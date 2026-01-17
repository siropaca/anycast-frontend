#!/bin/bash

# Project root directory
FILE_PATH=$(dirname "$0")
cd "$FILE_PATH/../" || exit

echo "🚀 Bootstrap start"
echo "🚀 Working directory: $(pwd)"

##############################################################################
##
##  mise
##
##############################################################################
echo ""
echo "🚀 mise install: Start"
if type mise >/dev/null 2>&1; then
  if mise install; then
    echo "✅ mise install: Success"
  else
    echo "🚫 mise install: Failed"
  fi
else
  echo "⚠️ mise install: Skip mise because it could not be found."
  echo "⚠️ mise install: See https://mise.jdx.dev/getting-started.html for installation."
fi

##############################################################################
##
##  pnpm
##
##############################################################################
echo ""
echo "🚀 pnpm install: Start"
if type pnpm >/dev/null 2>&1; then
  if pnpm install; then
    echo "✅ pnpm install: Success"
  else
    echo "🚫 pnpm install: Failed"
  fi
else
  echo "⚠️ pnpm install: Skip pnpm because it could not be found."
  echo "⚠️ pnpm install: This may be due to the fact that the mise installation has not been completed."
fi

##############################################################################
##
##  env
##
##############################################################################
echo ""
echo "🚀 Copy .env.example to .env: Start"
if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    cp .env.example .env
    echo "✅ .env has been successfully created from .env.example"
  else
    echo "⚠️ .env.example does not exist. Skipping."
  fi
else
  echo "✅ .env already exists. Skipping."
fi

##############################################################################
##
##  Finish
##
##############################################################################
echo ""
echo "🚀 Bootstrap finished"
