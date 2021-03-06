
import { Storage } from 'remix-lib'

/*
  Migrating the files to the BrowserFS storage instead or raw localstorage
*/
export default (fileProvider) => {
  const fileStorage = new Storage('sol:')
  if (fileStorage.keys().length === 0) return
  fileStorage.keys().forEach((path) => {
    if (path !== '.remix.config') {
      const content = fileStorage.get(path)
      fileProvider.set(path, content)
      fileStorage.remove(path)
      console.log('file migrated', path)
    }
  })
}
