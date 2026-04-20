import { BaseAgent, AgentConfig } from '../base-agent';
import { Memory } from '../memory';
import { Docker } from 'dockerode';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class OpsAgent extends BaseAgent {
  private docker: Docker;

  constructor(config: AgentConfig) {
    super(config);
    this.docker = new Docker();
  }

  async initialize(): Promise<void> {
    await this.setupMemory();
    await this.loadTools();
  }

  async execute(input: any): Promise<any> {
    try {
      if (!await this.validateInput(input)) {
        throw new Error('Invalid input');
      }

      const { action, params } = input;

      switch (action) {
        case 'deploy':
          return await this.handleDeploy(params);
        case 'scale':
          return await this.handleScale(params);
        case 'monitor':
          return await this.handleMonitor(params);
        default:
          throw new Error(`Unknown action: ${action}`);
      }
    } catch (error) {
      await this.handleError(error as Error);
      throw error;
    }
  }

  private async handleDeploy(params: any): Promise<any> {
    const { service, version } = params;
    
    // Deploy using Docker
    const container = await this.docker.createContainer({
      Image: `${service}:${version}`,
      name: service,
    });

    await container.start();
    
    // Store deployment info in memory
    await this.memory.storeVector('deployments', [], {
      service,
      version,
      timestamp: new Date().toISOString(),
      status: 'deployed'
    });

    return {
      status: 'success',
      message: `Deployed ${service}:${version}`
    };
  }

  private async handleScale(params: any): Promise<any> {
    const { service, replicas } = params;
    
    // Scale using Docker
    const containers = await this.docker.listContainers({
      filters: { name: [service] }
    });

    if (containers.length < replicas) {
      // Scale up
      for (let i = containers.length; i < replicas; i++) {
        const container = await this.docker.createContainer({
          Image: service,
          name: `${service}-${i}`
        });
        await container.start();
      }
    } else if (containers.length > replicas) {
      // Scale down
      for (let i = replicas; i < containers.length; i++) {
        const container = this.docker.getContainer(containers[i].Id);
        await container.stop();
        await container.remove();
      }
    }

    return {
      status: 'success',
      message: `Scaled ${service} to ${replicas} replicas`
    };
  }

  private async handleMonitor(params: any): Promise<any> {
    const { service } = params;
    
    // Get container stats
    const containers = await this.docker.listContainers({
      filters: { name: [service] }
    });

    const stats = await Promise.all(
      containers.map(async (container) => {
        const stats = await this.docker.getContainer(container.Id).stats();
        return {
          id: container.Id,
          name: container.Names[0],
          status: container.Status,
          stats
        };
      })
    );

    return {
      status: 'success',
      data: stats
    };
  }
} 