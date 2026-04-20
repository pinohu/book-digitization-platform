# Deployment script for AI-OS using Coolify
[CmdletBinding()]
param (
    [Parameter()]
    [string]$Environment = "development"
)

# Enable strict mode
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-ColorOutput {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Message,
        
        [Parameter(Mandatory = $true)]
        [string]$Color
    )
    
    $previousColor = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $Color
    Write-Output $Message
    $host.UI.RawUI.ForegroundColor = $previousColor
}

function Test-RequiredEnvVars {
    $requiredVars = @(
        "COOLIFY_TOKEN",
        "COOLIFY_PROJECT_ID",
        "NEXT_PUBLIC_API_URL"
    )
    
    $missingVars = @()
    foreach ($var in $requiredVars) {
        if (-not (Get-Item "env:$var" -ErrorAction SilentlyContinue)) {
            $missingVars += $var
        }
    }
    
    if ($missingVars.Count -gt 0) {
        throw "Missing required environment variables: $($missingVars -join ', ')"
    }
}

function Install-CoolifyCliIfNeeded {
    try {
        $null = Get-Command coolify -ErrorAction Stop
        Write-ColorOutput "Coolify CLI is already installed" "Green"
    }
    catch {
        Write-ColorOutput "Installing Coolify CLI..." "Yellow"
        Invoke-Expression "& {$(Invoke-RestMethod https://get.coolify.io)} -Version latest"
        
        if (-not $?) {
            throw "Failed to install Coolify CLI"
        }
        
        Write-ColorOutput "Coolify CLI installed successfully" "Green"
    }
}

function Deploy-Application {
    param (
        [string]$Environment
    )
    
    try {
        Write-ColorOutput "Logging in to Coolify..." "Yellow"
        coolify login --token $env:COOLIFY_TOKEN
        
        if (-not $?) {
            throw "Failed to log in to Coolify"
        }
        
        Write-ColorOutput "Deploying to $Environment environment..." "Yellow"
        coolify deploy `
            --project $env:COOLIFY_PROJECT_ID `
            --environment $Environment `
            --config "coolify.$Environment.json"
        
        if (-not $?) {
            throw "Deployment failed"
        }
        
        Write-ColorOutput "Deployment completed successfully" "Green"
    }
    catch {
        throw "Deployment error: $($_.Exception.Message)"
    }
}

try {
    Write-ColorOutput "Starting deployment process..." "Yellow"
    Test-RequiredEnvVars
    Install-CoolifyCliIfNeeded
    Deploy-Application -Environment $Environment
    Write-ColorOutput "Deployment process completed" "Green"
    exit 0
}
catch {
    Write-ColorOutput "Error: $($_.Exception.Message)" "Red"
    exit 1
}
} 