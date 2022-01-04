import axios from 'axios';
import { useRouter } from 'next/router';
import Notiflix from 'notiflix';
import { useState } from 'react'
import Card from '../../components/Card'
import { Button, Errors, Input, Label } from '../../components/Form'
import Layout from '../../components/Layout'

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const submitHandler = async (e) => {
    e.preventDefault();
    Notiflix.Loading.standard('Sending...');
    try {
      const { data } = await axios.post('/forgot-password', { email });
      Notiflix.Loading.remove();
      Notiflix.Report.success(
        'Verification Sent',
        `${data.message}. Please check your inbox!`,
        'Okay',
        () => router.replace('/login'),
        {
          fontFamily: 'system-ui',
          borderRadius: '0.75rem',
        },
      )
    } catch (error) {
      setErrors(error.response.data.errors);
      Notiflix.Loading.remove();
    }
  }
  return (
    <Layout title={'Forgot Password'}>
      <div className="mx-auto max-w-screen-sm px-4">
        <Card header={'Forgot Password'}>
          <form onSubmit={submitHandler}>
            <div className='mb-5'>
              <Label htmlFor="email">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />
              {errors && errors.email && <Errors message={errors.email}></Errors>}
            </div>
            <Button type="submit">Sent Reset Password Link</Button>
          </form>
        </Card>
      </div>
    </Layout>
  )
}
