import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class handlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const template = await fs.promises.readFile(file, { encoding: 'utf-8' });
    console.log(template);
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
