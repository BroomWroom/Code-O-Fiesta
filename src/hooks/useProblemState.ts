import { useState, useEffect } from 'react';
import { Problem } from '@/types/problem';
import { problemsService } from '@/services/problems';

export function useProblemState(problemId: string, roundNumber: number) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [nextProblemId, setNextProblemId] = useState<string | null>(null);
  const [prevProblemId, setPrevProblemId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        const [probData, stateData, roundProbs] = await Promise.all([
          problemsService.fetchProblem(problemId),
          problemsService.fetchProblemState(problemId).catch(() => ({ solved: false })),
          problemsService.fetchRoundProblems(roundNumber).catch(() => [])
        ]);

        if (!active) return;

        // Map description to statement if statement is not present
        const mappedProblem = {
          ...probData,
          id: probData.id || (probData as any)._id || problemId,
          statement: probData.statement || (probData as any).description || '',
          constraints: Array.isArray(probData.constraints) 
            ? probData.constraints 
            : typeof probData.constraints === 'string'
              ? [probData.constraints]
              : []
        };

        setProblem(mappedProblem);
        setIsSolved(stateData.solved);

        // Find next and prev problems
        if (roundProbs && roundProbs.length > 0) {
          const idx = roundProbs.findIndex((p: any) => p.id === problemId || p._id === problemId);
          if (idx !== -1) {
            const prevProb = roundProbs[idx - 1];
            const nextProb = roundProbs[idx + 1];
            setPrevProblemId(prevProb ? (prevProb.id || (prevProb as any)._id) : null);
            setNextProblemId(nextProb ? (nextProb.id || (nextProb as any)._id) : null);
          } else {
            setPrevProblemId(null);
            setNextProblemId(null);
          }
        }
      } catch (err: any) {
        if (!active) return;
        setError(err.message || 'Failed to load problem data');
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    if (problemId) {
      loadData();
    }

    return () => {
      active = false;
    };
  }, [problemId, roundNumber]);

  return {
    problem,
    isLoading,
    error,
    isSolved,
    nextProblemId,
    prevProblemId,
    examples: problem?.examples || [],
    constraints: problem?.constraints || [],
  };
}
