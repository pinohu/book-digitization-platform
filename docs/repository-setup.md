# Repository Setup Guide

## Branch Protection Rules

To set up branch protection rules for the `main` branch:

1. Go to the repository settings
2. Navigate to "Branches" under "Code and automation"
3. Click "Add branch protection rule"
4. Configure the following settings:

### Main Branch Protection
- Branch name pattern: `main`
- Require a pull request before merging
  - Require approvals (2)
  - Dismiss stale pull request approvals when new commits are pushed
  - Require review from Code Owners
- Require status checks to pass before merging
  - Require branches to be up to date before merging
  - Required status checks:
    - validate (GitHub Actions)
    - build (GitHub Actions)
- Require conversation resolution before merging
- Do not allow bypassing the above settings

### Development Branch Protection
- Branch name pattern: `develop`
- Require a pull request before merging
  - Require approvals (1)
- Require status checks to pass before merging
  - Required status checks:
    - validate (GitHub Actions)

## Repository Settings

### General
- Enable the following features:
  - Wikis
  - Issues
  - Projects
  - Allow forking
  - Discussions

### Pull Requests
- Enable the following settings:
  - Always suggest updating pull request branches
  - Allow auto-merge
  - Automatically delete head branches

### Actions Settings
- Allow all actions and reusable workflows
- Enable required reviewers for workflows from outside collaborators

## Security

### Code Security and Analysis
- Enable the following:
  - Dependabot alerts
  - Dependabot security updates
  - Code scanning
  - Secret scanning 