import { Command, flags } from '@oclif/command';
import chalk from 'chalk';
import * as inquirer from 'inquirer';
import * as ora from 'ora';

class CreatePardjsModule extends Command {
  static description = '🔦 Create pardjs module CLI scaffold';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' })
  };

  static args = [{ name: 'name' }];

  async run() {
    const { args, flags } = this.parse(CreatePardjsModule);
    const { name } = args;

    const spinner = ora('Loading unicorns').start();

    spinner.color = 'yellow';
    spinner.text = `>> Creating project scaffold for ${chalk.green(`${name}`)}`;

    spinner.succeed();

    const prompt: any = await inquirer.prompt([
      {
        type: 'input',
        message: 'Repo Name(@pardjs):',
        default: name,
        name: 'name'
      }
    ]);

    // this.log('>>> prompt', prompt);
  }
}

export = CreatePardjsModule;
