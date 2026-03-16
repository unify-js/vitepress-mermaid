#!/usr/bin/env node

import url from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { intro, outro, text, isCancel } from '@clack/prompts';
import pc from 'picocolors';
import packageConfig from '../package.json' with { type: 'json' };

// ==================== 纯逻辑层 ====================

export const SKIP_DIRS = ['node_modules', 'dist', 'cache'];

export class UserCancelError extends Error {
  constructor() {
    super('Operation cancelled');
    this.name = 'UserCancelError';
  }
}

export function validateProjectName(name: string): string | undefined {
  if (!name) return 'Project name is required';
  if (!/^[a-z0-9-_.]+$/i.test(name)) {
    return 'Project name can only contain letters, numbers, hyphens, underscores, and dots';
  }
  return undefined;
}

// ==================== 业务逻辑层 ====================

export interface ProjectCreatorOptions {
  templateDir: string;
}

export class ProjectCreator {
  private templateDir: string;

  constructor(options: ProjectCreatorOptions) {
    this.templateDir = options.templateDir;
  }

  create(projectName: string, targetDir: string): void {
    // Check if directory exists
    if (fs.existsSync(targetDir)) {
      throw new Error(`Directory "${projectName}" already exists`);
    }

    // Create target directory
    fs.mkdirSync(targetDir, { recursive: true });

    // Copy template
    this.copyDir(this.templateDir, targetDir);

    // Rename _gitignore to .gitignore
    this.renameGitignore(targetDir);

    // Update package.json name
    this.updatePackageJson(targetDir, projectName);
  }

  private copyDir(src: string, dest: string): void {
    fs.mkdirSync(dest, { recursive: true });

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.resolve(src, entry.name);
      const destPath = path.resolve(dest, entry.name);

      if (entry.isDirectory()) {
        if (SKIP_DIRS.includes(entry.name)) {
          continue;
        }
        this.copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  private renameGitignore(targetDir: string): void {
    const gitignorePath = path.resolve(targetDir, '_gitignore');
    if (fs.existsSync(gitignorePath)) {
      const newGitignorePath = path.resolve(targetDir, '.gitignore');
      fs.copyFileSync(gitignorePath, newGitignorePath);
      fs.unlinkSync(gitignorePath);
    }
  }

  private updatePackageJson(targetDir: string, projectName: string): void {
    const pkgPath = path.resolve(targetDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const content = fs.readFileSync(pkgPath, 'utf-8');
      const pkg = JSON.parse(content);
      pkg.name = projectName;
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    }
  }
}

// ==================== CLI 层 ====================

export async function promptForProjectName(): Promise<string> {
  const projectName = await text({
    message: 'Project name:',
    placeholder: 'my-docs',
    validate: validateProjectName,
  });

  if (isCancel(projectName)) {
    throw new UserCancelError();
  }

  return projectName;
}

export function printNextSteps(projectName: string): void {
  console.log(pc.dim('Next steps:'));
  console.log(pc.cyan(`  cd ${projectName}`));
  console.log(pc.cyan(`  npm install  ${pc.dim('# alternatively: pnpm install, yarn')}`));
  console.log(pc.cyan(`  npm run dev  ${pc.dim('# alternatively: pnpm dev, yarn dev')}\n`));
}

export async function main(): Promise<void> {
  intro(pc.bgCyan(pc.black(` create-vitepress-mermaid v${packageConfig.version} `)));

  const projectName = await promptForProjectName();
  const cwd = process.cwd();
  const targetDir = path.resolve(cwd, projectName);

  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templateDir = path.resolve(__dirname, '../template');

  const creator = new ProjectCreator({ templateDir });
  creator.create(projectName, targetDir);

  outro(pc.green(`Project "${projectName}" created successfully!\n`));
  printNextSteps(projectName);
}

// Only run if this is the main module
if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    if (error instanceof UserCancelError) {
      outro(pc.yellow(error.message));
      process.exit(0);
    }
    console.error(pc.red(`\nError: ${error.message}`));
    process.exit(1);
  });
}
