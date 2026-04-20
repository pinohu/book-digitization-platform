# PowerShell script to manage self-hosted Coolify instance

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet('start', 'stop', 'restart', 'status', 'logs', 'update', 'backup', 'restore')]
    [string]$Action,
    [string]$BackupFile
)

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

# Function to check Docker version and status
function Test-Docker {
    try {
        # Check if Docker is running
        docker info | Out-Null
        if ($LASTEXITCODE -ne 0) {
            Write-ColorOutput "Docker is not running. Please start Docker Desktop." "Red"
            return $false
        }

        # Get Docker version
        $version = docker version --format '{{.Server.Version}}'
        if ($version -match '^\d+\.\d+\.\d+') {
            $versionParts = $version.Split('.')
            $major = [int]$versionParts[0]
            $minor = [int]$versionParts[1]

            # Require Docker 20.10.0 or higher for Coolify
            if ($major -lt 20 -or ($major -eq 20 -and $minor -lt 10)) {
                Write-ColorOutput "Docker version $version is not supported. Please upgrade to Docker 20.10.0 or higher." "Red"
                return $false
            }

            Write-ColorOutput "Docker version $version is compatible" "Green"
            return $true
        }
        else {
            Write-ColorOutput "Could not determine Docker version" "Red"
            return $false
        }
    }
    catch {
        Write-ColorOutput "Error checking Docker: $($_.Exception.Message)" "Red"
        return $false
    }
}

# Function to check if Coolify is running
function Test-Coolify {
    $container = docker ps -q -f name=coolify
    return [bool]$container
}

# Function to get Coolify container logs
function Get-CoolifyLogs {
    param([int]$Lines = 100)
    docker logs --tail $Lines coolify
}

# Function to get Coolify data path
function Get-CoolifyDataPath {
    return "$env:USERPROFILE\.coolify"
}

# Function to backup Coolify data
function Backup-Coolify {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupDir = Join-Path (Get-Location) "coolify_backups"
    
    if (-not (Test-Path $backupDir)) {
        New-Item -ItemType Directory -Path $backupDir | Out-Null
    }
    
    $backupFile = Join-Path $backupDir "coolify_backup_${timestamp}.tar"
    $dataPath = Get-CoolifyDataPath
    
    if (-not (Test-Path $dataPath)) {
        Write-ColorOutput "Error: Coolify data directory not found at $dataPath" "Red"
        return
    }
    
    try {
        docker run --rm --volumes-from coolify -v "${backupDir}:/backup" alpine tar cvf "/backup/coolify_backup_${timestamp}.tar" /data
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "Backup created successfully at: $backupFile" "Green"
        }
        else {
            Write-ColorOutput "Error creating backup" "Red"
        }
    }
    catch {
        Write-ColorOutput "Error during backup: $($_.Exception.Message)" "Red"
    }
}

# Function to restore Coolify data
function Restore-Coolify {
    param([string]$BackupFile)
    
    $absoluteBackupPath = $null
    if ([System.IO.Path]::IsPathRooted($BackupFile)) {
        $absoluteBackupPath = $BackupFile
    }
    else {
        $absoluteBackupPath = Join-Path (Get-Location) $BackupFile
    }
    
    if (-not (Test-Path $absoluteBackupPath)) {
        Write-ColorOutput "Error: Backup file not found at $absoluteBackupPath" "Red"
        return
    }
    
    $backupDir = Split-Path $absoluteBackupPath -Parent
    $backupFileName = Split-Path $absoluteBackupPath -Leaf
    
    Write-ColorOutput "Stopping Coolify..." "Yellow"
    docker stop coolify
    
    Write-ColorOutput "Restoring data from backup..." "Yellow"
    try {
        docker run --rm --volumes-from coolify -v "${backupDir}:/backup" alpine sh -c "cd /data && tar xvf /backup/$backupFileName"
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "Data restored successfully" "Green"
        }
        else {
            Write-ColorOutput "Error restoring data" "Red"
            return
        }
    }
    catch {
        Write-ColorOutput "Error during restore: $($_.Exception.Message)" "Red"
        return
    }
    
    Write-ColorOutput "Starting Coolify..." "Yellow"
    docker start coolify
    
    # Verify container is running
    Start-Sleep -Seconds 5
    if (Test-Coolify) {
        Write-ColorOutput "Restore completed successfully" "Green"
    }
    else {
        Write-ColorOutput "Warning: Coolify container failed to start after restore" "Red"
    }
}

# Check if Docker is running
if (-not (Test-Docker)) {
    exit 1
}

# Execute requested action
switch ($Action) {
    'start' {
        if (Test-Coolify) {
            Write-ColorOutput "Coolify is already running" "Yellow"
        }
        else {
            Write-ColorOutput "Starting Coolify..." "Yellow"
            docker start coolify
            Write-ColorOutput "Coolify started successfully" "Green"
        }
    }
    'stop' {
        if (Test-Coolify) {
            Write-ColorOutput "Stopping Coolify..." "Yellow"
            docker stop coolify
            Write-ColorOutput "Coolify stopped successfully" "Green"
        }
        else {
            Write-ColorOutput "Coolify is not running" "Yellow"
        }
    }
    'restart' {
        if (Test-Coolify) {
            Write-ColorOutput "Restarting Coolify..." "Yellow"
            docker restart coolify
            Write-ColorOutput "Coolify restarted successfully" "Green"
        }
        else {
            Write-ColorOutput "Coolify is not running. Starting..." "Yellow"
            docker start coolify
            Write-ColorOutput "Coolify started successfully" "Green"
        }
    }
    'status' {
        if (Test-Coolify) {
            Write-ColorOutput "Coolify is running" "Green"
            docker ps -f name=coolify --format "table {{.ID}}\t{{.Status}}\t{{.Ports}}"
        }
        else {
            Write-ColorOutput "Coolify is not running" "Red"
        }
    }
    'logs' {
        if (Test-Coolify) {
            Get-CoolifyLogs
        }
        else {
            Write-ColorOutput "Coolify is not running" "Red"
        }
    }
    'update' {
        Write-ColorOutput "Updating Coolify..." "Yellow"
        if (Test-Coolify) {
            docker stop coolify
        }
        docker pull coollabsio/coolify:latest
        docker start coolify
        Write-ColorOutput "Coolify updated successfully" "Green"
    }
    'backup' {
        if (Test-Coolify) {
            Backup-Coolify
        }
        else {
            Write-ColorOutput "Coolify is not running" "Red"
        }
    }
    'restore' {
        if (-not $BackupFile) {
            Write-ColorOutput "Please specify a backup file to restore from" "Red"
            exit 1
        }
        Restore-Coolify -BackupFile $BackupFile
    }
} 