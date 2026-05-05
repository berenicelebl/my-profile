#Requires -Version 5.1
<#
.SYNOPSIS
    Packages the FireGear Inventory System source files into an importable
    Power Platform solution ZIP.

.DESCRIPTION
    This script uses the Power Platform CLI (pac) to:
      1. Pack the Canvas App source (YAML) into a .msapp binary.
      2. Pack the entire solution directory into a solution ZIP.
    The resulting ZIP can be imported at make.powerapps.com or via pac solution import.

.PREREQUISITES
    - Power Platform CLI (pac)  →  https://aka.ms/PowerAppsCLI
    - PowerShell 5.1+ or PowerShell 7+

.USAGE
    cd FireGear-Solution
    .\build.ps1

    # To import directly after building:
    .\build.ps1 -Import -EnvironmentUrl "https://yourorg.crm.dynamics.com"
#>

param(
    [switch]$Import,
    [string]$EnvironmentUrl = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$SolutionDir  = $PSScriptRoot
$OutDir       = Join-Path $SolutionDir "dist"
$CanvasAppDir = Join-Path $SolutionDir "CanvasApps\FireGear_Mobile"
$MsAppPath    = Join-Path $SolutionDir "CanvasApps\FireGear_Mobile\FireGear_Mobile.msapp"
$SolutionZip  = Join-Path $OutDir "FireGearInventorySystem.zip"

# ─── 0. Verify pac CLI is available ─────────────────────────────────────────
if (-not (Get-Command pac -ErrorAction SilentlyContinue)) {
    Write-Error @"
Power Platform CLI (pac) not found.
Install it from: https://aka.ms/PowerAppsCLI
Then re-run this script.
"@
    exit 1
}

# ─── 1. Create output directory ──────────────────────────────────────────────
if (-not (Test-Path $OutDir)) {
    New-Item -ItemType Directory -Path $OutDir | Out-Null
}

# ─── 2. Pack Canvas App YAML → .msapp ────────────────────────────────────────
Write-Host "Packing Canvas App source → .msapp ..." -ForegroundColor Cyan
pac canvas pack `
    --sources "$CanvasAppDir\Src" `
    --msapp   "$MsAppPath"

if (-not (Test-Path $MsAppPath)) {
    Write-Error "Canvas pack failed — $MsAppPath was not created."
    exit 1
}
Write-Host "  Canvas app packed: $MsAppPath" -ForegroundColor Green

# ─── 3. Pack Solution directory → ZIP ────────────────────────────────────────
Write-Host "Packing Power Platform solution → ZIP ..." -ForegroundColor Cyan
pac solution pack `
    --zipfile "$SolutionZip" `
    --folder  "$SolutionDir" `
    --packagetype Unmanaged

if (-not (Test-Path $SolutionZip)) {
    Write-Error "Solution pack failed — $SolutionZip was not created."
    exit 1
}
Write-Host "  Solution ZIP created: $SolutionZip" -ForegroundColor Green

# ─── 4. (Optional) Import directly into an environment ──────────────────────
if ($Import) {
    if ([string]::IsNullOrEmpty($EnvironmentUrl)) {
        Write-Error "Provide -EnvironmentUrl when using -Import."
        exit 1
    }
    Write-Host "Importing solution into $EnvironmentUrl ..." -ForegroundColor Cyan
    pac solution import `
        --path           "$SolutionZip" `
        --environment    "$EnvironmentUrl" `
        --publish-changes `
        --force-overwrite
    Write-Host "  Import complete." -ForegroundColor Green
}

Write-Host ""
Write-Host "Done! Importable solution: $SolutionZip" -ForegroundColor Yellow
Write-Host ""
Write-Host "To import manually:" -ForegroundColor White
Write-Host "  1. Go to https://make.powerapps.com" -ForegroundColor Gray
Write-Host "  2. Select your environment (top-right)" -ForegroundColor Gray
Write-Host "  3. Solutions → Import Solution → Browse → select $SolutionZip" -ForegroundColor Gray
Write-Host "  4. Follow the import wizard and publish all customisations." -ForegroundColor Gray
