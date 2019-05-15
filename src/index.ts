import { Command, flags } from '@oclif/command';
import chalk from 'chalk';
import * as inquirer from 'inquirer';
import * as ora from 'ora';

import {
  checkFolderExist,
  checkIsGitRepo,
  checkYarnExist,
  checkYarnUseDefaultRegistry,
  createGitRepo,
  installPackagesByYarn,
  resolvePath,
  syncFolder,
  updatePackageInfo
} from './utils';

class CreatePardjsModule extends Command {
  static description = '🔦 Create pardjs module CLI scaffold';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' })
  };

  static args = [{ name: 'name' }];

  async run() {
    const { args } = this.parse(CreatePardjsModule);
    const { name } = args;
    const targetPath = resolvePath('../', name);

    await ensureTargetFolderSafeToWrite(targetPath);
    initProjectFolder(targetPath);
    updateDoztoPackageInfo(targetPath, buildPackageInfo(name));
    await installPackages(targetPath);
    initGitRepo(targetPath);
    showCompleteInfo(name, targetPath);
  }
}

export = CreatePardjsModule;

const ensureTargetFolderSafeToWrite = async (
  targetPath: string
): Promise<void> => {
  const isTargetFolderExist = checkFolderExist(targetPath);

  if (isTargetFolderExist) {
    const { overwrite }: { overwrite: boolean } = await inquirer.prompt([
      {
        type: 'confirm',
        message: `Target folder [${chalk.cyan(
          targetPath
        )}] already exist, \n do you want to continue with overwrite it?`,
        default: true,
        name: 'overwrite'
      }
    ]);

    if (overwrite) return;
    process.exit(0);
  }
};

const buildPackageInfo = (projectName: string): object => ({
  name: projectName
});

const initProjectFolder = (targetPath: string): void => {
  const templatePath = './template';
  const spinner = ora('Initialize pardjs module template').start();

  try {
    syncFolder(resolvePath(templatePath), targetPath);
    spinner.succeed();
  } catch (error) {
    spinner.fail();
    console.error(error);
    process.exit(1);
  }

  return;
};

const updateDoztoPackageInfo = (
  targetPath: string,
  updateInfo: object
): void => {
  const spinner = ora('Update package.json info').start();

  try {
    updatePackageInfo(targetPath, updateInfo);
    spinner.succeed();
  } catch {
    spinner.warn('Failed to update package.json info, continued.');
    return;
  }
};

const installPackages = async (targetPath: string): Promise<void> => {
  const spinner = ora('Install packages by Yarn').start();

  try {
    checkYarnExist();
    const isDefaultRegistry = checkYarnUseDefaultRegistry();

    await installPackagesByYarn(targetPath);

    if (!isDefaultRegistry) {
      spinner.warn('Yarn used unofficial registry, continued.');
    } else {
      spinner.succeed();
    }
  } catch (error) {
    spinner.fail();
    console.error(error);
    process.exit(1);
  }
};

const initGitRepo = (targetPath: string): void => {
  const spinner = ora('Install git repo').start();

  try {
    const isGitRepo = checkIsGitRepo(targetPath);

    if (isGitRepo) {
      spinner.warn('Is a git repo already. ignored.');
      return;
    } else {
      createGitRepo(targetPath);
      spinner.succeed();
    }
  } catch (error) {
    spinner.fail();
    console.error(error);
    process.exit(1);
  }
};

const showCompleteInfo = (name: string, targetPath: string): void => {
  console.info();
  console.info(
    `Success! Created ${chalk.yellow(name)} at ${chalk.yellow(targetPath)}`
  );
  console.info('Inside that directory, you can run several commands:');
  console.info();
  console.info(chalk.cyan(`  yarn start:dev`));
  console.info('    Starts the development server.');
  console.info();
  console.info(chalk.cyan(`  yarn build`));
  console.info('    Bundles the app into commonJs files for production.');
  console.info();
  console.info(chalk.cyan(`  yarn test`));
  console.info('    Starts the test runner.');
  console.info();
  console.info(chalk.cyan(`  yarn test:watch`));
  console.info('    Starts the test watcher.');
  console.info();
  console.info('We suggest that you begin by typing:');
  console.info();
  console.info(chalk.cyan(`  cd ${name}`));
  console.info(chalk.cyan(`  yarn test:watch & yarn start:dev`));
  console.info(`  `);
  console.info();
  console.info(chalk.blue('Have a nice day!'));
  console.info();
  console.info('🐦  灵景现神州 鹞子经天飞  🦅');
};
