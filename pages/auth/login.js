import Card from "../../components/Card";
import Layout from "../../components/Layout";
import axios from "axios";
import { Button, Errors, Input, Label } from "../../components/Form";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authCheckState } from "../../store/auth";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [errors, setErrors] = useState([]);
  const setAuth = useSetRecoilState(authCheckState)
  const router = useRouter();
  const [form, setForm] = useState({
    email: '', password: '', remember: ''
  })

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/login', form);
      setAuth(form);
      router.replace('/dashboard');
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  }

  return (
    <Layout middleware={'guest'} title="Login">
      <div className="mx-auto max-w-screen-sm px-4">
        <Card header={'Login'}>
          <form onSubmit={submitHandler}>
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
            <div className="mb-5 flex items-center justify-between">
              <div className="mb-5 flex items-center">
                <input value={form.remember} onChange={(e) => setForm(form => ({ ...form, remember: e.target.value }))} type="checkbox" name="remember" id="remember" className="form-checkbox border-gray-300 focus:ring focus:ring-indigo-200 rounded transition duration-300 focus:border-indigo-200" />
                <label className="ml-2" htmlFor="remember">Remember</label>
              </div>
              <Link href={'/forgot-password'}>
                <a className="text-indigo-500 text-sm hover:underline hover:text-indigo-700 font-medium transition duration-300">Forgot Password</a>
              </Link>
            </div>
            <Button>Login</Button>
          </form>
        </Card>
      </div>
    </Layout>
  )
}
