import Layout from '../../components/Layout'
import Container from '../../components/Container'
import axios from 'axios'
import Card from '../../components/Card';
import { useRecoilValueLoadable } from 'recoil';
import { authUserState } from '../../store/auth';
import Link from 'next/link';
import { Button } from '../../components/Form';

export default function User({ user }) {
  const authUser = useRecoilValueLoadable(authUserState);
  console.log(authUser.contents);
  return (
    <Layout title={user.name}>
      <Container>
        <Card header={
          <>
            <h1 className='font-medium text-xl'>Profile Information</h1>
            <span className='text-gray-400 text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis, laborum.
            </span>
          </>
        }>
          <div className="flex">
            <div className="flex-shrink-0 mr-5">
              <img className='w-14 h-14 rounded-full' src={user.picture} alt={user.name} />
            </div>
            <div>
              <h1 className='text-xl'>
                <span className='font-semibold'>{user.name}</span>{' '}
                <span className='text-indigo-500'>(@{user.username})</span>
              </h1>
              <p className='text-gray-400 text-sm'>
                Joined at {user.joined}
              </p>
              {user.username == authUser.contents.username &&
                <div className='mt-5'>
                  <Link href={'/settings/profile'}>
                    <Button>Setting</Button>
                  </Link>
                </div>
              }
            </div>
          </div>
        </Card>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`/api/profile/${params.username}`);
  return {
    props: {
      user: data.data
    }
  }
}