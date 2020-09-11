import handlebars from 'handlebars';
import fs from 'fs';

export interface TemplateVariables {
  [key: string]: string | number;
}

interface ParseMailTemplateDTO {
  file: string;
  variables: TemplateVariables;
}

class HandlebarsMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: ParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
