# Deployment Guide

## Overview

This document provides detailed instructions for deploying the AI-OS application using Coolify. The deployment process is automated through GitHub Actions and supports both development and production environments.

## Prerequisites

1. **Coolify Account**
   - Sign up at [Coolify](https://coolify.io)
   - Create a new project
   - Generate an API token

2. **GitHub Repository Setup**
   - Fork/clone the repository
   - Configure GitHub Actions
   - Add required secrets

3. **Domain Configuration**
   - Register a domain
   - Configure DNS settings
   - Set up SSL certificates

## Environment Setup

### Development Environment

1. **Local Setup**
   ```bash
   # Install dependencies
   npm install

   # Create development environment
   ./scripts/setup-coolify.sh
   ```

2. **Environment Variables**
   - `NODE_ENV`: development
   - `NEXT_PUBLIC_API_URL`: http://localhost:3000/api
   - `DATABASE_URL`: Your development database URL
   - `NEXTAUTH_URL`: http://localhost:3000
   - `COOLIFY_TOKEN`: Your Coolify API token
   - `COOLIFY_PROJECT_ID`: Your Coolify project ID

### Production Environment

1. **Environment Variables**
   - `NODE_ENV`: production
   - `NEXT_PUBLIC_API_URL`: Your production API URL
   - `DATABASE_URL`: Your production database URL
   - `NEXTAUTH_URL`: https://your-domain.com
   - `COOLIFY_TOKEN`: Your Coolify API token
   - `COOLIFY_PROJECT_ID`: Your Coolify project ID
   - `DOMAIN`: Your production domain

2. **GitHub Secrets**
   Add all production environment variables as GitHub secrets.

## Deployment Process

### Development Deployment

1. **Initial Setup**
   ```bash
   # Run setup script
   ./scripts/setup-coolify.sh
   ```

2. **Deploy**
   ```bash
   # Deploy to development
   ./scripts/deploy.sh development
   ```

3. **Verify**
   - Check Coolify dashboard
   - Verify application is running
   - Test endpoints

### Production Deployment

1. **Automated Deployment**
   - Push to main branch
   - GitHub Actions will:
     - Run tests
     - Build application
     - Deploy to production

2. **Manual Deployment**
   ```bash
   # Deploy to production
   ./scripts/deploy.sh production
   ```

3. **Verification**
   - Monitor GitHub Actions
   - Check Coolify dashboard
   - Verify SSL certificates
   - Test production endpoints

## Configuration

### Development Configuration (`coolify.dev.json`)
```json
{
  "name": "ai-os-dev",
  "type": "node",
  "build": {
    "command": "npm run build",
    "output": ".next"
  },
  "start": {
    "command": "npm run dev",
    "port": 3000
  },
  "resources": {
    "cpu": "0.2",
    "memory": "256Mi"
  }
}
```

### Production Configuration (`coolify.json`)
```json
{
  "name": "ai-os",
  "type": "node",
  "build": {
    "command": "npm run build",
    "output": ".next"
  },
  "start": {
    "command": "npm run start",
    "port": 3000
  },
  "scaling": {
    "min": 1,
    "max": 3,
    "auto": true
  },
  "resources": {
    "cpu": "0.5",
    "memory": "512Mi"
  }
}
```

## Monitoring & Maintenance

### Health Checks
- Path: `/`
- Interval: 30 seconds
- Timeout: 5 seconds
- Max retries: 3

### Metrics
- CPU usage
- Memory usage
- Network traffic
- Response times

### Logs
- Application logs
- Build logs
- Deployment logs
- Error tracking

### Backups
- Daily backups
- 7-day retention
- Automated restoration

## Troubleshooting

### Common Issues

1. **Deployment Failures**
   - Check build logs
   - Verify environment variables
   - Check resource limits

2. **Health Check Failures**
   - Verify application startup
   - Check database connection
   - Monitor resource usage

3. **SSL Issues**
   - Verify DNS configuration
   - Check SSL certificate status
   - Validate domain ownership

### Debug Commands

```bash
# Check deployment status
coolify status --project $COOLIFY_PROJECT_ID

# View logs
coolify logs --project $COOLIFY_PROJECT_ID

# Restart application
coolify restart --project $COOLIFY_PROJECT_ID
```

## Security

1. **Environment Variables**
   - Use GitHub secrets
   - Rotate API tokens
   - Secure database credentials

2. **Access Control**
   - Limit Coolify access
   - Use role-based permissions
   - Enable 2FA

3. **Network Security**
   - Enable HTTPS only
   - Configure CORS
   - Set up firewalls

## Best Practices

1. **Deployment**
   - Use semantic versioning
   - Tag releases
   - Document changes

2. **Monitoring**
   - Set up alerts
   - Monitor resource usage
   - Track error rates

3. **Maintenance**
   - Regular updates
   - Security patches
   - Performance optimization

## Support

For additional support:
1. Check [Coolify Documentation](https://coolify.io/docs)
2. Open GitHub issues
3. Contact the development team 