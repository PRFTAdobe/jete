import path from 'path';
import { push } from 'aemsync';

const directoryName = process.cwd();
const clientLibRoot = path.join(
  directoryName,
  '..',
  'ui.apps',
  'src',
  'main',
  'content',
  'jcr_root',
  'apps',
  'jete',
  'clientlibs',
);

const aemSyncPush = async () => {
  const args = { payload: [path.join(clientLibRoot, 'clientlib-site')] };
  const result = (await push(args).next()).value;
  console.log(result);
};

aemSyncPush().then(() => {
  console.log('aem sync has finished');
});
