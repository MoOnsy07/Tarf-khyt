const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('v2/case-last-seen.js', 'utf8');
const context = { window: { LAST_SEEN_ASSETS: {} } };
vm.createContext(context);
vm.runInContext(source, context, { filename: 'case-last-seen.js' });

const story = context.window.STORY_CASE;
if (!story || !story.nodes) throw new Error('STORY_CASE.nodes missing');

const nodes = story.nodes;
const allowedTypes = new Set(['identity','cutscene','system','decision','investigation','report','end']);
const missing = [];

function collectNext(next, from) {
  if (!next) return;
  if (typeof next === 'string') {
    if (!nodes[next]) missing.push(`${from} -> ${next}`);
    return;
  }
  if (Array.isArray(next)) {
    for (const route of next) {
      if (!route || !route.to) missing.push(`${from} -> invalid route`);
      else if (!nodes[route.to]) missing.push(`${from} -> ${route.to}`);
    }
    return;
  }
  missing.push(`${from} -> unsupported next shape`);
}

for (const [id, node] of Object.entries(nodes)) {
  if (node.id !== id) throw new Error(`Node key/id mismatch: ${id} / ${node.id}`);
  if (!allowedTypes.has(node.type)) throw new Error(`Unknown node type ${node.type} at ${id}`);
  collectNext(node.next, id);
  for (const choice of node.choices || []) collectNext(choice.next, `${id}:${choice.id}`);
  if (node.timer?.timeoutNext && !nodes[node.timer.timeoutNext]) missing.push(`${id}:timeout -> ${node.timer.timeoutNext}`);
}

if (!nodes[story.start]) missing.push(`start -> ${story.start}`);
if (missing.length) throw new Error(`Broken story links:\n${missing.join('\n')}`);

const decisions = Object.values(nodes).filter(n => n.type === 'decision').length;
const investigations = Object.values(nodes).filter(n => n.type === 'investigation').length;
const majorDecisionPoints = decisions + investigations;
const endings = Object.values(nodes).filter(n => n.type === 'end').length;
const timed = Object.values(nodes).filter(n => n.timer).length;
const secretChoices = Object.values(nodes).flatMap(n => n.choices || []).filter(c => c.secret).length;

if (majorDecisionPoints < 15) throw new Error(`Expected at least 15 major decision points, got ${majorDecisionPoints}`);
if (endings < 5) throw new Error(`Expected 5 endings, got ${endings}`);

console.log(`LAST SEEN validated: ${Object.keys(nodes).length} nodes, ${majorDecisionPoints} major decision points, ${timed} timed nodes, ${secretChoices} secret choices, ${endings} endings.`);
