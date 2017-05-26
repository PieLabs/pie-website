import jsdoc2md from 'jsdoc-to-markdown';
import resolve from 'resolve';

export default function (input) {
  const lines = input.split('\n');

  const out = lines.map(l => {
    const match = l.match(/\[js_to_md\]\((.*?)\).*/);
    if (match && match.length > 0) {
      const path = resolve.sync(match[1]);
      return jsdoc2md.renderSync({ files: path });
    } else {
      return l;
    }
  });
  return out.join('\n');
}