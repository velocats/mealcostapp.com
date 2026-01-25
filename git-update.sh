#!/bin/bash

# Stop on error
set -e

# Default commit message
MSG=${1:-"Update website"}

echo "📦 Checking status..."
git status --short

echo ""
read -p "➡️  Continue with commit and push? (y/n) " CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  echo "❌ Aborted."
  exit 1
fi

echo "➕ Adding changes..."
git add .

echo "📝 Committing..."
git commit -m "$MSG"

echo "🚀 Pushing to GitHub..."
git push

echo "✅ Done! Site will update shortly."

