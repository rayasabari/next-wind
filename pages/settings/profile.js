import Layout from '../../components/Layout'
import Container from '../../components/Container' 
import { useRecoilValueLoadable } from 'recoil'
import { authUserState } from '../../store/auth'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function Profile() {
  const authUser = useRecoilValueLoadable(authUserState);
  const router = useRouter();
  useEffect(() => {
    if(authUser.contents && !authUser.contents.has_verified){
      router.replace('/settings/verify-email');
    }
  }, [authUser.contents])
  return (
    <Layout middleware={'auth'} title={'Profile Information'}>
      <Container>
        <h1 className='mb-2 font-medium text-xl'>Update Profile Information</h1>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo consequatur distinctio quisquam id in dolorum obcaecati perferendis quos non neque?
      </Container>
    </Layout>
  )
}
