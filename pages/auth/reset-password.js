import axios from "axios";
import { useRouter } from "next/router";
import Card from "../../components/Card";
import { Button, Errors, Input, Label } from "../../components/Form";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import Notiflix from "notiflix";

export default function Register() {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    token: router.query.token
  })
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/reset-password', form);
      Notiflix.Report.success(
        'Reset Password Success!',
        'Back to login page',
        'Okay',
        () => router.replace('/login'),
        {
          fontFamily: 'system-ui',
          borderRadius: '0.75rem',
        },
      )
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  }
  useEffect(() => setForm(form => ({ ...form, token: router.query.token })), [router.query.token]);
  return (
    <Layout middleware={'guest'} title="Reset Password">
      <div className="mx-auto max-w-screen-sm px-4">
        <Card header={'Reset Password'}>
          <form onSubmit={submitHandler}>
            <input type={'hidden'} name="token" value={form.token} />
            <div className="mb-5">
              <Label htmlFor="email">Email</Label>
              <Input value={form.email} onChange={(e) => setForm(form => ({ ...form, email: e.target.value }))} type="email" name="email" id="email" />
              {errors && errors.email && <Errors message={errors.email} />}
            </div>
            <div className="mb-5">
              <Label htmlFor="password">Password</Label>
              <Input value={form.password} onChange={(e) => setForm(form => ({ ...form, password: e.target.value }))} type="password" name="password" id="password" />
              {errors && errors.password && <Errors message={errors.password} />}
            </div>
            <div className="mb-5">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input value={form.password_confirmation} onChange={(e) => setForm(form => ({ ...form, password_confirmation: e.target.value }))} type="password" name="password_confirmation" id="password_confirmation" />
            </div>
            <Button>Reset Password</Button>
          </form>
        </Card>
      </div>
    </Layout>
  )
}
