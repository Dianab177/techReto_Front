interface Props {
  skill: string;
}

export default function CompetenciaBadge({ skill }: Props) {
  return (
    <span className="px-2 py-1 bg-slate-800 text-white text-xs rounded-lg border border-slate-600 mr-1 mb-1 inline-block">
      {skill.trim()}
    </span>
  );
}
