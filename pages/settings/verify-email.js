import Card from '../../components/Card'
import Container from '../../components/Container'
import { Button } from '../../components/Form'
import Layout from '../../components/Layout'
import useVerifyEmail from '../../hooks/useVerifyEmail';

export default function VerifyEmail() {
  const { resendEmailVerification, loading } = useVerifyEmail();
  return (
    <Layout title="Verify Your Email">
      <Container>
        <Card header={'Please verify your email address!'}>
          <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, vel eaque? Vitae dolore, hic ullam iure dolorum aperiam at cum.</p>
          <Button onClick={resendEmailVerification}>
            {loading ? 'Please wait . . .' : 'Resend Verification Link'}
          </Button>
        </Card>
      </Container>
    </Layout>
  )
}
