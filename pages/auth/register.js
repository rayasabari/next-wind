import axios from "axios";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import Card from "../../components/Card";
import { Button, Errors, Input, Label } from "../../components/Form";
import Layout from "../../components/Layout";
import { authCheckState } from "../../store/auth";
import { useState } from "react";

export default function Register() {
  const setAuthCheck = useSetRecoilState(authCheckState);
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', form);
      setAuthCheck(form);
      router.replace('/dashboard');
    } catch (error) {
      console.log(error.response.data.errors);
      setErrors(error.response.data.errors);
    }
  }
  return (
    <Layout middleware={'guest'} title="Register">
      <div className="mx-auto max-w-screen-sm px-4">
        <Card header={'Register'}>
          <form onSubmit={submitHandler}>
            <div className="mb-5">
              <Label htmlFor="name">Name</Label>
              <Input value={form.name} onChange={(e) => setForm(form => ({ ...form, name: e.target.value }))} type="text" name="name" id="name" />
              {errors && errors.name && <Errors message={errors.name} />}
            </div>
            <div className="mb-5">
              <Label htmlFor="username">Username</Label>
              <Input value={form.username} onChange={(e) => setForm(form => ({ ...form, username: e.target.value }))} type="text" name="username" id="username" />
              {errors && errors.username && <Errors message={errors.username} />}
            </div>
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
            <Button>Register</Button>
          </form>
        </Card>
      </div>
    </Layout>
  )
}
