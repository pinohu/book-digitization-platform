# Function to write colored output
function Write-ColorOutput {
    param(
        [Parameter(Mandatory)]
        [string]$Message,
        [Parameter(Mandatory)]
        [string]$Color
    )
    $prevColor = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $Color
    Write-Output $Message
    $host.UI.RawUI.ForegroundColor = $prevColor
}

# Function to install Docker Desktop
function Install-DockerDesktop {
    Write-ColorOutput "Docker Desktop is not installed. Installing..." "Yellow"
    
    # Download Docker Desktop Installer
    $dockerUrl = "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe"
    $installerPath = "$env:TEMP\DockerDesktopInstaller.exe"
    
    try {
        Write-ColorOutput "Downloading Docker Desktop..." "Yellow"
        Invoke-WebRequest -Uri $dockerUrl -OutFile $installerPath
        
        Write-ColorOutput "Installing Docker Desktop..." "Yellow"
        Start-Process -Wait -FilePath $installerPath -ArgumentList "install --quiet"
        
        Write-ColorOutput "Docker Desktop installed successfully" "Green"
        Write-ColorOutput "Please restart your computer to complete the installation" "Yellow"
        Write-ColorOutput "After restart, run this script again to continue with Coolify installation" "Yellow"
        
        # Clean up installer
        Remove-Item $installerPath
        
        exit 0
    }
    catch {
        Write-ColorOutput "Error installing Docker Desktop: $_" "Red"
        Write-ColorOutput "Please install Docker Desktop manually from https://www.docker.com/products/docker-desktop" "Yellow"
        exit 1
    }
}

# Function to check if WSL 2 is installed and enabled
function Test-WSL2 {
    try {
        # Check if WSL is installed
        $wslFeature = Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
        if ($wslFeature.State -ne "Enabled") {
            Write-ColorOutput "WSL is not installed" "Yellow"
            return $false
        }

        # Check if Virtual Machine Platform is enabled
        $vmFeature = Get-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
        if ($vmFeature.State -ne "Enabled") {
            Write-ColorOutput "Virtual Machine Platform is not enabled" "Yellow"
            return $false
        }

        # Check WSL version
        $wslOutput = wsl --status 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-ColorOutput "WSL is not properly configured" "Yellow"
            return $false
        }

        if ($wslOutput -match "Default Version: 2") {
            Write-ColorOutput "WSL 2 is properly configured" "Green"
            return $true
        }
        else {
            Write-ColorOutput "WSL 2 is not set as default" "Yellow"
            return $false
        }
    }
    catch {
        Write-ColorOutput "Error checking WSL 2 status: $($_.Exception.Message)" "Red"
        return $false
    }
}

# Function to install WSL 2
function Install-WSL2 {
    Write-ColorOutput "Installing WSL 2..." "Yellow"
    try {
        # Enable WSL feature
        dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
        dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
        
        # Download WSL2 kernel update
        $wslUrl = "https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi"
        $wslInstallerPath = "$env:TEMP\wsl_update_x64.msi"
        Invoke-WebRequest -Uri $wslUrl -OutFile $wslInstallerPath
        
        # Install WSL2 kernel update
        Start-Process -Wait msiexec.exe -ArgumentList "/i $wslInstallerPath /quiet"
        
        # Set WSL 2 as default
        wsl --set-default-version 2
        
        Write-ColorOutput "WSL 2 installed successfully" "Green"
        Write-ColorOutput "Please restart your computer to complete the installation" "Yellow"
        
        # Clean up installer
        Remove-Item $wslInstallerPath
        
        exit 0
    }
    catch {
        Write-ColorOutput "Error installing WSL 2: $_" "Red"
        Write-ColorOutput "Please install WSL 2 manually: https://docs.microsoft.com/en-us/windows/wsl/install" "Yellow"
        exit 1
    }
}

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-ColorOutput "This script requires administrator privileges. Please run as administrator." "Red"
    exit 1
}

# Check WSL 2
if (-not (Test-WSL2)) {
    Write-ColorOutput "WSL 2 is required for Docker Desktop" "Yellow"
    Install-WSL2
}

# Check if Docker is installed
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Install-DockerDesktop
}

# Check if Docker is running
try {
    docker info | Out-Null
}
catch {
    Write-ColorOutput "Docker is installed but not running. Please start Docker Desktop and run this script again." "Yellow"
    exit 1
}

# Install Coolify
Write-ColorOutput "Installing Coolify..." "Yellow"

# Create data directory
$dataPath = "$env:USERPROFILE\.coolify"
if (-not (Test-Path $dataPath)) {
    New-Item -ItemType Directory -Path $dataPath | Out-Null
}

# Pull Coolify image
try {
    Write-ColorOutput "Pulling Coolify image..." "Yellow"
    docker pull coollabsio/coolify:latest

    # Stop existing container if running
    $existingContainer = docker ps -aq -f name=coolify
    if ($existingContainer) {
        Write-ColorOutput "Stopping existing Coolify container..." "Yellow"
        docker stop coolify
        docker rm coolify
    }

    # Start Coolify container
    Write-ColorOutput "Starting Coolify container..." "Yellow"
    docker run -d `
        --name coolify `
        --restart always `
        -p 3000:3000 `
        -v /var/run/docker.sock:/var/run/docker.sock `
        -v ${dataPath}:/data `
        -e COOLIFY_DATABASE_URL="file:/data/db.sqlite" `
        -e COOLIFY_SECRET_KEY="$(New-Guid)" `
        coollabsio/coolify:latest

    # Wait for container to start
    Start-Sleep -Seconds 10

    # Check if container is running
    $containerStatus = docker ps -f name=coolify --format "{{.Status}}"
    if ($containerStatus -match "Up") {
        Write-ColorOutput "Coolify installed successfully!" "Green"
        Write-ColorOutput "Access your Coolify instance at: http://localhost:3000" "Green"
        Write-ColorOutput "Complete the setup by:" "Yellow"
        Write-ColorOutput "1. Open the URL in your browser" "White"
        Write-ColorOutput "2. Create your admin account" "White"
        Write-ColorOutput "3. Configure your deployment settings" "White"
    }
    else {
        Write-ColorOutput "Error: Coolify container failed to start" "Red"
        Write-ColorOutput "Check logs with: docker logs coolify" "Yellow"
        exit 1
    }
}
catch {
    Write-ColorOutput "Error installing Coolify: $($_.Exception.Message)" "Red"
    exit 1
} 