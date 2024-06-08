/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { Helmet } from 'react-helmet-async'
// Không có tính năng tree-shaking
// import { omit } from 'lodash'

// Import chỉ mỗi function omit
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'

// interface FormData {
//   email: string
//   password: string
//   confirm_password: string
// }
type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const {
    register,
    handleSubmit,
    // watch,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  // const rules = getRules(getValues)
  const onSubmit = handleSubmit((data) => {
    // lodash
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          // if (formError) {
          //   Object.keys(formError).forEach((key) => {
          //     setError(key as keyof Omit<FormData, 'confirm_password'>, {
          //       message: formError[key as keyof Omit<FormData, 'confirm_password'>],
          //       type: 'Server'
          //     })
          //   })
          // }
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  // const value = watch()
  // const email = watch('password')
  return (
    <div className='bg-orange'>
      <Helmet>
        <title>Đăng ký | Shopee Clone</title>
        <meta name='description' content='Đăng ký tài khoản vào dự án Shopee Clone' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                // rules={rules.email}
                placeholder='Email'
              />

              <Input
                name='password'
                register={register}
                type='password'
                className='mt-3'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.password?.message}
                // rules={rules.password}
                placeholder='Password'
                autoComplete='on'
              />

              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-3'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.confirm_password?.message}
                // rules={rules.confirm_password}
                placeholder='Confirm Password'
                autoComplete='on'
              />

              <div className='mt-3'>
                <Button
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Đăng Ký
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className=' text-gray-400'>Bạn đã có tài khoản hay chưa?</span>
                <Link className='text-red-400 ml-2' to='/Login'>
                  Đăng Nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
