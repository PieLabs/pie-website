import phenomicStatic from 'phenomic/lib/static';

import routes from '../src/routes.js';
import store from '../src/store.js';
import metadata from '../src/metadata.js';

export default (options) =>
  phenomicStatic({ ...options, metadata, routes, store })
