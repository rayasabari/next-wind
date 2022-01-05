import Layout from '../../components/Layout'
import Container from '../../components/Container'
import { useRecoilValueLoadable } from 'recoil'
import { authUserState } from '../../store/auth'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Card from '../../components/Card';
import { Button, Errors, Input, Label } from '../../components/Form';
import axios from 'axios';
import Notiflix from 'notiflix';
export default function Profile() {
  const authUser = useRecoilValueLoadable(authUserState);
  const router = useRouter();
  const [form, setForm] = useState({
    username: '', name: '', email: ''
  })
  const [errors, setErrors] = useState([])
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/user/profile-information', form)
      Notiflix.Notify.success(`Profile has been updated ${form.email !== authUser.contents.email && 'and you need to verify your email'}`,{position: 'right-bottom'})
      if(form.email !== authUser.contents.email){
        router.replace('/settings/verify-email');
      }
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  }
  useEffect(() => {
    setForm(form => ({
      ...form,
      username: authUser.contents.username,
      name: authUser.contents.name,
      email: authUser.contents.email,
    }))
    if (authUser.state === 'hasValue' && authUser.contents && !authUser.contents.has_verified) {
      router.replace('/settings/verify-email');
    }
  }, [authUser.contents])
  return (
    <Layout middleware={'auth'} title={'Profile Information'}>
      <Container>
        <Card header={
          <>
            <h1 className='font-medium text-xl'>Update Profile Information</h1>
            <span className='text-gray-400 text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis, laborum.
            </span>
          </>
        }>
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-6">
                <Label htmlFor="name">Name</Label>
                <Input type="text" value={form.name} onChange={(e) => setForm(form => ({ ...form, name: e.target.value }))} id="name" name="name" />
                {errors && errors.name && <Errors message={errors.name} />}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-6">
                <Label htmlFor="username">Username</Label>
                <Input type="text" value={form.username} onChange={(e) => setForm(form => ({ ...form, username: e.target.value }))} id="username" name="username" />
                {errors && errors.username && <Errors message={errors.username} />}
              </div>
              <div className="mb-6">
                <Label htmlFor="email">Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm(form => ({ ...form, email: e.target.value }))} id="email" name="email" />
                {errors && errors.email && <Errors message={errors.email} />}
              </div>
            </div>
            <Button>Update Profile</Button>
          </form>
        </Card>
      </Container>
    </Layout>
  )
}
