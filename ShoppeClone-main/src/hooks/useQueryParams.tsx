import { useSearchParams } from 'react-router-dom'

// Lấy các param trên url

export default function useQueryParams() {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}
