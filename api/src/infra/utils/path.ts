import fg from 'fast-glob'
import path from 'path'

export function resolvePath(...pathSegments: string[]): string {
  return path.resolve(...pathSegments).replace(new RegExp('\\' + path.sep, 'g'), '/')
}

export default async function readFilesFromPath<TFile>(
  filePaths: Array<string>,
): Promise<Array<{ name: string; file: TFile; group: any }>> {
  const getFileName = (filePath: string) => `${filePath.match(/\w+\.[jt]s$/g)?.[0]}`.replace(/\.[jt]s/, '')
  const getGroupName = (filePath: string) => `${filePath.split('http/controllers/')[1]}`.split('/')[0]
  const paths = fg.sync(resolvePath(...filePaths))

  return Promise.all(
    paths.map(async (filePath) => ({
      group: getGroupName(filePath),
      file: (await import(`${filePath}`)).default as TFile,
      name: getFileName(filePath),
    })),
  )
}
