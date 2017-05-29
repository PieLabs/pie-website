import jsdoc2md from 'jsdoc-to-markdown';
import pathResolve from 'resolve';

export default function (input) {

  const done = this.async();


  if (!done) {
    throw new Error('can only run in async mode.');
  } else {

    const regex = /\[js_to_md\]\((.*?)\).*/;

    if (!regex.test(input)) {
      done(null, input);
    } else {

      const process = (s) => {
        const match = regex.exec(s);
        if (match === null) {
          return Promise.resolve(s);
        } else {
          const matchSrc = match[0];
          const group = match[1];
          return new Promise((resolve, reject) => {
            pathResolve(group, (err, path) => {
              if (err) {
                reject(err);
              } else {
                return jsdoc2md.render({ files: path })
                  .then(result => {
                    const out = s.replace(matchSrc, result);
                    return process(out)
                      .then(o => resolve(o))
                      .catch(e => reject(e));
                  })
                  .catch(e => reject(e));
              }
            })
          });
        }
      }

      return process(input)
        .then(transformed => {
          done(null, transformed)
        })
        .catch(done);
    }

  }
}