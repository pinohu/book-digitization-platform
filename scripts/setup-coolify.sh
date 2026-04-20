#!/bin/bash

set -e  # Exit on error

# Function to log messages
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Function to prompt for input with a default value
prompt_with_default() {
    local prompt=$1
    local default=$2
    local value

    echo -n "$prompt [$default]: "
    read value
    echo "${value:-$default}"
}

# Check if Coolify CLI is installed
if ! command -v coolify &> /dev/null; then
    log "Installing Coolify CLI..."
    curl -s https://get.coolify.io | bash || {
        log "Error: Failed to install Coolify CLI"
        exit 1
    }
fi

# Prompt for configuration values
log "Please provide the following configuration values:"
COOLIFY_TOKEN=$(prompt_with_default "Coolify Token" "")
COOLIFY_PROJECT_ID=$(prompt_with_default "Coolify Project ID" "")
DOMAIN=$(prompt_with_default "Domain" "localhost")
NEXT_PUBLIC_API_URL=$(prompt_with_default "API URL" "https://$DOMAIN/api")
DATABASE_URL=$(prompt_with_default "Database URL" "postgresql://postgres:postgres@localhost:5432/ai_os")

# Create development environment file
log "Creating development environment file..."
cat > .env.development << EOL
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_os_dev
NEXTAUTH_URL=http://localhost:3000
COOLIFY_TOKEN=$COOLIFY_TOKEN
COOLIFY_PROJECT_ID=$COOLIFY_PROJECT_ID
EOL

# Create production environment file
log "Creating production environment file..."
cat > .env.production << EOL
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
DATABASE_URL=$DATABASE_URL
NEXTAUTH_URL=https://$DOMAIN
COOLIFY_TOKEN=$COOLIFY_TOKEN
COOLIFY_PROJECT_ID=$COOLIFY_PROJECT_ID
DOMAIN=$DOMAIN
EOL

# Add environment variables to GitHub Actions secrets
log "Please add the following secrets to your GitHub repository:"
echo "COOLIFY_TOKEN: $COOLIFY_TOKEN"
echo "COOLIFY_PROJECT_ID: $COOLIFY_PROJECT_ID"
echo "NEXT_PUBLIC_API_URL: $NEXT_PUBLIC_API_URL"
echo "DOMAIN: $DOMAIN"
echo "DATABASE_URL: $DATABASE_URL"

# Test Coolify connection
log "Testing Coolify connection..."
coolify login --token "$COOLIFY_TOKEN" || {
    log "Error: Failed to login to Coolify"
    exit 1
}

# Create development environment
log "Creating development environment..."
./scripts/deploy.sh development || {
    log "Error: Failed to create development environment"
    exit 1
}

log "Setup completed successfully!"
log "Next steps:"
log "1. Add the secrets to your GitHub repository"
log "2. Push your code to trigger the CI/CD pipeline"
log "3. Monitor the deployment in Coolify dashboard" 