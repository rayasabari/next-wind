import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Card from "../../components/Card";
import { useState } from "react";
import { Button, Errors, Input, Label } from "../../components/Form";
import axios from "axios";
import Notiflix from "notiflix";

export default function Password() {
  let current = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }
  const [form, setForm] = useState(current)
  const [errors, setErrors] = useState([])
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await axios.put('/user/password', form)
      Notiflix.Report.success('Success', 'Password has been updated!', 'Okay')
      setForm(current)
    } catch (error) {
      setErrors(error.response.data.errors)
    }
  }
  return (
    <Layout middleware={'auth'} title={'Change Password'}>
      <Container>
        <Card header={
          <>
            <h1 className="text-xl font-medium">Change Password</h1>
            <p className="text-gray-400 text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, voluptatibus.</p>
          </>
        }>
          <form onSubmit={submitHandler}>
            <div className="div mb-6">
              <Label htmlFor={'current_password'}>Current Password</Label>
              <Input type="password" value={form.current_password} onChange={(e) => setForm(form => ({ ...form, current_password: e.target.value }))} name="current_password" id="current_password" />
              {errors && errors.current_password && <Errors message={errors.current_password} />}
            </div>
            <div className="div mb-6">
              <Label htmlFor={'password'}>New Password</Label>
              <Input type="password" value={form.password} onChange={(e) => setForm(form => ({ ...form, password: e.target.value }))} name="password" id="password" />
              {errors && errors.password && <Errors message={errors.password} />}
            </div>
            <div className="div mb-6">
              <Label htmlFor={'password_confirmation'}>Confirm Password</Label>
              <Input type="password" value={form.password_confirmation} onChange={(e) => setForm(form => ({ ...form, password_confirmation: e.target.value }))} name="password_confirmation" id="password_confirmation" />
            </div>
            <Button>Submit</Button>
          </form>
        </Card>
      </Container>
    </Layout>
  )
}
