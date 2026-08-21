interface PageProps {
  params: Promise<{ problemId: string }>;
}

export default async function Round1ProblemPage({ params }: PageProps) {
  const { problemId } = await params;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Round 1 Problem Page: {problemId}</h1>
    </div>
  );
}
