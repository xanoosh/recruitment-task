import { useQuery } from '@tanstack/react-query';

const getGithubCommitsQuery = (login, repo) => ({
  queryKey: ['github-commits', login, repo],
  queryFn: () => getLastGithubCommits(login, repo),
  staleTime: 1000 * 60 * 5,
});

async function getLastGithubCommits(login, repo, count = 5) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${login}/${repo}/commits?type=public&sort=created&page=1&per_page=${count}&direction=desc`,
      {
        method: 'GET',
      }
    );
    if (response.status !== 200) {
      throw new Error('failed to fetch github commits');
    }
    const githubCommits = await response.json();
    return githubCommits;
  } catch (error) {
    return error;
  }
}

export function useCommits({ login, repo }) {
  return useQuery(getGithubCommitsQuery(login, repo));
}