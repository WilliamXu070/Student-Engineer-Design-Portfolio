# App Notes

## Local Skill And Plugin Scope
Local CTMF-writing guidance lives in `ctmf-writing-skill/`.

- Plugin entry: `ctmf-writing-skill/.codex-plugin/plugin.json`
- Skill entry: `ctmf-writing-skill/skills/ctmf-evidence-writing/SKILL.md`

For CTMF drafting, revision, or review work, use this skill before rewriting content. Its intended scope is:
- diagnosing why a CTMF entry feels generic or superficial
- tracing exact relations from project evidence to requirements, concept decisions, and reflections
- connecting CTMF use to FDCR stages, the user's design position, and personal bias
- strengthening stakeholder-analysis entries through concrete stakeholder -> concern -> requirement -> design consequence chains

## Dev Server Workflow
Do not run `npm run build` after every change. Run `npm run build` only when a task adds a new file.

For edits to existing files, run `npm run lint` and verify in `npm run dev` without requiring a production build.

When `npm run build` is run and succeeds, always stop any existing `npm run dev` instance and start a fresh `npm run dev` session in the terminal before finishing the task.
