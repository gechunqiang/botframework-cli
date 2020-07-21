/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {Command, CLIError, flags} from '@microsoft/bf-cli-command';
import {Orchestrator, Utility} from '@microsoft/bf-orchestrator';
import {OrchestratorSettings} from '../../../utils/settings';

export default class OrchestratorNlrGet extends Command {
  static description: string = 'Gets Orchestrator model'

  static flags: flags.Input<any> = {
    model: flags.string({char: 'm', description: 'Path to Orchestrator model.'}),
    versionId: flags.string({description: 'Model version to download.'}),
    debug: flags.boolean({char: 'd'}),
    help: flags.help({char: 'h', description: 'Orchestrator nlr:get command help'}),
  }

  async run() {
    const {flags}: flags.Output = this.parse(OrchestratorNlrGet);
    const output: string = flags.model || __dirname;

    this.log(`hello ${flags.versionId}`);

    Utility.toPrintDebuggingLogToConsole = flags.debug;

    try {
      OrchestratorSettings.init(__dirname, output, '', __dirname);
      await Orchestrator.nlrGetAsync(OrchestratorSettings.ModelPath, flags.versionId);
    } catch (error) {
      throw (new CLIError(error));
    }

    return 0;
  }
}
