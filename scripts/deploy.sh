#!/bin/bash

set -e  # Exit on error

# Function to log messages
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Check for required environment variables
required_vars=("COOLIFY_TOKEN" "COOLIFY_PROJECT_ID" "NEXT_PUBLIC_API_URL")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        log "Error: $var is not set"
        exit 1
    fi
done

# Set environment (default to development)
ENVIRONMENT=${1:-development}
CONFIG_FILE="coolify.${ENVIRONMENT}.json"

if [ ! -f "$CONFIG_FILE" ]; then
    log "Error: Configuration file $CONFIG_FILE not found"
    exit 1
fi

# Install Coolify CLI if not already installed
if ! command -v coolify &> /dev/null; then
    log "Installing Coolify CLI..."
    curl -s https://get.coolify.io | bash || {
        log "Error: Failed to install Coolify CLI"
        exit 1
    }
fi

# Login to Coolify
log "Logging in to Coolify..."
coolify login --token "$COOLIFY_TOKEN" || {
    log "Error: Failed to login to Coolify"
    exit 1
}

# Deploy the application
log "Deploying application to $ENVIRONMENT environment..."
coolify deploy \
    --project "$COOLIFY_PROJECT_ID" \
    --environment "$ENVIRONMENT" \
    --config "$CONFIG_FILE" || {
    log "Error: Deployment failed"
    exit 1
}

log "Deployment completed successfully!" 