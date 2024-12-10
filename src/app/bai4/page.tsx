'use client'
import useSWR from 'swr';

export default function DataFetcher() {
  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const { data, error } = useSWR('http://jsonplaceholder.typicode.com/users', fetcher, {
    refreshInterval: 6000,
  });

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Đang tải...</div>;

  return (
    <div>
      {data.map((item: any) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </div>
  );
}