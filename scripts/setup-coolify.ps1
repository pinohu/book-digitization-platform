# Function to log messages
function Write-Log {
    param([string]$Message)
    Write-Host "[$([DateTime]::Now.ToString('yyyy-MM-dd HH:mm:ss'))] $Message"
}

# Function to prompt for input with a default value
function Read-InputWithDefault {
    param(
        [string]$Prompt,
        [string]$Default
    )
    Write-Host "$Prompt [$Default]: " -NoNewline
    $value = Read-Host
    if ([string]::IsNullOrWhiteSpace($value)) {
        return $Default
    }
    return $value
}

# Check if Coolify is running locally
Write-Log "Checking for local Coolify instance..."
$coolifyContainer = docker ps -q -f name=coolify
if (-not $coolifyContainer) {
    Write-Log "Local Coolify instance not found. Would you like to install it? (y/n)"
    $install = Read-Host
    if ($install -eq 'y') {
        Write-Log "Installing local Coolify instance..."
        try {
            & .\scripts\install-coolify-server.ps1
        }
        catch {
            Write-Log "Error: Failed to install local Coolify instance"
            exit 1
        }
    }
}

# Prompt for configuration values
Write-Log "Please provide the following configuration values:"
$COOLIFY_HOST = Read-InputWithDefault "Coolify Host URL (local or remote)" "http://localhost:3000"
$COOLIFY_TOKEN = Read-InputWithDefault "Coolify API Token" ""
$COOLIFY_PROJECT_ID = Read-InputWithDefault "Coolify Project ID" ""
$DOMAIN = Read-InputWithDefault "Domain" "localhost"
$NEXT_PUBLIC_API_URL = Read-InputWithDefault "API URL" "https://$DOMAIN/api"
$DATABASE_URL = Read-InputWithDefault "Database URL" "postgresql://postgres:postgres@localhost:5432/ai_os"

# Create development environment file
Write-Log "Creating development environment file..."
@"
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_os_dev
NEXTAUTH_URL=http://localhost:3000
COOLIFY_HOST=$COOLIFY_HOST
COOLIFY_TOKEN=$COOLIFY_TOKEN
COOLIFY_PROJECT_ID=$COOLIFY_PROJECT_ID
"@ | Set-Content -Path ".env.development"

# Create production environment file
Write-Log "Creating production environment file..."
@"
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
DATABASE_URL=$DATABASE_URL
NEXTAUTH_URL=https://$DOMAIN
COOLIFY_HOST=$COOLIFY_HOST
COOLIFY_TOKEN=$COOLIFY_TOKEN
COOLIFY_PROJECT_ID=$COOLIFY_PROJECT_ID
DOMAIN=$DOMAIN
"@ | Set-Content -Path ".env.production"

# Add environment variables to GitHub Actions secrets
Write-Log "Please add the following secrets to your GitHub repository:"
Write-Host "COOLIFY_HOST: $COOLIFY_HOST"
Write-Host "COOLIFY_TOKEN: $COOLIFY_TOKEN"
Write-Host "COOLIFY_PROJECT_ID: $COOLIFY_PROJECT_ID"
Write-Host "NEXT_PUBLIC_API_URL: $NEXT_PUBLIC_API_URL"
Write-Host "DOMAIN: $DOMAIN"
Write-Host "DATABASE_URL: $DATABASE_URL"

# Test Coolify connection
Write-Log "Testing Coolify connection..."
try {
    coolify login --token $COOLIFY_TOKEN --host $COOLIFY_HOST
}
catch {
    Write-Log "Error: Failed to login to Coolify"
    exit 1
}

# Create development environment
Write-Log "Creating development environment..."
try {
    .\scripts\deploy.ps1 development
}
catch {
    Write-Log "Error: Failed to create development environment"
    exit 1
}

Write-Log "Setup completed successfully!"
Write-Log "Next steps:"
Write-Log "1. Add the secrets to your GitHub repository"
Write-Log "2. Push your code to trigger the CI/CD pipeline"
Write-Log "3. Monitor the deployment in your Coolify dashboard at $COOLIFY_HOST" 