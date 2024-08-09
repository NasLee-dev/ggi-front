import { userAtom } from '@/store/atom/postUser'
import { useRouter } from 'next/router'
import { ComponentType } from 'react'
import { useRecoilState } from 'recoil'

function withAuth<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
) {
  return function AuthenticatedComponent(props: Props) {
    const router = useRouter()
    const [user, setUser] = useRecoilState(userAtom)
    if (user == null) {
      router.replace('/auth/signin')
      return null
    }
    return <WrappedComponent {...(props as any)} />
  }
}

export default withAuth
