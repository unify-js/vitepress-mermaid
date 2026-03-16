import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fs as memfs, vol } from 'memfs';
import { validateProjectName, UserCancelError, SKIP_DIRS, ProjectCreator } from './cli.js';

// Mock node:fs with memfs
vi.mock('node:fs', () => ({
  default: memfs,
  ...memfs,
}));

// ==================== 纯逻辑层测试 ====================

describe('validateProjectName', () => {
  it('should return error for empty value', () => {
    expect(validateProjectName('')).toBe('Project name is required');
  });

  it('should return error for invalid characters', () => {
    expect(validateProjectName('invalid@name')).toBe(
      'Project name can only contain letters, numbers, hyphens, underscores, and dots'
    );
    expect(validateProjectName('name with space')).toBe(
      'Project name can only contain letters, numbers, hyphens, underscores, and dots'
    );
    expect(validateProjectName('name/slash')).toBe(
      'Project name can only contain letters, numbers, hyphens, underscores, and dots'
    );
  });

  it('should return undefined for valid names', () => {
    expect(validateProjectName('my-project')).toBeUndefined();
    expect(validateProjectName('my_project')).toBeUndefined();
    expect(validateProjectName('my.project')).toBeUndefined();
    expect(validateProjectName('project123')).toBeUndefined();
    expect(validateProjectName('MyProject')).toBeUndefined();
  });
});

describe('UserCancelError', () => {
  it('should create error with correct name and message', () => {
    const error = new UserCancelError();
    expect(error.name).toBe('UserCancelError');
    expect(error.message).toBe('Operation cancelled');
  });
});

describe('SKIP_DIRS', () => {
  it('should include node_modules, dist, and cache', () => {
    expect(SKIP_DIRS).toEqual(['node_modules', 'dist', 'cache']);
  });
});

// ==================== ProjectCreator 测试 ====================

describe('ProjectCreator', () => {
  let creator: ProjectCreator;

  beforeEach(() => {
    vol.reset(); // Clear memory fs before each test
    creator = new ProjectCreator({ templateDir: '/template' });
  });

  describe('create', () => {
    it('should throw error when target directory exists', () => {
      memfs.mkdirSync('/existing', { recursive: true });
      expect(() => creator.create('existing', '/existing')).toThrow(
        'Directory "existing" already exists'
      );
    });

    it('should create project from template', () => {
      // Setup template files
      memfs.mkdirSync('/template', { recursive: true });
      memfs.writeFileSync('/template/package.json', JSON.stringify({ name: 'template' }));
      memfs.writeFileSync('/template/_gitignore', 'node_modules\n');

      // Create project
      creator.create('my-project', '/output/my-project');

      // Verify
      expect(memfs.existsSync('/output/my-project')).toBe(true);
      expect(memfs.readFileSync('/output/my-project/package.json', 'utf-8')).toContain(
        '"name": "my-project"'
      );
      expect(memfs.existsSync('/output/my-project/.gitignore')).toBe(true);
      expect(memfs.existsSync('/output/my-project/_gitignore')).toBe(false);
    });

    it('should skip directories in SKIP_DIRS', () => {
      // Setup template with skip directories
      memfs.mkdirSync('/template', { recursive: true });
      memfs.mkdirSync('/template/node_modules', { recursive: true });
      memfs.writeFileSync('/template/node_modules/pkg.json', '{}');
      memfs.writeFileSync('/template/package.json', '{}');

      // Create project
      creator.create('my-project', '/output/my-project');

      // Verify skip directories are not copied
      expect(memfs.existsSync('/output/my-project/package.json')).toBe(true);
      expect(memfs.existsSync('/output/my-project/node_modules')).toBe(false);
    });

    it('should copy nested directories', () => {
      // Setup template with nested structure
      memfs.mkdirSync('/template/docs', { recursive: true });
      memfs.writeFileSync('/template/docs/readme.md', '# Docs');
      memfs.writeFileSync('/template/package.json', '{}');

      // Create project
      creator.create('my-project', '/output/my-project');

      // Verify nested structure
      expect(memfs.readFileSync('/output/my-project/docs/readme.md', 'utf-8')).toBe('# Docs');
    });
  });
});
